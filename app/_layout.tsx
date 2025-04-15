import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { CartProvider } from "@/context/cart-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * @description This is the root layout for the app.
 * It uses the Stack component from expo-router to define the main navigation structure.
 * The root layout is the entry point for the app and is used to define the overall structure of the app.
 * It wraps the entire app in a SafeAreaProvider and SafeAreaView to ensure that the app is displayed correctly on all devices.
 * It also provides the CartProvider context to manage the state of the cart throughout the app.
 */
const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <GestureHandlerRootView>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </CartProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
});

export default RootLayout;
