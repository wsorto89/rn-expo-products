import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from '@/components/products/drawer-content';
import ProductCard from '@/components/products/product-card';
import { Colors } from '@/constants/colors';
import useDebounce from '@/hooks/use-debounce';
import { Product, ProductFilters } from '@/types';
import { useProductContext } from '@/context/product-context';
import { filterProducts } from '@/utils';
import ProductListFilters from '@/components/products/product-list-filters';
import useFetch from '@/hooks/use-fetch';

/**
 * @description It fetches product data from an API, allows users to search and filter products,
 * and displays them in a list format.
 * It also includes a drawer for advanced filtering options.
 */
const ProductList = () => {
  const { products, setProducts } = useProductContext();
  const [filterText, setFilterText] = useState('');
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    minRating: null,
    maxPrice: null,
    category: null,
  });

  const { error, isLoading, data } = useFetch<Product[]>(
    'https://fakestoreapi.com/products',
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, setProducts]);

  // Using a custom hook to debounce the filter text input
  // This helps to reduce the number of re-renders
  const debouncedFilterText = useDebounce(filterText);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  // Using useMemo to optimize performance by memoizing the filtered products
  const filteredProducts = useMemo(
    () => filterProducts(products, debouncedFilterText, filters),
    [products, debouncedFilterText, filters],
  );

  const filterCount = Object.values(filters).filter(Boolean).length;

  return (
    <Drawer
      open={open}
      onOpen={handleOpenDrawer}
      onClose={handleCloseDrawer}
      renderDrawerContent={() => (
        <DrawerContent
          key={open ? `open-${Date.now()}` : 'closed'} // Force re-render on open
          onClose={handleCloseDrawer}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    >
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator
              size={72}
              color={Colors.highlight}
              accessibilityRole={'progressbar'}
              testID="loading-spinner"
            />
          </View>
        )}
        {!!error && <Text style={styles.error}>Error: {error}</Text>}
        {products.length === 0 && !isLoading && !error && (
          <Text>No products available</Text>
        )}
        {products.length > 0 && !isLoading && !error && (
          <>
            <ProductListFilters
              filterText={filterText}
              setFilterText={setFilterText}
              handleOpenDrawer={handleOpenDrawer}
              filterCount={filterCount}
            />
            {filteredProducts.length > 0 ? (
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={filteredProducts}
                renderItem={({ item }) => <ProductCard product={item} />}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                contentContainerStyle={{ padding: 16 }}
                accessibilityRole={'list'}
                accessibilityLabel={'Product items list'}
              />
            ) : (
              <Text style={styles.emptyList}>Try adjusting filters</Text>
            )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: Colors.error,
    fontSize: 16,
  },
  emptyList: {
    color: Colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ProductList;
