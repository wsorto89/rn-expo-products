import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import SmartButton from '@/components/ui/smart-button';
import { Colors } from '@/constants/colors';
import { Product } from '@/types';
import { renderStars } from '@/utils/ratings';
import { useCartDispatch } from '@/context/cart-context';

type ProductCardProps = {
  product: Product;
};

/**
 * @description This component displays a product card with its title, image, category, rating, and price.
 * It also provides buttons for more details and adding the product to the cart.
 * @param {ProductCardProps} product - The product to display
 */
const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const cartDispatcher = useCartDispatch();

  const handleMoreDetailsPress = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCartPress = () => {
    cartDispatcher({ type: 'ADD_TO_CART', payload: product });
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(product.title);
  };

  return (
    <View style={styles.card}>
      <Pressable
        onPress={copyToClipboard}
        accessibilityLabel={'Hold down to copy'}
      >
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {product.title}
        </Text>
      </Pressable>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode={'contain'}
        accessibilityLabel={product.description}
      />
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
        <View style={styles.buttons}>
          <SmartButton
            onPress={handleMoreDetailsPress}
            style={{ borderWidth: 2 }}
          >
            <Text>More Details</Text>
          </SmartButton>
          <SmartButton
            onPress={handleAddToCartPress}
            backgroundColor={Colors.highlight}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  addToCartText: {
    color: Colors.contrast,
  },
});

export default ProductCard;
