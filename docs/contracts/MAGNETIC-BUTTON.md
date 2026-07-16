# Component Contract: MagneticButton

## Responsibility
Add pointer-based magnetic motion around a child action.

## Props
- `strength?: number`
- `radius?: number`
- `disabled?: boolean`
- `children: ReactNode`

## Rules
- Disable on coarse pointers.
- Disable for reduced-motion users.
- Do not update React state per animation frame.
- Restore transform on pointer leave.
- Must not change semantic role of child content.
