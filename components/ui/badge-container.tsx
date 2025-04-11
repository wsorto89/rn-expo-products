import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";
import { PropsWithChildren } from "react";

type BadgeContainerProps = {
  count: number;
  containerStyles?: ViewStyle;
  badgeStyles?: ViewStyle;
};

/**
 * @description Component that wraps a child component so that the child component gets a badge.
 * Badge shows a counter to give user feedback
 * @param {number} count count of items
 * @param {ReactNode} children wrapped component
 * @param {ViewStyle?} containerStyles optional param if you want to style the container
 * @param {ViewStyle?} badgeStyles optional param if you want to style the badge
 * @returns
 */
const BadgeContainer = ({
  count,
  children,
  containerStyles,
  badgeStyles,
}: PropsWithChildren<BadgeContainerProps>) => {
  return (
    <View style={[styles.badgeContainer, containerStyles]}>
      {children}
      {count > 0 && (
        <View style={[styles.badge, badgeStyles]}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: "relative",
  },
  badge: {
    backgroundColor: Colors.highlight,
    minWidth: 16,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
    position: "absolute",
    right: -4,
    bottom: -8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: Colors.contrast,
  },
});

export default BadgeContainer;
