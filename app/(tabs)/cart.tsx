import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { useCartContext } from "@/context/cart-context";
import CartCard from "@/components/cart/cart-item-cart";
import SmartButton from "@/components/ui/smart-button";

/**
 * @description This component displays the cart items and their total cost.
 * It also displays a message if the cart is empty.
 * @returns {JSX.Element}
 */
const Cart = () => {
  const { cartItems, clearCart } = useCartContext();
  const totalItems = Array.from(cartItems.values()).reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = Array.from(cartItems.values()).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      clearCart(); // Clear the cart when refreshing
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.totals}>
        Total Item(s): {totalItems}, Total Cost: ${totalPrice.toFixed(2)}
      </Text>
      {cartItems.size === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <>
          <Text style={[styles.emptyCart, { marginBottom: 8 }]}>
            Pull down to clear cart
          </Text>
          <FlatList
            data={Array.from(cartItems.values())} // Convert the cart items to an array
            renderItem={({ item }) => <CartCard item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      )}
      <SmartButton
        onPress={clearCart}
        backgroundColor={Colors.highlight}
        style={styles.clearButton}
        disabled={cartItems.size === 0}
      >
        <Text style={styles.clear}>Clear Cart</Text>
      </SmartButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    justifyContent: "space-between",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.contrast,
  },
  totals: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.contrast,
    textAlign: "center",
  },
  clearButton: {
    marginTop: 16,
    alignSelf: "center",
  },
  clear: {
    color: Colors.contrast,
    fontWeight: "bold",
  },
});

export default Cart;
