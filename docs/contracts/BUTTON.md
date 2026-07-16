# Component Contract: Button

## Responsibility
Provide the canonical clickable action component.

## Props
- `variant`: `primary | secondary | ghost`
- `size`: `sm | md | lg`
- `loading?: boolean`
- `disabled?: boolean`
- `leftIcon?: ReactNode`
- `rightIcon?: ReactNode`

## Rules
- Must support keyboard interaction.
- Must expose visible focus state.
- Must not own navigation logic.
- Must not include magnetic behavior directly.
- Loading state must preserve button width.
