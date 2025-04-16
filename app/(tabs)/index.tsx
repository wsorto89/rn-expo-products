import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

/**
 * @description This screen is used to show the about information of the app.
 */
const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello, this is just a demo app. The purpose of this is to show you my
        coding style. Please look around.
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
