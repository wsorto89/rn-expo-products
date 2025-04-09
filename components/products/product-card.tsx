import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import SmartButton from "@/components/ui/smart-button";
import { Colors } from "@/constants/colors";
import { useProductContext } from "@/context/product-context";
import { Product } from "@/types";
import { renderStars } from "@/utils/ratings";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { setSelectedProduct } = useProductContext();

  const handleMoreDetailsPress = () => {
    setSelectedProduct(product);
    router.push(`/products/${product.id}`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.row}>
        <Text>{product.category}</Text>
        <View style={styles.ratings}>
          <Text>{product.rating.rate}</Text>
          <View style={styles.stars}>{renderStars(product.rating.rate)}</View>
          <Text>({product.rating.count})</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.price}>${product.price}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <SmartButton
            onPress={handleMoreDetailsPress}
            style={{ borderWidth: 2 }}
          >
            <Text>More Details</Text>
          </SmartButton>
          <SmartButton onPress={() => {}} backgroundColor={Colors.highlight}>
            <Text style={{ color: Colors.contrast }}>Add to Cart</Text>
          </SmartButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.contrast,
    gap: 8,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
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
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductCard;
