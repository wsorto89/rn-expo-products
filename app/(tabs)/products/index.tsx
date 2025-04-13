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
import { Drawer } from "react-native-drawer-layout";
import DrawerContent from "@/components/products/drawer-content";
import ProductCard from "@/components/products/product-card";
import SmartButton from "@/components/ui/smart-button";
import { Colors } from "@/constants/colors";
import useDebounce from "@/hooks/use-debounce";
import { Product, ProductFilters } from "@/types";
import BadgeContainer from "@/components/ui/badge-container";

/**
 * @description It fetches product data from an API, allows users to search and filter products,
 * and displays them in a list format.
 * It also includes a drawer for advanced filtering options.
 */
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    minRating: null,
    maxPrice: null,
    category: null,
  });

  // Using a custom hook to debounce the filter text input
  // This helps to reduce the number of re-renders
  const debouncedFilterText = useDebounce(filterText);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

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
      products.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(debouncedFilterText.toLowerCase()) &&
          (filters.minRating === null ||
            product.rating.rate >= filters.minRating) &&
          (filters.maxPrice === null || product.price <= filters.maxPrice) &&
          (filters.category === null ||
            product.category.toLowerCase() === filters.category.toLowerCase())
      ),
    [products, debouncedFilterText, filters]
  );

  const filterCount = Object.values(filters).filter(Boolean).length;

  return (
    <Drawer
      open={open}
      onOpen={handleOpenDrawer}
      onClose={handleCloseDrawer}
      renderDrawerContent={() => (
        <DrawerContent
          key={open ? `open-${Date.now()}` : "closed"} // Force re-render on open
          onClose={handleCloseDrawer}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    >
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size={72} color={Colors.highlight} />
          </View>
        )}
        {!!error && <Text style={styles.error}>Error: {error}</Text>}
        {products.length === 0 && !isLoading && !error && (
          <Text>No products available</Text>
        )}
        {products.length > 0 && !isLoading && !error && (
          <>
            <View style={styles.row}>
              <TextInput
                value={filterText}
                onChangeText={setFilterText}
                placeholder="Search products..."
                style={styles.textFilter}
              />
              <BadgeContainer
                count={filterCount}
                containerStyles={{ marginRight: 8 }}
              >
                <SmartButton
                  onPress={handleOpenDrawer}
                  backgroundColor={Colors.contrast}
                  accessibilityLabel={"filter"}
                >
                  <Ionicons name="filter" size={32} color={Colors.icon} />
                </SmartButton>
              </BadgeContainer>
            </View>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={filteredProducts}
              renderItem={({ item }) => <ProductCard product={item} />}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              contentContainerStyle={{ padding: 16 }}
              accessibilityRole={"list"}
              accessibilityLabel={"Product items list"}
            />
          </>
        )}
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: Colors.background,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: Colors.error,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  textFilter: {
    borderWidth: 2,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: Colors.contrast,
    flex: 1,
    marginLeft: 12,
  },
});

export default ProductList;
