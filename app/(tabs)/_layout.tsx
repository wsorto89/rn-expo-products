import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/colors";

/**
 * @description This file is used to define the layout for the tabs in the app.
 * It uses the Tabs component from expo-router to create a tabbed navigation layout.
 * Any file in the app/(tabs) directory will be treated as a tab screen.
 * @returns {JSX.Element}
 */
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: Colors.highlight,
        tabBarStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          title: "Products",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "storefront" : "storefront-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          title: "Cart",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
