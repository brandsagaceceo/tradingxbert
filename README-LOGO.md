TradingXbert logo & favicons

This project uses a single canonical SVG for the brand mark and favicon source.

Files:
- `public/logo.svg` - main brand SVG used in larger placements (48x48 viewBox 64x64).
- `public/favicon.svg` - favicon SVG used as source for PNG favicons.
- `public/favicon-32.png` and `public/favicon-16.png` - generated PNG favicons for broad browser support.
- `scripts/generate-favicons.js` - Node script that uses `sharp` to rasterize `public/favicon.svg` to PNGs.

To regenerate favicons locally:

```powershell
npm install --no-save --save-dev sharp
npm run generate-favicons
```

Design notes:
- Small arrow accents were removed to keep the mark clean and readable at small sizes.
- The logo now uses a soft neon gradient and stronger glow for a futuristic look; tweak `app/globals.css` variables `--accent-*` for color variations.

If you want a `.ico` file as well, let me know and I can add an alternative converter or produce it externally.
