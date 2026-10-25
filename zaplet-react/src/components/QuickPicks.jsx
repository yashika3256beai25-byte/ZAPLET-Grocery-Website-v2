import { useCart } from "../context/CartContext";

export default function QuickPicks({ items, onAdded }) {
  const { addToCart } = useCart();

  function handleAdd(item) {
    addToCart(item.cartName, item.price);
    onAdded(item.cartName + " added to cart");
  }

  return (
    <>
      <h2>Quick Picks</h2>
      <div className="quick">
        {items.map((item) => (
          <div className="quick-card" key={item.id}>
            <div className={"card-img " + item.imgClass}>
              <img src={item.image} alt={item.alt} />
            </div>
            <div className="card-name">{item.name}</div>
            <div className="price">Rs {item.price}</div>
            <button onClick={() => handleAdd(item)}>+ Add</button>
          </div>
        ))}
      </div>
    </>
  );
}
