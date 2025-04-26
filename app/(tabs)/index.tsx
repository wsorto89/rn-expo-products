import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * @description This screen is used to show the about information of the app.
 */
const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello, this is a demo app. The purpose of this is to show you my coding
        style and what kind of work I have done. Here, I have created custom
        hooks in the hooks directory for debouncing and catching errors when
        making API calls. I used a FLatlist to virtualize the list of products.
        I handled errors gracefully across the app. I added gestures for going
        to the next product in the list in the footer of the product details
        page. I also made the product's title be copyable. I used a split
        context for the cart in order to prevent unnecessary re-renders. I also
        used useMemo and useCallback when needed.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.text,
  },
});

export default AboutScreen;
