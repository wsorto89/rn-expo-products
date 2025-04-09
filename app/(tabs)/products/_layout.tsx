import { Stack } from "expo-router";
import { ProductProvider } from "@/context/product-context";

export default function ProductsLayout() {
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
}
