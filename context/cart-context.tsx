import { CartItem, Product } from "@/types";
import React, { createContext, useContext, useState } from "react";

type CartContextType = {
  cartItems: Map<number, Product & { quantity: number }>;
  addToCart: (item: Product) => void;
  decrementFromCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

/**
 * @description CartProvider component that provides the cart context to its children.
 * @param {ReactNode} children - The child components that will have access to the cart context.
 * @returns {JSX.Element} The CartProvider component.
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Map<number, CartItem>>(new Map());

  const addToCart = (item: Product) => {
    const updatedItems = new Map(cartItems);
    const currentQuantity = updatedItems.get(item.id)?.quantity || 0;
    updatedItems.set(item.id, { ...item, quantity: currentQuantity + 1 });
    setCartItems(updatedItems);
  };

  const decrementFromCart = (itemId: number) => {
    const updatedItems = new Map(cartItems);
    const currentQuantity = updatedItems.get(itemId)?.quantity || 0;
    if (currentQuantity > 1) {
      updatedItems.set(itemId, {
        ...updatedItems.get(itemId)!,
        quantity: currentQuantity - 1,
      });
    } else {
      updatedItems.delete(itemId);
    }
    setCartItems(updatedItems);
  };

  const removeFromCart = (itemId: number) => {
    const updatedItems = new Map(cartItems);
    updatedItems.delete(itemId);
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems(new Map());
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decrementFromCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * @description Custom hook to use the CartContext.
 * @returns {CartContextType} The cart context containing the cart items and their management functions.
 * @throws {Error} If the hook is used outside of a CartProvider.
 */
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
