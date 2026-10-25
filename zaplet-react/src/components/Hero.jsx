export default function Hero({ onShopNow, onExplore }) {
  return (
    <div className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-tag">
          ⚡ FAST DELIVERY · FRESHNESS GUARANTEED
        </div>

        <h1>
          Fresh Groceries,<br />
          Delivered in <span className="highlight">20 Minutes.</span>
        </h1>

        <p className="hero-description">
          Your daily essentials, farm-fresh produce, and favourite snacks
          delivered straight to your doorstep.
        </p>

        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onShopNow}>
            Shop Now <span>→</span>
          </button>
          <button className="hero-btn-secondary" onClick={onExplore}>
            Explore Categories
          </button>
        </div>

        <div className="stats">
          <div className="stat"><b>30K+</b><span>Products</span></div>
          <div className="stat"><b>20 min</b><span>Delivery</span></div>
          <div className="stat"><b>4.9 ⭐</b><span>Customer Rating</span></div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-circle"></div>

        <div className="hero-badge">
          <span className="badge-icon">⚡</span>
          <div className="hero-num">20</div>
          <div className="badge-title">MINUTE DELIVERY</div>
          <div className="badge-subtitle">Freshness at your door</div>
        </div>

        <div className="hero-floating-card">
          <span>🥬</span>
          <div>
            <b>Fresh &amp; Healthy</b>
            <small>Everyday essentials</small>
          </div>
        </div>
      </div>
    </div>
  );
}
