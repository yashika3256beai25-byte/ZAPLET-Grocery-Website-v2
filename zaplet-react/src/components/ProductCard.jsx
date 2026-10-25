import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onAdded }) {
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart(product.cartName, product.price);
    onAdded(product.cartName + " added to cart");
  }

  return (
    <div
      className={"card" + (product.extra ? " extra" : "")}
      data-cat={product.cat}
      data-name={product.searchName}
      // style.css hides .extra by default; the original script showed it with an inline display.
      style={product.extra ? { display: "block" } : undefined}
    >
      <div className={"card-img " + product.imgClass}>
        <img src={product.image} alt={product.alt} />
      </div>
      <div className="card-name">{product.name}</div>
      <div className="card-info">{product.unit}</div>
      <div className="card-bottom">
        <span className="price">Rs {product.price}</span>
        <button onClick={handleAdd}>+ Add</button>
      </div>
    </div>
  );
}
