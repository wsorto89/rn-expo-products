import * as Clipboard from 'expo-clipboard';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { useProductContext } from '@/context/product-context';
import { renderStars } from '@/utils/ratings';
import NoProduct from '@/components/products/no-product';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import ProductItemDetailsFooter from '@/components/products/product-item-details-footer';

/**
 * @description This component displays the details of a selected product.
 * It includes the product's title, image, description, category, rating, and price.
 * It also provides a button to add the product to the cart.
 */
const ProductDetails = () => {
  const { products } = useProductContext();
  const params = useLocalSearchParams<{ id: string }>();
  const productId = params.id;
  const [isLoading, setIsLoading] = useState(false);

  const currentIndex = products.findIndex(
    (item) => item.id.toString() === productId,
  );
  const curProduct = products[currentIndex];

  // This should never happen on mobile, but just in case
  // we don't want to crash the app if the product is not found.
  // This can happen on web by refreshing
  if (currentIndex === -1) {
    return <NoProduct />;
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(curProduct.title);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={Colors.highlight} size={72} />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              padding: 16,
            }}
          >
            <View style={styles.area}>
              <Pressable
                onPress={copyToClipboard}
                accessibilityLabel={'Hold down to copy'}
              >
                <Text style={styles.title}>{curProduct.title}</Text>
              </Pressable>
              <Image
                source={{ uri: curProduct.image }}
                style={styles.image}
                resizeMode={'contain'}
              />
              <Text>{curProduct.description}</Text>
            </View>
            <View style={styles.area}>
              <View style={styles.row}>
                <Text style={styles.category}>{curProduct.category}</Text>
                <View style={styles.ratings}>
                  <Text>{curProduct.rating.rate}</Text>
                  <View style={styles.stars}>
                    {renderStars(curProduct.rating.rate)}
                  </View>
                  <Text>({curProduct.rating.count})</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <ProductItemDetailsFooter
            curProduct={curProduct}
            index={currentIndex}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  container: {
    backgroundColor: Colors.contrast,
    flex: 1,
  },
  area: {
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 240,
    height: 240,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontWeight: 'bold',
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductDetails;
