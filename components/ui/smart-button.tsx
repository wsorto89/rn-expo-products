import React, { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants/colors';

type SmartButtonProps = PressableProps & {
  rippleColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  children: ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
};

/**
 * @description A smart button component that handles ripple effect and background color for both iOS and Android platforms.
 * @param {string?} props.rippleColor - Color of the ripple effect (default: Colors.lowContrast).
 * @param {string?} props.backgroundColor - Background color of the button (default: Colors.contrast).
 * @param {ViewStyle?} props.style - Additional styles to be applied to the button.
 * @param {ReactNode} props.children - Content to be displayed inside the button.
 * @param {string} props.accessibilityLabel - Label for screen readers
 * @returns A Pressable component that acts as a button with ripple effect and customizable styles.
 */
const SmartButton = ({
  onPress,
  rippleColor = Colors.lowContrast,
  backgroundColor = Colors.foreground,
  style,
  children,
  disabled = false,
  accessibilityLabel,
  ...rest
}: SmartButtonProps) => {
  return (
    <View style={styles.parent}>
      <Pressable
        android_ripple={
          Platform.OS === 'android'
            ? { color: rippleColor, borderless: false }
            : undefined
        }
        style={({ pressed }) => [
          styles.button,
          disabled ? styles.disabled : null,
          {
            backgroundColor:
              pressed && Platform.OS === 'ios' && !disabled
                ? rippleColor
                : backgroundColor,
          },
          style,
        ]}
        onPress={disabled ? undefined : onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        {...rest}
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
    borderColor: Colors.text,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default SmartButton;
