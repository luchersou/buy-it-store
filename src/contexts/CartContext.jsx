import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/cartReducer";

const initialState = {
  cartItems: [],
  total: 0,
  itemCount: 0,
};

const STORAGE_KEY = "cartState";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    (initial) => {
      try {
        const storedCart = localStorage.getItem(STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : initial;
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return initial;
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  
  const increaseQuantity = (id) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  
  const decreaseQuantity = (id) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const value = {
    cartItems: state.cartItems,
    total: state.total,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>  
      {children}
    </CartContext.Provider>
  );
};