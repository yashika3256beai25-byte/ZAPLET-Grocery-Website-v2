# ZAPLET (React)

The ZAPLET grocery storefront, migrated from plain HTML/CSS/JS to a React single-page app.
Appearance, content, products and behaviour are the same as the original; only the implementation changed.

## Run

```bash
npm install
npm run dev       # development server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Architecture

| Concern | Where |
| --- | --- |
| Cart (single source of truth) | Redux Toolkit: `src/store/cartSlice.js`, `src/store/store.js` |
| Cart reducer logic | `src/reducers/cartReducer.js` (used by the Redux slice) |
| Cart totals, delivery, offer progress, cart actions | `src/context/CartContext.jsx`: reads Redux, derives values, stores no cart copy |
| Theme (`zapletTheme` in localStorage) | `src/context/ThemeContext.jsx` |
| Login modal open/close | `src/context/AuthContext.jsx` |
| Async product loading, loading/error | `src/hooks/useProducts.js` (simulated 600 ms Promise) |
| Product data | `src/data/products.js` (extracted from the original HTML) |
| Prizes, riders, categories | `src/data/siteData.js` |
| Local UI state (`useState`) | search, category, modals, toast, spin wheel, tracking, checkout form |

`src/index.css` is the original `style.css`, unchanged.

To see the error state, open the app with `?productError=1` at the end of the URL.

## Small behaviour notes

- Choosing a category clears the search box (the original showed category results but left the old text in the box).
- Clearing the search now returns to the selected category (the original always went back to the home grid).
- A newer toast replaces an older one cleanly instead of being hidden by the older timer.
- The wheel graphic labels ("20% OFF", "FREE GIFT") and the prize list differ in the original; both are kept as they were.
