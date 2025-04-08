import React, { ReactNode } from "react";
import { Platform, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

type SmartButtonProps = {
  onPress: () => void;
  rippleColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  children: ReactNode;
};

const SmartButton = ({
  onPress,
  rippleColor = Colors.lowContrast,
  backgroundColor = Colors.contrast,
  style,
  children,
}: SmartButtonProps) => {
  const handlePress = () => {
    onPress();
  };

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
        onPress={handlePress}
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
