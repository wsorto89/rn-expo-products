import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SmartButton from "@/components/ui/smart-button";
import { Colors } from "@/constants/colors";
import { useCartDispatch } from "@/context/cart-context";
import { CartItem } from "@/types";

type CartCardProps = {
  item: CartItem;
};

/**
 * @description This component renders a card for a cart item, displaying its title, image, price, and quantity.
 * It also provides buttons to increment, decrement, or remove the item from the cart.
 * @param {CartItem} item - The cart item to display.
 */
const CartCard = ({ item }: CartCardProps) => {
  const cartDispatcher = useCartDispatch();

  const handleIncrement = () => {
    cartDispatcher({ type: "ADD_TO_CART", payload: item });
  };

  const handleDecrement = () => {
    cartDispatcher({ type: "DECREMENT_FROM_CART", payload: item.id });
  };

  const handleRemove = () => {
    cartDispatcher({ type: "REMOVE_FROM_CART", payload: item.id });
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          resizeMode={"contain"}
        />
        <Text>${item.price}</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text>Quantity</Text>
        <Text>{item.quantity}</Text>
        <View style={styles.buttonArea}>
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
  itemTitle: {
    fontSize: 18,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 1,
  },
  buttonArea: {
    flexDirection: "row",
    gap: 8,
  },
});

export default CartCard;
