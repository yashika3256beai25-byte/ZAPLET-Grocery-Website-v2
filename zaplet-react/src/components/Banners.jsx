export default function Banners({ sectionRef }) {
  return (
    <div className="banners" id="bannerSec" ref={sectionRef}>
      <div className="bn">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Fresh Produce" />
        <div className="bn-ov">
          <div className="bn-tag">UP TO 40% OFF</div>
          <h3>Fresh Fruits &amp;<br />Vegetables</h3>
          <p>Farm fresh, direct to you</p>
        </div>
      </div>
      <div className="bn">
        <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80" alt="Dairy" />
        <div className="bn-ov">
          <div className="bn-tag">DAILY DEALS</div>
          <h3>Dairy &amp; Eggs</h3>
          <p>Fresh every morning</p>
        </div>
      </div>
      <div className="bn">
        <img src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&q=80" alt="Snacks" />
        <div className="bn-ov">
          <div className="bn-tag">NEW ARRIVALS</div>
          <h3>Snacks &amp; Drinks</h3>
          <p>100s of brands in stock</p>
        </div>
      </div>
    </div>
  );
}
