# Review Policy

Review the current task without modifying code.

Check:

1. Allowed Files compliance.
2. No later task or unrelated feature was implemented.
3. Required validation actually ran and passed.
4. No obvious defect, regression, missing acceptance criterion, or fabricated content exists.
5. The implementation follows `AGENTS.md`, the generated context, and relevant Skills.

Return one conclusion:

- `APPROVE`
- `REQUEST CHANGES`

For `REQUEST CHANGES`, classify every finding:

- **High**: blocks merge because it violates task scope, acceptance criteria, validation, security, content integrity, or repository policy.
- **Medium**: non-blocking quality concern.
- **Low**: optional polish or reviewer preference.

Every High finding must cite the violated rule or concrete failure. Reviewer preferences alone are not High.
