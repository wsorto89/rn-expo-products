import { RATING_MAX } from "@/utils/ratings";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SmartButton from "../ui/smart-button";
import { Colors } from "@/constants/colors";
import { ProductFilters } from "@/types";

const RATING_MIN = 0;

type DrawerContentProps = {
  onClose: () => void;
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
};

/**
 * @description It includes input fields for minimum rating, maximum price, and category.
 * It also provides buttons to clear and apply the filters.
 * The component uses local state to manage the input values and updates the filters when the user applies them.
 * It also handles input validation for the minimum rating and maximum price fields.
 * @param {Object} props - Component props.
 * @param {() => void} props.onClose - Function to close the drawer.
 * @param {ProductFilters} props.filters - The current filters applied to the product list.
 * @param {(filters: ProductFilters) => void} props.setFilters - Function to update the filters.
 * @returns {JSX.Element} - A component that renders the content of the drawer for filtering products.
 */
const DrawerContent = ({ onClose, filters, setFilters }: DrawerContentProps) => {
  const [minRating, setMinRating] = useState<string>(filters.minRating !== null ? filters.minRating.toString() : "");
  const [maxPrice, setMaxPrice] = useState<string>(filters.maxPrice !== null ? filters.maxPrice.toString() : "");
  const [category, setCategory] = useState<string>(filters.category !== null ? filters.category.toString() : "");

  const handleMinRatingChange = (text: string) => {
    const parsedValue = parseFloat(text);

    if (
      !isNaN(parsedValue) &&
      parsedValue >= RATING_MIN &&
      parsedValue <= RATING_MAX
    ) {
      setMinRating(text);
    } else {
      setMinRating("");
    }
  };

  const handleMaxPriceChange = (text: string) => {
    const parsedValue = parseFloat(text);

    if (!isNaN(parsedValue) && parsedValue >= RATING_MIN) {
      setMaxPrice(text);
    } else {
      setMaxPrice("");
    }
  };

  const handleClearPress = () => {
    setMinRating("");
    setMaxPrice("");
    setCategory("");
  };

  const handleApplyPress = () => {
    const parsedMinRating = parseFloat(minRating) || null;
    const parsedMaxPrice = parseFloat(maxPrice) || null;
    const parsedCategory = category || null;
    setFilters({
      minRating: parsedMinRating,
      maxPrice: parsedMaxPrice,
      category: parsedCategory,
    });
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text>Filters</Text>
      <TextInput
        placeholder="Minimum Rating"
        value={minRating}
        onChangeText={handleMinRatingChange}
        keyboardType={"numeric"}
        style={styles.input}
      />
      <TextInput
        placeholder="Maximum Price ($)"
        value={maxPrice}
        onChangeText={handleMaxPriceChange}
        keyboardType={"numeric"}
        style={styles.input}
      />
      { /* TODO: Category filter */}
      <View style={styles.buttons}>
        <SmartButton onPress={handleClearPress} style={styles.cancelButton}>
          <Text>Clear</Text>
        </SmartButton>
        <SmartButton
          onPress={handleApplyPress}
          backgroundColor={Colors.highlight}
        >
          <Text style={styles.applyButton}>Apply</Text>
        </SmartButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  cancelButton: {
    borderWidth: 2,
  },
  applyButton: {
    color: Colors.contrast,
  },
});

export default DrawerContent;
