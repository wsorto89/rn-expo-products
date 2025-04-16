import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DrawerContent from '@/components/products/drawer-content';
import { ProductFilters } from '@/types';

const mockOnClose = jest.fn();
const mockSetFilters = jest.fn();

const defaultFilters: ProductFilters = {
  minRating: null,
  maxPrice: null,
  category: null,
};

const setup = (filters = defaultFilters) =>
  render(
    <DrawerContent
      onClose={mockOnClose}
      filters={filters}
      setFilters={mockSetFilters}
    />,
  );

describe('Drawer Content', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all inputs and buttons', () => {
    // Arrange
    const { getByPlaceholderText, getByText } = setup();

    // Assert
    expect(getByText('Filters')).toBeTruthy();
    expect(getByPlaceholderText('Minimum Rating')).toBeTruthy();
    expect(getByPlaceholderText('Maximum Price ($)')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
    expect(getByText('Apply')).toBeTruthy();
  });

  test('renders filters with incoming data', () => {
    // Arrange
    const { getByPlaceholderText } = setup({
      minRating: 3,
      maxPrice: 100,
      category: 'electronics',
    });

    const minRatingInput = getByPlaceholderText('Minimum Rating');
    const maxPriceInput = getByPlaceholderText('Maximum Price ($)');

    // Assert
    expect(minRatingInput.props.value).toBe('3');
    expect(maxPriceInput.props.value).toBe('100');
  });

  test('typing valid values updates local state', () => {
    // Arrange
    const { getByPlaceholderText } = setup();
    const minRatingInput = getByPlaceholderText('Minimum Rating');
    const maxPriceInput = getByPlaceholderText('Maximum Price ($)');

    // Act
    fireEvent.changeText(minRatingInput, '3.5');
    fireEvent.changeText(maxPriceInput, '100');

    // Assert
    expect(minRatingInput.props.value).toBe('3.5');
    expect(maxPriceInput.props.value).toBe('100');
  });

  test('clear button resets the inputs', () => {
    // Arrange
    const { getByPlaceholderText, getByText } = setup();
    const minRatingInput = getByPlaceholderText('Minimum Rating');
    const maxPriceInput = getByPlaceholderText('Maximum Price ($)');
    const clearButton = getByText('Clear');

    // Act
    fireEvent.changeText(minRatingInput, '4');
    fireEvent.changeText(maxPriceInput, '50');
    fireEvent.press(clearButton);

    // Assert
    expect(minRatingInput.props.value).toBe('');
    expect(maxPriceInput.props.value).toBe('');
  });

  test('apply button calls setFilters and onClose', () => {
    // Arrange
    const { getByPlaceholderText, getByText } = setup();

    // Act
    fireEvent.changeText(getByPlaceholderText('Minimum Rating'), '4');
    fireEvent.changeText(getByPlaceholderText('Maximum Price ($)'), '200');
    fireEvent.press(getByText('Apply'));

    // Assert
    expect(mockSetFilters).toHaveBeenCalledWith({
      minRating: 4,
      maxPrice: 200,
      category: null,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('invalid min rating clears the input', () => {
    // Arrange
    const { getByPlaceholderText } = setup();
    const minRatingInput = getByPlaceholderText('Minimum Rating');

    // Act
    fireEvent.changeText(minRatingInput, '10');

    // Assert
    expect(minRatingInput.props.value).toBe('');
  });

  test('invalid max price clears the input', () => {
    // Arrange
    const { getByPlaceholderText } = setup();
    const maxPriceInput = getByPlaceholderText('Maximum Price ($)');

    // Act
    fireEvent.changeText(maxPriceInput, '-10');

    // Assert
    expect(maxPriceInput.props.value).toBe('');
  });
});
