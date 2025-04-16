import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

/*
 * The maximum rating value for the stars.
 * This is used to determine how many stars to render.
 */
export const RATING_MAX = 5;

/**
 * @description Renders a star rating based on the given rating value.
 * Stars will be colored gold if the rating is less than that number and gray if not.
 * Only checks whole numbers currently
 * @param {number} rating - The rating value (1 to 5)
 */
export function renderStars(rating: number) {
  const starElements = [];
  for (let i = 1; i <= RATING_MAX; i++) {
    starElements.push(
      <Ionicons
        key={i}
        name="star"
        size={16}
        color={i <= rating ? Colors.warning : Colors.lowContrast}
      />,
    );
  }
  return starElements;
}
