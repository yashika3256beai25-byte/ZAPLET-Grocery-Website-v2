import { useEffect, useState } from "react";
import { products, quickPicks } from "../data/products";

// Simulated async fetch (no real API). Add ?productError=1 to the URL to see the error state.
function fetchProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (new URLSearchParams(window.location.search).has("productError")) {
        reject(new Error("Could not load products. Please refresh and try again."));
      } else {
        resolve({ products, quickPicks });
      }
    }, 600);
  });
}

export default function useProducts() {
  const [data, setData] = useState({ products: [], quickPicks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchProducts()
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { products: data.products, quickPicks: data.quickPicks, loading, error };
}
