#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.codex/skills"
TARGET_DIR="${CODEX_HOME:-$HOME/.codex}/skills"

mkdir -p "$TARGET_DIR"

for skill_dir in "$SOURCE_DIR"/*; do
  [ -d "$skill_dir" ] || continue
  name="$(basename "$skill_dir")"
  rm -rf "$TARGET_DIR/$name"
  cp -R "$skill_dir" "$TARGET_DIR/$name"
  printf 'Installed %s\n' "$name"
done

printf '\nInstalled skills to %s\n' "$TARGET_DIR"
