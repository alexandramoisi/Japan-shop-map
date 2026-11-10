# Tokyo & Kyoto Shop Map

An interactive map of minimal Japanese clothing, shoes, Issey Miyake, gorpcore, second-hand shops and markets in Tokyo and Kyoto. Built with [Leaflet](https://leafletjs.com) and [OpenStreetMap](https://www.openstreetmap.org) tiles. No build step: it is three static files.

- `index.html` – page layout and styles
- `data.js` – the shops, day routes and map areas (edit this to add or change shops)
- `app.js` – map, filters, saved list and routes

## Publish on GitHub Pages

1. Create a new public repository on GitHub, for example `japan-shop-map`.
2. Upload `index.html`, `data.js`, `app.js`, `README.md` and `.nojekyll` to the repository root (Add file → Upload files → Commit).
3. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/japan-shop-map/`.

## Adding a shop

Copy an entry in `SHOPS` in `data.js` and change the fields:

```js
{id:"t47", city:"tokyo", cat:"clothing", style:["Minimal"], p:[2,2],
 name:"Shop name", area:"Neighbourhood, address", hours:"11:00–20:00",
 why:"One line on why to go.", lat:35.6650, lng:139.7100, src:"https://source-link"}
```

- `cat`: `clothing`, `shoes`, `issey`, `second`, `market` or `basics`
- `p`: price tier range, 1 = ¥ to 3 = ¥¥¥ (`null` for second-hand and markets)
- `lat`/`lng`: right-click the spot in Google Maps to copy them. Use `null` to keep a shop off the map.
- Markets take `monthly: 21` (day of month) or `dates: ["2026-12-12", ...]` and show the next date automatically.

Pin positions were checked against Google Maps listings (November 2026); each shop links to Google Maps for directions. Saved shops are stored in the visitor's own browser.

Map data © OpenStreetMap contributors.
