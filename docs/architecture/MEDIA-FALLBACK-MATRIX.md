# Media Fallback Matrix

| Feature | Primary | Fallback |
|---|---|---|
| GLB viewer | Lazy WebGL viewer after intent | Static poster and metadata |
| Hover video | Muted preview | Poster plus explicit play/open action |
| AVIF/WebP | Modern responsive source | Standard image source |
| Hover interaction | Pointer hover | Tap/click navigation |
| Scroll animation | GSAP timeline | Static document flow under reduced motion |

Core project text and navigation must remain available when every rich-media feature fails.
