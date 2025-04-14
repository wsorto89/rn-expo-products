import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import BadgeContainer from "@/components/ui/badge-container";

describe("BadgeContainer", () => {
  test("renders children correctly", () => {
    // Arrange
    const { getByText } = render(
      <BadgeContainer count={0}>
        <Text>Cart</Text>
      </BadgeContainer>
    );

    // Assert
    expect(getByText("Cart")).toBeTruthy();
  });

  test("renders badge when count is greater than 0", () => {
    // Arrange
    const { getByText } = render(
      <BadgeContainer count={5}>
        <Text>Cart</Text>
      </BadgeContainer>
    );

    // Assert
    expect(getByText("5")).toBeTruthy();
  });

  test("does not render badge when count is 0", () => {
    // Arrange
    const { queryByText } = render(
      <BadgeContainer count={0}>
        <Text>Cart</Text>
      </BadgeContainer>
    );

    // Assert
    expect(queryByText("0")).toBeNull();
  });

  test("applies custom containerStyles and badgeStyles", () => {
    // Arrange
    const { getByTestId } = render(
      <BadgeContainer
        count={2}
        containerStyles={{ backgroundColor: "red" }}
        badgeStyles={{ backgroundColor: "blue" }}
      >
        <Text>Cart</Text>
      </BadgeContainer>
    );

    const badge = getByTestId("badge");

    const flattenedStyle = Array.isArray(badge.props.style)
      ? Object.assign({}, ...badge.props.style)
      : badge.props.style;

    // Assert
    expect(flattenedStyle.backgroundColor).toBe("blue");
  });
});
