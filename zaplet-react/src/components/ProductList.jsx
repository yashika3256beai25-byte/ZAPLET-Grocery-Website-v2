import { useState } from "react";
import ProductCard from "./ProductCard";

// Decides which cards are visible. Same rules as the original script:
// typing a search shows every product whose keyword matches; otherwise a category
// shows all of its products; Home shows the normal grid (extras only after "Load More").
function getVisibleProducts(products, search, category, showExtra) {
  const text = search.toLowerCase().trim();
  if (text !== "") return products.filter((p) => p.searchName.toLowerCase().includes(text));
  if (category !== "all") return products.filter((p) => p.cat === category);
  return products.filter((p) => !p.extra || showExtra);
}

export default function ProductList({ products, loading, error, search, category, listRef, onAdded }) {
  const [showExtra, setShowExtra] = useState(false);
  const visible = getVisibleProducts(products, search, category, showExtra);
  const text = search.trim();
  const noMatch = text !== "" && visible.length === 0 && !loading && !error;

  return (
    <>
      <h2>Popular Right Now</h2>
      <div className="products" id="productList" ref={listRef}>
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} onAdded={onAdded} />
        ))}
      </div>

      {loading && <p className="no-products-message show" role="status" aria-live="polite">Loading products...</p>}
      {error && <p className="no-products-message show" role="alert">{error}</p>}

      <p id="noProductsMessage" className={"no-products-message" + (noMatch ? " show" : "")} role="status" aria-live="polite">
        {noMatch ? 'No products found for "' + text + '".' : ""}
      </p>

      {!loading && !error && (
        <div className="center">
          <button id="moreBtn" onClick={() => setShowExtra(!showExtra)}>
            {showExtra ? "Show Less" : "Load More Products"}
          </button>
        </div>
      )}
    </>
  );
}
