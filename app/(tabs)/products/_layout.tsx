import { Stack } from "expo-router";
import { ProductProvider } from "@/context/product-context";

/**
 * @returns {JSX.Element}
 * @description This component provides a layout for the products section of the app.
 * It uses a stack navigator to manage the navigation between the product list and product details screens.
 * The ProductProvider context is used to manage the state of the selected product.
 * It contains two screens: the product list (index) and the product details ([id]).
 * The product list screen is hidden (headerShown: false) while the product details screen shows the header with the title "Product Detail".
 */
const ProductsLayout = () => {
  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[id]"
          options={{ headerShown: true, title: "Product Detail" }}
        />
      </Stack>
    </ProductProvider>
  );
};

export default ProductsLayout;
