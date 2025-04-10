import React, { ReactNode } from "react";
import { GestureResponderEvent, Platform, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

type SmartButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  rippleColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  children: ReactNode;
};

/**
 * @description A smart button component that handles ripple effect and background color for both iOS and Android platforms.
 * @param {GestureResponderEvent => void} props.onPress - Function to be called when the button is pressed.
 * @param {string?} props.rippleColor - Color of the ripple effect (default: Colors.lowContrast).
 * @param {string?} props.backgroundColor - Background color of the button (default: Colors.contrast).
 * @param {ViewStyle?} props.style - Additional styles to be applied to the button.
 * @param {ReactNode} props.children - Content to be displayed inside the button.
 * @returns A Pressable component that acts as a button with ripple effect and customizable styles.
 */
const SmartButton = ({
  onPress,
  rippleColor = Colors.lowContrast,
  backgroundColor = Colors.contrast,
  style,
  children,
}: SmartButtonProps) => {
  return (
    <View style={styles.parent}>
      <Pressable
        android_ripple={
          Platform.OS === "android"
            ? { color: rippleColor, borderless: false }
            : undefined
        }
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor:
              pressed && Platform.OS === "ios" ? rippleColor : backgroundColor,
          },
          style,
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderRadius: 4,
  },
  button: {
    borderRadius: 4,
    padding: 8,
  },
});

export default SmartButton;
