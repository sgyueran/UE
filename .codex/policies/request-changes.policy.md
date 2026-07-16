# REQUEST CHANGES Policy

When review returns `REQUEST CHANGES`:

1. Classify findings as High, Medium, or Low.
2. Automatically fix only High findings that are grounded in:
   - `AGENTS.md`
   - the current generated task context
   - acceptance criteria
   - executed validation failure
   - security or content-integrity rules
3. Stay within the current task and Allowed Files.
4. Do not perform unrelated refactors.
5. Re-run affected validation.
6. Perform one additional review.

Maximum automatic repair rounds: **1**.

If a High finding remains after the retry, output:

`MANUAL REVIEW REQUIRED`

Then stop.

If only Medium or Low findings remain, report `APPROVE WITH NOTES`; do not expand scope merely to satisfy preferences.
