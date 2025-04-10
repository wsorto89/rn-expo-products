import * as Clipboard from "expo-clipboard";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SmartButton from "@/components/ui/smart-button";
import { Colors } from "@/constants/colors";
import { useCartContext } from "@/context/cart-context";
import { useProductContext } from "@/context/product-context";
import { renderStars } from "@/utils/ratings";

/**
 * @description This component displays the details of a selected product.
 * It includes the product's title, image, description, category, rating, and price.
 * It also provides a button to add the product to the cart.
 * @returns {JSX.Element}
 */
const ProductDetails = () => {
  const { selectedProduct } = useProductContext();
  const { addToCart } = useCartContext();

  // This should never happen, but just in case
  // we don't want to crash the app if the product is not found
  if (!selectedProduct) {
    return (
      <View>
        <Text>No product selected.</Text>
      </View>
    );
  }

  const handleAddToCartPress = () => {
    addToCart(selectedProduct);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(selectedProduct.title);
  };

  return (
    <View style={styles.container}>
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
  container: {
    backgroundColor: Colors.contrast,
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
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
});

export default ProductDetails;
