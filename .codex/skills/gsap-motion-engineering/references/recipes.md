# Motion Recipes

## Scoped Component

Use a root ref and `gsap.context(() => { ... }, rootRef)`. Return cleanup that reverts the context.

## Horizontal Rail

Enable only for fine pointers and adequate viewport width. Calculate distance from actual scroll width. Rebuild on meaningful resize. Provide a normal vertical mobile layout.

## Page Transition

Lock duplicate transitions, preserve direct deep links, reset scroll deliberately, and use a simple fade for reduced-motion users.

## Parallax

Keep translation subtle. Disable where media dimensions are unstable or motion could interfere with reading.
