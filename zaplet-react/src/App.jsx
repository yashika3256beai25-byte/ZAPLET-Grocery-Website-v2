import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "./context/CartContext";
import useProducts from "./hooks/useProducts";
import Toast from "./components/Toast";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Banners from "./components/Banners";
import Offers from "./components/Offers";
import TrustSection from "./components/TrustSection";
import ProductList from "./components/ProductList";
import QuickPicks from "./components/QuickPicks";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import LoginSignup from "./components/LoginSignup";
import SpinWheel from "./components/SpinWheel";
import OrderTracking from "./components/OrderTracking";
import BackToTop from "./components/BackToTop";

export default function App() {
  const { products, quickPicks, loading, error } = useProducts();
  const { count, total } = useCart();

  // Local UI state shared by a few sibling components lives here.
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [wheelOpen, setWheelOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [order, setOrder] = useState({ name: "", key: 0 });
  const [toast, setToast] = useState({ message: "", visible: false });

  const productsRef = useRef(null);
  const bannersRef = useRef(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Choosing a category replaces any search, like the original (the category list overwrote the search results).
  function selectCategory(id) {
    setCategory(id);
    setSearch("");
  }

  function handleOrderPlaced(name) {
    setOrder((o) => ({ name, key: o.key + 1 }));
    setTrackOpen(true);
  }

  return (
    <>
      <Toast message={toast.message} visible={toast.visible} />
      <Header search={search} onSearch={setSearch} onOpenCart={() => setCartOpen(true)} />
      <Navigation category={category} onSelect={selectCategory} />

      {category === "all" && (
        <Hero
          onShopNow={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })}
          onExplore={() => bannersRef.current?.scrollIntoView({ behavior: "smooth" })}
        />
      )}

      <Banners sectionRef={bannersRef} />
      <Offers />
      <TrustSection />

      <ProductList
        products={products}
        loading={loading}
        error={error}
        search={search}
        category={category}
        listRef={productsRef}
        onAdded={showToast}
      />
      <QuickPicks items={quickPicks} onAdded={showToast} />
      <Footer />

      <div className={"float-bar" + (count > 0 ? " show" : "")} id="floatBar" onClick={() => setCartOpen(true)}>
        <span id="floatText">{count} items in cart - Rs {total}</span>
        <span className="view-cart">View Cart</span>
      </div>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onOpenWheel={() => setWheelOpen(true)}
        onOrderPlaced={handleOrderPlaced}
        showToast={showToast}
      />
      <LoginSignup showToast={showToast} />
      <SpinWheel open={wheelOpen} onClose={() => setWheelOpen(false)} showToast={showToast} />
      <OrderTracking open={trackOpen} onClose={() => setTrackOpen(false)} customerName={order.name} orderKey={order.key} />
      <BackToTop />
    </>
  );
}
