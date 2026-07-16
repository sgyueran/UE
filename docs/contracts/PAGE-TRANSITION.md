# Component Contract: PageTransition

## Responsibility
Coordinate short visual transitions around route changes.

## Rules
- Total transition should remain below 0.9 seconds.
- Reduced-motion mode uses simple fade.
- Must handle browser back navigation.
- Must prevent duplicate transition execution.
- Must not delay direct deep links unnecessarily.
