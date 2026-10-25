// Pure cart reducer logic, kept separate from the Redux wiring in store/cartSlice.js.
// These are Redux Toolkit "case reducers": they receive the cart state draft and an action.
// Items are { name, price, qty } and are matched by name (same as the original script).
export const cartReducers = {
  addToCart(state, action) {
    const { name, price } = action.payload;
    const found = state.items.find((item) => item.name === name);
    if (found) {
      found.qty += 1;
    } else {
      state.items.push({ name, price, qty: 1 });
    }
  },

  increaseQuantity(state, action) {
    const found = state.items.find((item) => item.name === action.payload);
    if (found) found.qty += 1;
  },

  decreaseQuantity(state, action) {
    const found = state.items.find((item) => item.name === action.payload);
    if (!found) return;
    found.qty -= 1;
    if (found.qty <= 0) {
      state.items = state.items.filter((item) => item.name !== action.payload);
    }
  },

  removeFromCart(state, action) {
    state.items = state.items.filter((item) => item.name !== action.payload);
  },

  clearCart(state) {
    state.items = [];
  },
};
