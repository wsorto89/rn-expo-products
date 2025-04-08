//import "../gesture-handler"; // This is required for react-native-gesture-handler to work properly
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "@/constants/colors";
import ProductCard from "@/components/products/product-card";
import SmartButton from "@/components/ui/smart-button";
import useDebounce from "@/hooks/use-debounce";
import { Product } from "@/types";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");

  // Using a custom hook to debounce the filter text input
  // This helps to reduce the number of re-renders
  const debouncedFilterText = useDebounce(filterText);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal,
        });
        if (!response.ok) {
          throw new Error(
            `Network response failed with status: ${response.statusText}`
          );
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    return () => {
      // Cleanup function to abort the fetch request if the component unmounts
      abortController.abort();
    };
  }, []);

  // Filter products based on the filter text
  // Using useMemo to optimize performance by memoizing the filtered products
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(debouncedFilterText.toLowerCase())
      ),
    [products, debouncedFilterText]
  );

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color={Colors.highlight} />}
      {!!error && <Text style={styles.error}>Error: {error}</Text>}
      {products.length === 0 && !isLoading && !error && (
        <Text>No products available</Text>
      )}
      {products.length > 0 && !isLoading && !error && (
        <>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TextInput
              value={filterText}
              onChangeText={setFilterText}
              placeholder="Search products..."
              style={styles.textFilter}
            />
            <SmartButton onPress={() => {}} backgroundColor={Colors.contrast}>
              <Ionicons name="filter" size={32} color={Colors.icon} />
            </SmartButton>
          </View>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={filteredProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: Colors.background,
  },
  error: {
    color: Colors.error,
    fontSize: 16,
  },
  textFilter: {
    borderWidth: 2,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: Colors.contrast,
    flex: 1,
  },
});

export default ProductList;

export const navigationOptions = {
  headerShown: false,
  title: "Products",
  tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
    <Ionicons
      name={focused ? "storefront" : "storefront-outline"}
      color={color}
      size={24}
    />
  ),
};
