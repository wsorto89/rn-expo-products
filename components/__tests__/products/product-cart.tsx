import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductContext } from '@/context/product-context';
import { CartDispatchContext } from '@/context/cart-context';
import * as Clipboard from 'expo-clipboard';
import ProductCard from '@/components/products/product-card';

// Mock Clipboard
jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}));

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockProducts = [
  {
    id: 1,
    title: 'Test Product',
    description: 'Test Description',
    price: 10,
    image: 'https://via.placeholder.com/150',
    category: 'electronics',
    rating: { rate: 4.5, count: 100 },
  },
];

const renderWithProviders = ({
  addToCart = jest.fn(),
  setProducts = jest.fn(),
} = {}) =>
  render(
    <ProductContext.Provider
      value={{
        products: mockProducts,
        setProducts: setProducts,
      }}
    >
      <CartDispatchContext.Provider value={addToCart}>
        <ProductCard product={mockProducts[0]} />
      </CartDispatchContext.Provider>
    </ProductContext.Provider>,
  );

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Product Card', () => {
  test('displays product after fetching', async () => {
    // Arrange
    const { getByText } = renderWithProviders();

    // Assert
    expect(getByText('Test Product')).toBeTruthy();
  });

  test('adds product to cart on button press', async () => {
    // Arrange
    const mockDispatch = jest.fn();
    const { getByText } = renderWithProviders({
      addToCart: mockDispatch,
    });

    // Act
    fireEvent.press(getByText('Add to Cart'));

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: mockProducts[0],
    });
  });

  test('routes to details screen on press', async () => {
    // Arrange
    const { getByText } = renderWithProviders();

    // Act
    fireEvent.press(getByText('More Details'));

    // Assert
    expect(mockPush).toHaveBeenCalledWith('/products/1');
  });

  test('copies product title to clipboard when title is pressed', async () => {
    // Arrange
    const { getByText } = renderWithProviders();

    // Act
    fireEvent.press(getByText('Test Product'));

    // Assert
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith('Test Product');
  });
});
