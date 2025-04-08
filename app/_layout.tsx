import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

/**
 * This is the root layout for the app.
 * It uses the Stack component from expo-router to define the main navigation structure.
 * The root layout is the entry point for the app and is used to define the overall structure of the app.
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
});
