import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Cart({ open, onClose, onOpenWheel, onOrderPlaced, showToast }) {
  const {
    items, total, freeDelivery, deliveryFee, payable, nextGoal, progressPercent,
    increaseQuantity, decreaseQuantity, clearCart,
  } = useCart();

  // Checkout form fields: local state, only this component needs them.
  const [custName, setCustName] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custPay, setCustPay] = useState("");

  function placeOrder() {
    if (items.length === 0) {
      showToast("Cart is empty");
      return;
    }
    if (custName === "" || custAddress === "" || custPay === "") {
      showToast("Please fill all details");
      return;
    }
    onClose();
    onOrderPlaced(custName);
    clearCart();
    setCustName("");
    setCustAddress("");
    setCustPay("");
  }

  return (
    <>
      <div className={"overlay" + (open ? " show" : "")} id="cartOverlay" onClick={onClose}></div>
      <div className={"cart-panel" + (open ? " show" : "")} id="cartPanel">
        <div className="cart-head">
          <h3>My Cart</h3>
          <button onClick={onClose}>X</button>
        </div>
        <p className="cart-note">Delivery in 20 minutes after order is placed</p>

        <div id="cartItems">
          {items.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div className="cart-row" key={item.name}>
                <div>{item.name}<br />Rs {item.price} x {item.qty}</div>
                <div>
                  <button className="qty-btn" onClick={() => decreaseQuantity(item.name)}>-</button>{" "}
                  {item.qty}{" "}
                  <button className="qty-btn" onClick={() => increaseQuantity(item.name)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div id="cartBill" className={items.length === 0 ? "hidden" : ""}>
          <div className="progress-box">
            <p id="progressMsg">
              {nextGoal === 0 ? "All offers unlocked!" : "Add Rs " + (nextGoal - total) + " more to unlock the next offer"}
            </p>
            <div className="bar">
              <div className="bar-fill" id="progressBar" style={{ width: progressPercent + "%" }}></div>
            </div>
          </div>
          <div id="freeMsg" className={freeDelivery ? "free-msg" : "hidden"}>Free Delivery Unlocked!</div>
          <p>Item Total: <span id="itemTotal">Rs {total}</span></p>
          <p>Delivery Fee: <span id="delFee">{freeDelivery ? "FREE" : "Rs " + deliveryFee}</span></p>
          <p>Platform Fee: Rs 3</p>
          <p className="total">Total: <span id="grandTotal">Rs {payable}</span></p>

          <label htmlFor="custName">Full Name</label>
          <input type="text" id="custName" placeholder="Enter your name" value={custName} onChange={(e) => setCustName(e.target.value)} />
          <label htmlFor="custAddress">Delivery Address</label>
          <input type="text" id="custAddress" placeholder="House no, Street, Area, City" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} />
          <label htmlFor="custPay">Payment Method</label>
          <select id="custPay" value={custPay} onChange={(e) => setCustPay(e.target.value)}>
            <option value="">Select payment method</option>
            <option>UPI</option>
            <option>Credit / Debit Card</option>
            <option>Net Banking</option>
            <option>Cash on Delivery</option>
          </select>
          <button className="pay-btn" onClick={placeOrder}>Pay &amp; Order Now</button>
          <button className="spin-open" onClick={onOpenWheel}>Spin &amp; Win a Surprise Offer</button>
        </div>
      </div>
    </>
  );
}
