import { renderHook, act } from "@testing-library/react-native";
import {
  CartProvider,
  useCartDispatch,
  useCartState,
} from "@/context/cart-context";
import { Product } from "@/types";
import React from "react";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const sampleProduct: Product = {
  id: 1,
  title: "Sample",
  price: 10,
  description: "desc",
  category: "cat",
  image: "url",
  rating: { rate: 4, count: 20 },
};

describe("Cart Context", () => {
  test("adds a new item to the cart", () => {
    // Arrange
    const { result } = renderHook(
      () => ({
        state: useCartState(),
        dispatch: useCartDispatch(),
      }),
      { wrapper }
    );

    // Act
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });

    // Assert
    expect(result.current.state.cartItems.size).toBe(1);
    expect(result.current.state.cartItems.get(1)?.quantity).toBe(1);
  });

  test("increments quantity when item already exists", () => {
    // Arrange
    const { result } = renderHook(
      () => ({
        state: useCartState(),
        dispatch: useCartDispatch(),
      }),
      { wrapper }
    );

    // Act
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });

    // Assert
    expect(result.current.state.cartItems.size).toBe(1);
    expect(result.current.state.cartItems.get(1)?.quantity).toBe(2);
  });

  test("Add 2 items with distinct ids", () => {
    // Arrange
    const { result } = renderHook(
      () => ({
        state: useCartState(),
        dispatch: useCartDispatch(),
      }),
      { wrapper }
    );

    // Act
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });
    act(() => {
      result.current.dispatch({
        type: "ADD_TO_CART",
        payload: { ...sampleProduct, id: 2 },
      });
    });

    // Assert
    expect(result.current.state.cartItems.size).toBe(2);
    expect(result.current.state.cartItems.get(1)?.quantity).toBe(1);
    expect(result.current.state.cartItems.get(2)?.quantity).toBe(1);
  });

  test("removes an item from the cart", () => {
    // Arrange
    const { result } = renderHook(
      () => ({
        state: useCartState(),
        dispatch: useCartDispatch(),
      }),
      { wrapper }
    );

    // Act
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });
    act(() => {
      result.current.dispatch({
        type: "REMOVE_FROM_CART",
        payload: sampleProduct.id,
      });
    });

    // Assert
    expect(result.current.state.cartItems.size).toBe(0);
  });

  test("decrements item quantity", () => {
    // Arrange
    const { result } = renderHook(
      () => ({
        state: useCartState(),
        dispatch: useCartDispatch(),
      }),
      { wrapper }
    );

    // Act
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });
    act(() => {
      result.current.dispatch({
        type: "DECREMENT_FROM_CART",
        payload: sampleProduct.id,
      });
    });

    // Assert
    expect(result.current.state.cartItems.size).toBe(1);
    expect(result.current.state.cartItems.get(1)?.quantity).toBe(1);
  });

  test("removes item if quantity reaches 0 on decrement", () => {
    // Arrange
    const { result } = renderHook(
      () => ({
        state: useCartState(),
        dispatch: useCartDispatch(),
      }),
      { wrapper }
    );

    // Act
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });
    act(() => {
      result.current.dispatch({
        type: "DECREMENT_FROM_CART",
        payload: sampleProduct.id,
      });
    });

    // Assert
    expect(result.current.state.cartItems.size).toBe(0);
  });

  test("clears the cart", () => {
    // Arrange
    const { result } = renderHook(
      () => ({
        state: useCartState(),
        dispatch: useCartDispatch(),
      }),
      { wrapper }
    );

    // Act
    act(() => {
      result.current.dispatch({ type: "ADD_TO_CART", payload: sampleProduct });
    });
    act(() => {
      result.current.dispatch({ type: "CLEAR_CART" });
    });

    // Assert
    expect(result.current.state.cartItems.size).toBe(0);
  });
});
