/**
 * @description Product type representing a single product in the store.
 */
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

/**
 * @description Filters used to narrow down the list of products.
 * @property {number | null} minRating - Minimum acceptable rating (1–5). Null means no filter.
 * @property {number | null} maxPrice - Maximum price in USD. Null means no filter.
 * @property {string | null} category - Product category to filter by. Null means all categories.
 */
export type ProductFilters = {
  minRating: number | null;
  maxPrice: number | null;
  category: string | null;
};

/**
 * @description Cart item type representing a product in the shopping cart.
 * @property {Product} product - The product object.
 * @property {number} quantity - The quantity of the product in the cart.
 */
export type CartItem = Product & { quantity: number };
