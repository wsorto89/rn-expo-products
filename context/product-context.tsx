import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types";

type ProductContextType = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

/**
 * @description ProductProvider component that provides the selected product context to its children.
 * @param {ReactNode} children - The child components that will have access to the product context.
 * @returns {JSX.Element} The ProductProvider component.
 */
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

/**
 * @description Custom hook to use the ProductContext.
 * @returns {ProductContextType} The product context containing the selected product and its setter function.
 * @throws {Error} If the hook is used outside of a ProductProvider.
 */
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
