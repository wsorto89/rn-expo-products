import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { useCartContext } from "@/context/cart-context";
import SmartButton from "@/components/ui/smart-button";
import { Ionicons } from "@expo/vector-icons";
import { CartItem } from "@/types";

type CartCardProps = {
  item: CartItem;
};

/**
 * @description This component renders a card for a cart item, displaying its title, image, price, and quantity.
 * It also provides buttons to increment, decrement, or remove the item from the cart.
 * @param {CartItem} item - The cart item to display.
 * @returns {JSX.Element}
 */
const CartCard = ({ item }: CartCardProps) => {
  const { cartItems, addToCart, decrementFromCart, removeFromCart } =
    useCartContext();

  const handleIncrement = () => {
    addToCart(item);
  };

  const handleDecrement = () => {
    const existingItem = cartItems.get(item.id);
    if (!existingItem) {
      console.error("Item not found in cart:", item.id);
      return;
    }
    if (existingItem.quantity > 1) {
      decrementFromCart(item.id);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
        />
        <Text>${item.price}</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text>Quantity</Text>
        <Text>{item.quantity}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <SmartButton onPress={handleIncrement}>
            <Ionicons name="caret-up" size={32} color={Colors.icon} />
          </SmartButton>
          <SmartButton onPress={handleDecrement}>
            <Ionicons name="caret-down" size={32} color={Colors.icon} />
          </SmartButton>
          <SmartButton onPress={handleRemove}>
            <Ionicons name="trash" size={32} color={Colors.icon} />
          </SmartButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    gap: 16,
    backgroundColor: Colors.contrast,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
  },
  itemDetails: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
  },
});

export default CartCard;
