# Workflow Decision Tree

```text
Execute current task
  -> Validation
  -> Review
     -> APPROVE / APPROVE WITH NOTES
        -> Draft PR to develop
        -> Wait for user merge
        -> Recover
        -> Generate next task context
        -> STOP
     -> REQUEST CHANGES
        -> Classify findings
        -> Fix grounded High findings only
        -> Revalidate
        -> Review once more
           -> APPROVE: follow approve flow
           -> High remains: MANUAL REVIEW REQUIRED
           -> STOP
```
