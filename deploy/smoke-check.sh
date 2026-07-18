#!/usr/bin/env bash
# Post-deploy smoke check for the UE portfolio static site.
# Usage: deploy/smoke-check.sh <deploy-base-url ending in /UE/> [media-url]
set -euo pipefail

BASE_URL="${1:-}"
MEDIA_URL="${2:-}"

usage() {
  echo "Usage: $0 <deploy-base-url ending in /UE/> [media-url]" >&2
}

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

pass_count=0
skip_count=0

note_pass() {
  echo "PASS: $1"
  pass_count=$((pass_count + 1))
}

note_skip() {
  echo "SKIP: $1"
  skip_count=$((skip_count + 1))
}

if [[ -z "$BASE_URL" ]]; then
  usage
  fail "deploy base URL is required"
fi

if [[ "$BASE_URL" != http://* && "$BASE_URL" != https://* ]]; then
  fail "base URL must use http:// or https://"
fi

if [[ "$BASE_URL" != */UE/ ]]; then
  fail "base URL must end with /UE/"
fi

if [[ -n "$MEDIA_URL" && "$MEDIA_URL" != http://* && "$MEDIA_URL" != https://* ]]; then
  fail "media URL must use http:// or https://"
fi

command -v curl >/dev/null 2>&1 || fail "curl is required but was not found"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

fetch() {
  local url="$1" body="$2" headers="$3" status
  status="$(curl -sS -o "$body" -D "$headers" -w "%{http_code}" "$url")" \
    || fail "request failed for $url"
  if [[ "$status" -lt 200 || "$status" -ge 400 ]]; then
    fail "unexpected HTTP status $status for $url"
  fi
}

check_route() {
  local path="$1"
  local body="$TMP_DIR/route-$2.html"
  local headers="$TMP_DIR/route-$2.headers"
  fetch "${BASE_URL}${path}" "$body" "$headers"

  if ! grep -qiE 'id="root"|id="main-content"|<h1' "$body"; then
    fail "route ${path} did not return the application HTML shell"
  fi
  if grep -q 'TODO(USER_INPUT)' "$body"; then
    fail "route ${path} leaks TODO(USER_INPUT)"
  fi
  if grep -q '/UE/UE/' "$body"; then
    fail "route ${path} contains a duplicated /UE/UE/ path"
  fi
  if grep -qE '(src|href)="/assets/' "$body"; then
    fail "route ${path} references a root /assets/ path"
  fi
  if ! grep -qi 'text/html' "$headers"; then
    fail "route ${path} did not return a text/html content type"
  fi
  if ! grep -qiE 'no-store|no-cache' "$headers"; then
    fail "route ${path} is missing the HTML no-cache policy"
  fi

  note_pass "route ${path} html, safety, content type, cache policy"
}

check_route "" home
check_route "projects" projects
check_route "about" about
check_route "definitely-not-a-real-route" fallback

ORIGIN="$(printf '%s' "$BASE_URL" | sed -E 's#^(https?://[^/]+)/.*#\1#')"
ASSET_PATH="$(grep -oE '/UE/assets/[A-Za-z0-9._/-]+\.(js|css)' "$TMP_DIR/route-home.html" | head -n 1 || true)"

if [[ -z "$ASSET_PATH" ]]; then
  fail "no hashed /UE/assets/ build asset found in the home HTML"
fi

ASSET_HEADERS="$TMP_DIR/asset.headers"
fetch "${ORIGIN}${ASSET_PATH}" "$TMP_DIR/asset.out" "$ASSET_HEADERS"

if ! grep -qi 'max-age=31536000' "$ASSET_HEADERS"; then
  fail "hashed asset is missing the one-year cache policy"
fi
if ! grep -qi 'immutable' "$ASSET_HEADERS"; then
  fail "hashed asset is missing the immutable cache directive"
fi

note_pass "hashed asset ${ASSET_PATH} one-year immutable cache"

if [[ -n "$MEDIA_URL" ]]; then
  RANGE_HEADERS="$TMP_DIR/range.headers"
  RANGE_STATUS="$(curl -sS -o /dev/null -D "$RANGE_HEADERS" -w "%{http_code}" -H "Range: bytes=0-31" "$MEDIA_URL")" \
    || fail "range request failed for $MEDIA_URL"

  if [[ "$RANGE_STATUS" -ne 206 ]]; then
    fail "media range request returned HTTP $RANGE_STATUS instead of 206"
  fi
  if ! grep -qiE '^Content-Range:' "$RANGE_HEADERS"; then
    fail "media range response is missing Content-Range"
  fi
  if ! grep -qi 'Accept-Ranges: bytes' "$RANGE_HEADERS"; then
    fail "media range response is missing Accept-Ranges: bytes"
  fi
  if ! grep -qi 'max-age=2592000' "$RANGE_HEADERS"; then
    fail "media response is missing the 30-day cache policy"
  fi

  note_pass "media range request, 206, content range, 30-day cache"
else
  note_skip "media byte-range check (no media URL provided)"
fi

echo "SMOKE RESULT: PASS=${pass_count} SKIP=${skip_count} FAIL=0"
echo "Post-deploy smoke check completed successfully."
