import { Product, ProductFilters } from '@/types';

/**
 * @description Filter products based on the filter text and other filter inputs
 * @param {Product[]} products - the list of products to filter thru
 * @param {string} filterText - text that will be used to filter products by title by seeing if it includes this text
 * @param {ProductFilters} filters - filter products by rating, price, and category if the filter is set, otherwise show all
 * @returns {Product[]} filtered out results
 */
export const filterProducts = (
  products: Product[],
  filterText: string,
  filters: ProductFilters,
) =>
  products.filter(
    (product) =>
      product.title.toLowerCase().includes(filterText.toLowerCase()) &&
      (filters.minRating === null ||
        product.rating.rate >= filters.minRating) &&
      (filters.maxPrice === null || product.price <= filters.maxPrice) &&
      (filters.category === null ||
        product.category.toLowerCase() === filters.category.toLowerCase()),
  );
