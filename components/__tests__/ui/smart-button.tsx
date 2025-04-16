import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SmartButton from '@/components/ui/smart-button';
import { Text } from 'react-native';

describe('SmartButton', () => {
  test('renders children', () => {
    // Arrange
    const { getByText } = render(
      <SmartButton onPress={() => {}}>
        <Text>Press Here</Text>
      </SmartButton>,
    );

    // Assert
    expect(getByText('Press Here')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    // Arrange
    const mockPress = jest.fn();
    const { getByText } = render(
      <SmartButton onPress={mockPress}>
        <Text>Click me</Text>
      </SmartButton>,
    );

    // Act
    fireEvent.press(getByText('Click me'));

    // Assert
    expect(mockPress).toHaveBeenCalled();
  });

  test('does not call onPress when pressed when button is disabled', () => {
    // Arrange
    const mockPress = jest.fn();
    const { getByText } = render(
      <SmartButton onPress={mockPress} disabled={true}>
        <Text>Click me</Text>
      </SmartButton>,
    );

    // Act
    fireEvent.press(getByText('Click me'));

    // Assert
    expect(mockPress).not.toHaveBeenCalled();
  });
});
