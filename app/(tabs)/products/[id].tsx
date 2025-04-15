import * as Clipboard from "expo-clipboard";
import {
  ActivityIndicator,
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
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRef, useState } from "react";

/**
 * @description This component displays the details of a selected product.
 * It includes the product's title, image, description, category, rating, and price.
 * It also provides a button to add the product to the cart.
 */
const ProductDetails = () => {
  const { products } = useProductContext();
  const cartDispatcher = useCartDispatch();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const productId = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const swipeableRef = useRef<SwipeableMethods | null>(null);

  const currentIndex = products.findIndex(
    (item) => item.id.toString() === productId
  );
  const curProduct = products[currentIndex];

  // This should never happen on mobile, but just in case
  // we don't want to crash the app if the product is not found.
  // This can happen on web by refreshing
  if (currentIndex === -1) {
    return <NoProduct />;
  }

  const handleAddToCartPress = () => {
    cartDispatcher({ type: "ADD_TO_CART", payload: curProduct });
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(curProduct.title);
  };

  const onSwipeLeft = () => {
    if (currentIndex > 0) {
      router.push(`/products/${products[currentIndex - 1].id}`);
    }
  };

  const onSwipeRight = () => {
    if (currentIndex < products.length - 1) {
      router.push(`/products/${products[currentIndex + 1].id}`);
    }
  };

  const onSwipeableOpen = (direction: "left" | "right") => {
    setIsLoading(true);

    setTimeout(() => {
      if (direction === "left") {
        onSwipeLeft();
      } else if (direction === "right") {
        onSwipeRight();
      }

      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
      setIsLoading(false);
    }, 500);
  };

  const renderLeftActions = () => (
    <View style={styles.swipeAction}>
      <Text>Previous</Text>
    </View>
  );
  const renderRightActions = () => (
    <View style={styles.swipeAction}>
      <Text>Next</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
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
                accessibilityLabel={"Hold down to copy"}
              >
                <Text style={styles.title}>{curProduct.title}</Text>
              </Pressable>
              <Image
                source={{ uri: curProduct.image }}
                style={styles.image}
                resizeMode={"contain"}
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
          <ReanimatedSwipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableOpen={onSwipeableOpen}
          >
            <View style={styles.footer}>
              <View style={styles.row}>
                <View style={styles.footerSide}>
                  <SmartButton style={styles.circleButton}>
                    <AntDesign name="leftcircleo" size={36} />
                  </SmartButton>
                  <Text style={styles.price}>${curProduct.price}</Text>
                </View>
                <View style={styles.footerSide}>
                  <SmartButton
                    onPress={handleAddToCartPress}
                    backgroundColor={Colors.highlight}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </SmartButton>
                  <SmartButton style={styles.circleButton}>
                    <AntDesign name="rightcircleo" size={36} />
                  </SmartButton>
                </View>
              </View>
            </View>
          </ReanimatedSwipeable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  category: {
    fontWeight: "bold",
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
    padding: 16,
    backgroundColor: Colors.contrast,
    borderTopWidth: 2,
    borderColor: Colors.lowContrast,
  },
  footerSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  circleButton: {
    padding: 0,
    borderRadius: 20,
  },
  addToCartText: {
    color: Colors.contrast,
  },
  swipeAction: {
    justifyContent: "center",
    padding: 4,
  },
});

export default ProductDetails;
