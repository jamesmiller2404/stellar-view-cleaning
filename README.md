# Stellar View Services

## Color Adjustments
The background and border colors are controlled by CSS variables in `app/globals.css`. Update these values to tune the softness and overall warmth.

Current variables:
```css
:root {
  --bg-page: #f2f0ea;
  --bg-surface: #fbf9f4;
  --bg-surface-muted: #f5f2ec;
  --line: #ded9cf;
  --line-strong: #cfc8bd;
  --line-soft: #e7e2d9;
}
```

Background options for `--bg-page`:
- `#edeae4` (slightly darker, warm)
- `#eef0f2` (cooler, professional)
- `#e9e6df` (more contrast, still soft)

Notes:
- `--bg-page` affects the main page background.
- `--bg-surface` and `--bg-surface-muted` affect cards and inset panels.
- `--line` variants affect borders and focus rings.
