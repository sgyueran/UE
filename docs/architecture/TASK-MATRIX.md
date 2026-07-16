# Task Matrix

| Task | Profile | Tier | Direct dependencies |
|---|---|---|---|
| TASK-001 | foundation | standard | None |
| TASK-002 | foundation | standard | TASK-001 |
| TASK-003 | foundation | standard | TASK-002 |
| TASK-004 | foundation | standard | TASK-003 |
| TASK-005 | foundation | standard | TASK-004 |
| TASK-006 | foundation | standard | TASK-005 |
| TASK-007 | foundation | standard | TASK-003 |
| TASK-008 | foundation | standard | TASK-006, TASK-007 |
| TASK-009 | foundation | standard | TASK-008 |
| TASK-010 | foundation | standard | TASK-007, TASK-008 |
| TASK-011 | motion-interaction | standard | TASK-004 |
| TASK-012 | motion-interaction | standard | TASK-011 |
| TASK-013 | motion-interaction | standard | TASK-011 |
| TASK-014 | motion-interaction | standard | TASK-008, TASK-013 |
| TASK-015 | motion-interaction | standard | TASK-008, TASK-011, TASK-012, TASK-013 |
| TASK-016 | motion-interaction | standard | TASK-011, TASK-013 |
| TASK-017 | motion-interaction | full | TASK-005, TASK-011, TASK-013, TASK-016 |
| TASK-018 | data-content | standard | TASK-003 |
| TASK-019 | data-content | standard | TASK-003, TASK-018 |
| TASK-020 | data-content | standard | TASK-019 |
| TASK-021 | data-content | full | TASK-018, TASK-019, TASK-020 |
| TASK-022 | data-content | standard | TASK-004, TASK-011, TASK-021 |
| TASK-023 | ui-section | standard | TASK-008, TASK-021, TASK-022 |
| TASK-024 | motion-interaction | full | TASK-011, TASK-013, TASK-023 |
| TASK-025 | ui-section | standard | TASK-008, TASK-018, TASK-021 |
| TASK-026 | ui-section | standard | TASK-008, TASK-018, TASK-021, TASK-025 |
| TASK-027 | ui-section | standard | TASK-008, TASK-019, TASK-020, TASK-021 |
| TASK-028 | ui-section | full | TASK-013, TASK-027 |
| TASK-029 | ui-section | full | TASK-011, TASK-013, TASK-027 |
| TASK-030 | motion-interaction | full | TASK-012, TASK-013, TASK-029 |
| TASK-031 | ui-section | standard | TASK-008, TASK-019, TASK-020, TASK-021 |
| TASK-032 | ui-section | standard | TASK-019, TASK-020, TASK-031 |
| TASK-033 | ui-section | standard | TASK-013, TASK-031, TASK-032 |
| TASK-034 | ui-section | standard | TASK-008, TASK-018, TASK-021, TASK-023, TASK-025 |
| TASK-035 | foundation | standard | TASK-008, TASK-019, TASK-020, TASK-021 |
| TASK-036 | foundation | standard | TASK-013, TASK-035 |
| TASK-037 | foundation | standard | TASK-035, TASK-036 |
| TASK-038 | foundation | standard | TASK-035, TASK-037 |
| TASK-039 | threejs-media | full | TASK-013, TASK-035 |
| TASK-040 | threejs-media | full | TASK-013, TASK-035, TASK-039 |
| TASK-041 | threejs-media | full | TASK-011, TASK-012, TASK-013, TASK-035, TASK-040 |
| TASK-042 | threejs-media | full | TASK-003, TASK-013, TASK-041 |
| TASK-043 | deployment-release | full | TASK-034, TASK-042 |
| TASK-044 | deployment-release | full | TASK-021, TASK-034, TASK-042, TASK-043 |
| TASK-045 | deployment-release | full | TASK-043, TASK-044 |
| TASK-046 | deployment-release | full | TASK-034, TASK-042, TASK-045 |
| TASK-047 | testing-quality | full | TASK-044, TASK-045, TASK-046 |
| TASK-048 | testing-quality | full | TASK-046, TASK-047 |
| TASK-049 | deployment-release | full | TASK-047, TASK-048 |
| TASK-050 | deployment-release | full | TASK-043, TASK-044, TASK-045, TASK-046, TASK-049 |
| TASK-051 | deployment-release | full | TASK-043, TASK-044, TASK-045, TASK-046, TASK-047, TASK-048, TASK-049, TASK-050 |
