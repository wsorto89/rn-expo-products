import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types";

type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const ProductContext = createContext<ProductContextType | null>(null);

/**
 * @description ProductProvider component that provides the selected product context to its children.
 * @param {ReactNode} children - The child components that will have access to the product context
 */
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * @description Custom hook to use the ProductContext.
 * The product context contains the selected product and its setter function.
 * @throws {Error} If the hook is used outside of a ProductProvider.
 */
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
