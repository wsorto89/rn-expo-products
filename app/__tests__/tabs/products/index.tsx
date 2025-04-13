import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProductList from "@/app/(tabs)/products";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

const renderWithProviders = () => {
  return render(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProductList />
    </GestureHandlerRootView>
  );
};

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Product List", () => {
  test("displays loading indicator initially", () => {
    const { getByTestId } = renderWithProviders();
    expect(getByTestId("ActivityIndicator")).toBeTruthy();
  });

  test("displays product after fetching", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    const { getByText } = renderWithProviders();
    await waitFor(() => expect(getByText("Test Product")).toBeTruthy());
  });

  test("filters product list by text input", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    const { getByPlaceholderText, queryByText } = render(<ProductList />);
    const input = getByPlaceholderText("Search products...");

    await waitFor(() => expect(queryByText("Test Product")).toBeTruthy());
    fireEvent.changeText(input, "non-existent");
    expect(queryByText("Test Product")).toBeNull();
  });

  test("displays error on fetch failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));

    const { findByText } = renderWithProviders();
    const errorMessage = await findByText(/Fetch failed/i);
    expect(errorMessage).toBeTruthy();
  });

  test("opens drawer on filter button press", async () => {
    const { getByLabelText, getByPlaceholderText } = renderWithProviders();
    await waitFor(() => getByPlaceholderText("Search products..."));

    const button = getByLabelText("filter");
    fireEvent.press(button);

    // You can extend this test to assert drawer contents
  });

  test("shows 'No products available' when list is empty", async () => {
    const { getByPlaceholderText, queryByText, findByText } = renderWithProviders();
    const input = getByPlaceholderText("Search products...");

    await waitFor(() => queryByText("Test Product"));
    fireEvent.changeText(input, "something that doesn't exist");

    const fallback = await findByText("No products available");
    expect(fallback).toBeTruthy();
  });
});
