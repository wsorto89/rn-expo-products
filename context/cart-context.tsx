import { CartItem, Product } from "@/types";
import React, { createContext, Dispatch, useContext, useReducer } from "react";

type CartState = { cartItems: Map<number, CartItem> };

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "DECREMENT_FROM_CART"; payload: number }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" };

const CartStateContext = createContext<CartState | null>(null);

const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null);

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updatedItems = new Map(state.cartItems);
      const item = action.payload;
      const currentQuantity = updatedItems.get(item.id)?.quantity || 0;
      updatedItems.set(item.id, { ...item, quantity: currentQuantity + 1 });
      return { ...state, cartItems: updatedItems };
    }
    case "DECREMENT_FROM_CART": {
      const updatedItems = new Map(state.cartItems);
      const itemId = action.payload;
      const currentQuantity = updatedItems.get(itemId)?.quantity || 0;
      if (currentQuantity > 1) {
        updatedItems.set(itemId, {
          ...updatedItems.get(itemId)!,
          quantity: currentQuantity - 1,
        });
      } else {
        updatedItems.delete(itemId);
      }
      return { ...state, cartItems: updatedItems };
    }
    case "REMOVE_FROM_CART":
      const updatedItems = new Map(state.cartItems);
      const itemId = action.payload;
      updatedItems.delete(itemId);
      return { ...state, cartItems: updatedItems };
    case "CLEAR_CART":
      return { ...state, cartItems: new Map<number, CartItem>() };
    default:
      return state;
  }
};

/**
 * @description CartProvider component that provides the cart context to its children.
 * @param {ReactNode} children - The child components that will have access to the cart context.
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: new Map<number, CartItem>(),
  });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

/**
 * @description Custom hook to use the CartStateContext, only used for reading from the cart state but cannot update it.
 * @throws {Error} If the hook is used outside of a CartProvider.
 */
export const useCartState = () => {
  const context = useContext(CartStateContext);
  if (!context)
    throw new Error("useCartState must be used within a CartProvider");
  return context;
};

/**
 * @description Custom hook to use the CartDispatchContext, only used for updating the cart state but does not read it.
 * This way, unnecessary re-renders are avoided since the component is only using the writing but not using the state
 * @throws {Error} If the hook is used outside of a CartProvider.
 */
export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (!context)
    throw new Error(
      "useCartDispatch must be used within a CartProvider"
    );
  return context;
};

/**
 * @description Combined hook to use both CartState and CartDispatch contexts
 * @throws {Error} If the hook is used outside of a CartProvider.
 */
export const useCart = () => {
  const state = useCartState();
  const dispatch = useCartDispatch();
  return { state, dispatch };
}
