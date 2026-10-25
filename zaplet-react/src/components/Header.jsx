import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header({ search, onSearch, onOpenCart }) {
  const { theme, toggleTheme } = useTheme();
  const { openLogin } = useAuth();
  const { count } = useCart();
  const isDark = theme === "dark";

  return (
    <>
      <div className="top-bar">
        ⚡ <b>ZAPLET</b> — <b>30,000+</b> products delivered in 20 minutes | Free delivery above Rs 199
      </div>

      <header>
        <div className="header-inner">
          <div className="logo">
            <div className="logo-box">Z</div>
            <div>
              <div className="logo-name">ZAPLET</div>
              <div className="logo-sub">Store to Door in 20</div>
            </div>
          </div>

          <div className="location">
            Deliver to<br />
            <b>Sector 17, Chandigarh</b>
          </div>

          <input
            type="text"
            id="searchBox"
            className="search"
            placeholder="Search groceries, snacks, dairy..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />

          <button className="btn-login" onClick={openLogin}>Login / Sign Up</button>
          <button className="btn-cart" onClick={onOpenCart}>🛒 My Cart (<span id="cartBadge">{count}</span>)</button>
          <button
            id="themeToggle"
            className="theme-toggle"
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title="Switch theme"
            onClick={toggleTheme}
          >
            <span id="themeIcon" aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            <span id="themeText">{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </header>
    </>
  );
}
