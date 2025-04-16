import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Colors } from '@/constants/colors';

/**
 * @description This file is used to display a 404 Not Found screen.
 * It is displayed when the user navigates to a route that does not exist.
 * The screen contains a link to navigate back to the home screen.
 */
const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: Colors.contrast,
  },
});

export default NotFoundScreen;
