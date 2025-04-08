import { Slot } from "expo-router";
import { ProductProvider } from "@/context/product-context";

const ProductsLayout = () => {
  return (
    <ProductProvider>
      <Slot />
    </ProductProvider>
  );
}

export default ProductsLayout;
