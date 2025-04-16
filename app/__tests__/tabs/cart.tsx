import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Cart from '@/app/(tabs)/cart';
import { CartDispatchContext, CartStateContext } from '@/context/cart-context';
import { CartItem } from '@/types';

const sampleItem: CartItem = {
  id: 1,
  title: 'Sample Product',
  description: 'Sample description',
  price: 50,
  quantity: 2,
  image: 'https://via.placeholder.com/150',
  category: 'sample category',
  rating: {
    count: 20,
    rate: 2.5,
  },
};

const renderWithProviders = (
  cartItems: Map<number, CartItem>,
  cartDispatcher = () => {},
) => {
  return render(
    <CartStateContext.Provider value={{ cartItems }}>
      <CartDispatchContext.Provider value={cartDispatcher}>
        <Cart />
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>,
  );
};

describe('Cart Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty cart message', () => {
    // Arrange
    const cart = new Map();
    const { getByText } = renderWithProviders(cart);

    // Assert
    expect(getByText('Your cart is empty')).toBeTruthy();
    expect(getByText('Total Item(s): 0, Total Cost: $0.00')).toBeTruthy();
  });

  test('renders total items and cost', () => {
    // Arrange
    const cart = new Map<number, CartItem>([[1, sampleItem]]);
    const { getByText } = renderWithProviders(cart);

    // Assert
    expect(getByText('Total Item(s): 2, Total Cost: $100.00')).toBeTruthy();
    expect(getByText('Pull down to clear cart')).toBeTruthy();
    expect(getByText('Clear Cart')).toBeTruthy();
  });

  test('disables clear cart button when cart is empty', () => {
    // Arrange
    const cart = new Map();
    const { getByRole } = renderWithProviders(cart);

    // Act
    const clearCartButton = getByRole('button');

    // Assert
    expect(clearCartButton).toBeDisabled();
  });

  test('dispatches CLEAR_CART when Clear Cart button is pressed', () => {
    // Arrange
    const cart = new Map<number, CartItem>([[1, sampleItem]]);
    const mockDispatch = jest.fn();
    const { getByText } = renderWithProviders(cart, mockDispatch);

    // Act
    fireEvent.press(getByText('Clear Cart'));

    //Assert
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });
  });

  test('clears cart on pull-to-refresh', async () => {
    // Arrange
    jest.useFakeTimers();
    const cart = new Map<number, CartItem>([[1, sampleItem]]);
    const mockDispatch = jest.fn();
    const { getByTestId } = renderWithProviders(cart, mockDispatch);
    const flatList = getByTestId('flat-list');
    const { refreshControl } = flatList.props;

    // Act
    await act(async () => {
      refreshControl.props.onRefresh();
    });

    await act(async () => {
      jest.runAllTimers();
    });

    // Assert
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });
    });

    jest.useRealTimers(); // clean up
  });

  test('increments item quantity', () => {
    // Arrange
    const cart = new Map<number, CartItem>([[1, sampleItem]]);
    const mockDispatch = jest.fn();
    const { getByRole } = renderWithProviders(cart, mockDispatch);

    // Act
    const incrementButton = getByRole('button', { name: 'increment' });
    fireEvent.press(incrementButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: sampleItem,
    });
  });

  test('decrements item quantity', () => {
    // Arrange
    const cart = new Map<number, CartItem>([[1, sampleItem]]);
    const mockDispatch = jest.fn();
    const { getByRole } = renderWithProviders(cart, mockDispatch);

    // Act
    const decrementButton = getByRole('button', { name: 'decrement' });
    fireEvent.press(decrementButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DECREMENT_FROM_CART',
      payload: sampleItem.id,
    });
  });

  test('remove item completely', () => {
    // Arrange
    const cart = new Map<number, CartItem>([[1, sampleItem]]);
    const mockDispatch = jest.fn();
    const { getByRole } = renderWithProviders(cart, mockDispatch);

    // Act
    const removeButton = getByRole('button', { name: 'remove' });
    fireEvent.press(removeButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FROM_CART',
      payload: sampleItem.id,
    });
  });
});
