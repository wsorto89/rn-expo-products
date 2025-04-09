/**
 * Product type representing a single product in the store.
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
 * Filters used to narrow down the list of products.
 *
 * @property {number | null} minRating - Minimum acceptable rating (1–5). Null means no filter.
 * @property {number | null} maxPrice - Maximum price in USD. Null means no filter.
 * @property {string | null} category - Product category to filter by. Null means all categories.
 */
export type ProductFilters = {
  minRating: number | null;
  maxPrice: number | null;
  category: string | null;
};
