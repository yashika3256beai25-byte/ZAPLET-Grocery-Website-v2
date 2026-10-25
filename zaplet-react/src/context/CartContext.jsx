import { createContext, useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  increaseQuantity as increaseQuantityAction,
  decreaseQuantity as decreaseQuantityAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  selectCartItems,
} from "../store/cartSlice";

const CartContext = createContext(null);

// CartContext does NOT keep its own copy of the cart. The items live only in Redux.
// This provider reads them, derives every number the UI needs, and offers simple
// cart actions, so components never touch Redux or the DOM directly.
export function CartProvider({ children }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const addToCart = useCallback((name, price) => dispatch(addToCartAction({ name, price })), [dispatch]);
  const increaseQuantity = useCallback((name) => dispatch(increaseQuantityAction(name)), [dispatch]);
  const decreaseQuantity = useCallback((name) => dispatch(decreaseQuantityAction(name)), [dispatch]);
  const removeFromCart = useCallback((name) => dispatch(removeFromCartAction(name)), [dispatch]);
  const clearCart = useCallback(() => dispatch(clearCartAction()), [dispatch]);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const freeDelivery = total >= 199;
    const deliveryFee = freeDelivery ? 0 : 25;
    const platformFee = 3;
    const payable = total > 0 ? total + deliveryFee + platformFee : 0;

    let nextGoal = 0;
    if (total < 199) nextGoal = 199;
    else if (total < 299) nextGoal = 299;
    else if (total < 499) nextGoal = 499;

    const progressPercent = Math.min((total / 499) * 100, 100);

    return {
      items, count, total, freeDelivery, deliveryFee, platformFee, payable, nextGoal, progressPercent,
      addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart,
    };
  }, [items, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
