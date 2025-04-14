import ProductDetails from "@/app/(tabs)/products/[id]";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import * as Clipboard from "expo-clipboard";
import { ProductContext } from "@/context/product-context";
import { CartDispatchContext } from "@/context/cart-context";
import { Product } from "@/types";

// Mock Clipboard
jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(),
}));

// Mock go back
jest.mock("expo-router", () => {
  (globalThis as any).navigateMock = jest.fn();
  const original = jest.requireActual("expo-router");
  return {
    ...original,
    useRouter: () => ({
      navigate: (globalThis as any).navigateMock,
    }),
  };
});

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "This is a test product",
  category: "Test Category",
  image: "https://via.placeholder.com/150",
  price: 100,
  rating: { rate: 4.5, count: 10 },
};

const renderWithProviders = (addToCartMock = jest.fn()) =>
  render(
    <ProductContext.Provider
      value={{
        selectedProduct: mockProduct,
        setSelectedProduct: (product: Product) => {},
      }}
    >
      <CartDispatchContext.Provider value={addToCartMock}>
        <ProductDetails />
      </CartDispatchContext.Provider>
    </ProductContext.Provider>
  );

describe("ProductDetails Screen", () => {
  beforeEach(() => {
    // Reset mock before each test
    (globalThis as any).navigateMock?.mockReset();
  });

  test("renders product details", () => {
    // Arrange
    const { getByText } = renderWithProviders();

    // Act
    expect(getByText("Test Product")).toBeTruthy();
    expect(getByText("This is a test product")).toBeTruthy();
    expect(getByText("Test Category")).toBeTruthy();
    expect(getByText("$100")).toBeTruthy();
  });

  test("adds product to cart when 'Add to Cart' is pressed", () => {
    // Arrange
    const mockDispatch = jest.fn();
    const { getByText } = renderWithProviders(mockDispatch);

    // Act
    fireEvent.press(getByText("Add to Cart"));

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TO_CART",
      payload: mockProduct,
    });
  });

  test("copies product title to clipboard when title is pressed", async () => {
    // Arrange
    const { getByText } = renderWithProviders();

    // Act
    fireEvent.press(getByText("Test Product"));

    // Assert
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith("Test Product");
  });

  test("renders error state when there is no selected product", async () => {
    // Arrange
    const { getByText } = render(
      <ProductContext.Provider
        value={{
          selectedProduct: null,
          setSelectedProduct: (product: Product) => {},
        }}
      >
        <CartDispatchContext.Provider value={() => {}}>
          <ProductDetails />
        </CartDispatchContext.Provider>
      </ProductContext.Provider>
    );
    expect(getByText("No product selected.")).toBeTruthy();

    // Act
    const backButton = getByText("Go Back to Product List");
    fireEvent.press(backButton);

    // Assert
    expect((globalThis as any).navigateMock).toHaveBeenCalledWith("/products");
  });
});
