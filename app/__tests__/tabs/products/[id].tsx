import ProductDetails from '@/app/(tabs)/products/[id]';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as Clipboard from 'expo-clipboard';
import { ProductContext } from '@/context/product-context';
import { CartDispatchContext } from '@/context/cart-context';
import { Product } from '@/types';

// Mock Clipboard
jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
  useLocalSearchParams: () => ({
    id: '1', // or whatever fake ID you need
  }),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product',
    description: 'This is a test product',
    category: 'Test Category',
    image: 'https://via.placeholder.com/150',
    price: 100,
    rating: { rate: 4.5, count: 10 },
  },
];

const renderWithProviders = (addToCartMock = jest.fn()) =>
  render(
    <ProductContext.Provider
      value={{
        products: mockProducts,
        setProducts: () => {},
      }}
    >
      <CartDispatchContext.Provider value={addToCartMock}>
        <ProductDetails />
      </CartDispatchContext.Provider>
    </ProductContext.Provider>,
  );

describe('ProductDetails Screen', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockNavigate.mockReset();
  });

  test('renders product details', () => {
    // Arrange
    const { getByText } = renderWithProviders();

    // Act
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('This is a test product')).toBeTruthy();
    expect(getByText('Test Category')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
  });

  test("adds product to cart when 'Add to Cart' is pressed", () => {
    // Arrange
    const mockDispatch = jest.fn();
    const { getByText } = renderWithProviders(mockDispatch);

    // Act
    fireEvent.press(getByText('Add to Cart'));

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: mockProducts[0],
    });
  });

  test('copies product title to clipboard when title is pressed', async () => {
    // Arrange
    const { getByText } = renderWithProviders();

    // Act
    fireEvent.press(getByText('Test Product'));

    // Assert
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith('Test Product');
  });

  test('renders error state when there is no selected product', async () => {
    // Arrange
    const { getByText } = render(
      <ProductContext.Provider
        value={{
          products: [],
          setProducts: () => {},
        }}
      >
        <CartDispatchContext.Provider value={() => {}}>
          <ProductDetails />
        </CartDispatchContext.Provider>
      </ProductContext.Provider>,
    );
    expect(getByText('No product selected.')).toBeTruthy();

    // Act
    const backButton = getByText('Go Back to Product List');
    fireEvent.press(backButton);

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});
