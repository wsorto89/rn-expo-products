import * as Clipboard from "expo-clipboard";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SmartButton from "@/components/ui/smart-button";
import { Colors } from "@/constants/colors";
import { useCartDispatch } from "@/context/cart-context";
import { useProductContext } from "@/context/product-context";
import { renderStars } from "@/utils/ratings";
import NoProduct from "@/components/products/no-product";

/**
 * @description This component displays the details of a selected product.
 * It includes the product's title, image, description, category, rating, and price.
 * It also provides a button to add the product to the cart.
 */
const ProductDetails = () => {
  const { selectedProduct } = useProductContext();
  const cartDispatcher = useCartDispatch();

  // This should never happen on mobile, but just in case
  // we don't want to crash the app if the product is not found.
  // This can happen on web by refreshing
  if (!selectedProduct) {
    return <NoProduct />;
  }

  const handleAddToCartPress = () => {
    cartDispatcher({ type: "ADD_TO_CART", payload: selectedProduct });
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(selectedProduct.title);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 48,
        }}
      >
        <View style={styles.area}>
          <Pressable onPress={copyToClipboard}>
            <Text style={styles.title}>{selectedProduct.title}</Text>
          </Pressable>
          <Image
            source={{ uri: selectedProduct.image }}
            style={styles.image}
            resizeMode={"contain"}
          />
          <Text>{selectedProduct.description}</Text>
        </View>
        <View style={styles.area}>
          <View style={styles.row}>
            <Text>{selectedProduct.category}</Text>
            <View style={styles.ratings}>
              <Text>{selectedProduct.rating.rate}</Text>
              <View style={styles.stars}>
                {renderStars(selectedProduct.rating.rate)}
              </View>
              <Text>({selectedProduct.rating.count})</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.price}>${selectedProduct.price}</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <SmartButton
              onPress={handleAddToCartPress}
              backgroundColor={Colors.highlight}
            >
              <Text style={{ color: Colors.contrast }}>Add to Cart</Text>
            </SmartButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 240,
    height: 240,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stars: {
    flexDirection: "row",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.contrast,
    borderTopWidth: 1,
    borderColor: Colors.lowContrast,
  },
});

export default ProductDetails;
