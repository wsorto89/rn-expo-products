import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import SmartButton from "../ui/smart-button";
import { useRouter } from "expo-router";

const NoProduct = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.navigate("/products");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No product selected.</Text>
      <SmartButton
        onPress={handleGoBack}
        backgroundColor={Colors.error}
      >
        <Text style={styles.text}>Go Back to Product List</Text>
      </SmartButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    color: Colors.contrast,
  },
});

export default NoProduct;
