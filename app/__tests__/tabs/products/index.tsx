import React, { useState } from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import ProductList from "@/app/(tabs)/products";
import { ProductContext } from "@/context/product-context";
import { CartDispatchContext } from "@/context/cart-context";
import { Product } from "@/types";

jest.mock("react-native-drawer-layout", () => {
  return {
    __esModule: true,
    Drawer: ({
      children,
      renderDrawerContent,
    }: {
      children: React.ReactNode;
      renderDrawerContent: () => React.ReactNode;
    }) => (
      <>
        {children}
        {renderDrawerContent()}
      </>
    ),
  };
});

const mockProducts = [
  {
    id: 1,
    title: "Test Product",
    description: "Test Description",
    price: 10,
    image: "https://via.placeholder.com/150",
    category: "electronics",
    rating: { rate: 4.5, count: 100 },
  },
];

const renderWithProviders = (addToCart = jest.fn()) => {
  const Wrapper = ({ children }: { children: JSX.Element }) => {
    const [products, setProducts] = React.useState<Product[]>([]);
    return (
      <ProductContext.Provider value={{ products, setProducts }}>
        <CartDispatchContext.Provider value={addToCart}>
          {children}
        </CartDispatchContext.Provider>
      </ProductContext.Provider>
    );
  };

  return render(<ProductList />, { wrapper: Wrapper });
};

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Product List", () => {
  test("loading indicator appears initially and then disappears", async () => {
    // Arrange
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    const { getByTestId, queryByTestId } = renderWithProviders();

    // Assert
    expect(getByTestId("loading-spinner")).toBeTruthy();

    // Loading indicator should disappear after fetch
    await waitFor(() => {
      expect(queryByTestId("loading-spinner")).toBeNull();
    });
  });

  test("displays product after fetching", async () => {
    // Arrange
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    const { getByText } = renderWithProviders();

    // Assert
    await waitFor(() => expect(getByText("Test Product")).toBeTruthy());
  });

  test("filters product list by text input", async () => {
    // Arrange
    jest.useFakeTimers();

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    const { getByPlaceholderText, queryByText } = renderWithProviders();

    await waitFor(() => expect(queryByText("Test Product")).toBeTruthy());
    const input = getByPlaceholderText("Search products...");

    // Act
    fireEvent.changeText(input, "non-existent");

    await act(async () => {
      jest.runAllTimers();
    });

    // Assert
    await waitFor(() => expect(queryByText("Test Product")).toBeNull());
    expect(queryByText("Try adjusting filters")).toBeTruthy();

    jest.useRealTimers();
  });

  test("displays error on fetch failure", async () => {
    // Arrange
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));

    // Assert
    const { findByText } = renderWithProviders();
    const errorMessage = await findByText(/Fetch failed/i);
    expect(errorMessage).toBeTruthy();
  });

  test("shows 'No products available' when list is empty", async () => {
    // Arrange
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    const { getByText } = renderWithProviders();

    // Assert
    await waitFor(() =>
      expect(getByText("No products available")).toBeTruthy()
    );
  });

  test("opens drawer on filter button press", async () => {
    // Arrange
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    const { getByLabelText, getByPlaceholderText, getByText } =
      renderWithProviders();
    await waitFor(() => getByPlaceholderText("Search products..."));

    // Act
    const button = getByLabelText("filter");
    fireEvent.press(button);

    // Assert: DrawerContent is visible
    await waitFor(() => {
      expect(getByText("Filters")).toBeTruthy(); // Or any unique text inside the drawer
    });
  });
});
