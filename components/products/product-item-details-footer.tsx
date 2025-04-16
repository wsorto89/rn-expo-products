import { StyleSheet, Text, View } from 'react-native';
import SmartButton from '@/components/ui/smart-button';
import { Colors } from '@/constants/colors';
import { useCartDispatch } from '@/context/cart-context';
import { useProductContext } from '@/context/product-context';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Product } from '@/types';

type ProductItemDetailsFooterProps = {
  curProduct: Product;
  index: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

/**
 * @description Swipeable footer that lets you go to the next item in the list, as well as add the current item to the cart
 * @param {Product} curProduct - current product
 * @param {number} index - current index in the list of products
 * @param {Dispatch<SetStateAction<boolean>>} setIsLoading - sets the loading state of the whole screen
 */
const ProductItemDetailsFooter = ({
  curProduct,
  index,
  setIsLoading,
}: ProductItemDetailsFooterProps) => {
  const router = useRouter();
  const cartDispatcher = useCartDispatch();
  const { products } = useProductContext();
  const swipeableRef = useRef<SwipeableMethods | null>(null);

  const handleAddToCartPress = () => {
    cartDispatcher({ type: 'ADD_TO_CART', payload: curProduct });
  };

  const onSwipeLeft = () => {
    if (index > 0) {
      router.push(`/products/${products[index - 1].id}`);
    }
  };

  const onSwipeRight = () => {
    if (index < products.length - 1) {
      router.push(`/products/${products[index + 1].id}`);
    }
  };

  const onSwipeableOpen = (direction: 'left' | 'right') => {
    setIsLoading(true);

    setTimeout(() => {
      if (direction === 'left') {
        onSwipeLeft();
      } else if (direction === 'right') {
        onSwipeRight();
      }

      if (swipeableRef.current) {
        // resets swipeable back to the center
        swipeableRef.current.close();
      }
      setIsLoading(false);
    }, 200);
  };

  const renderLeftActions = () => (
    <View style={styles.swipeAction}>
      <Text style={styles.text}>Previous</Text>
    </View>
  );
  const renderRightActions = () => (
    <View style={styles.swipeAction}>
      <Text style={styles.text}>Next</Text>
    </View>
  );

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableOpen={onSwipeableOpen}
    >
      <View style={styles.footer}>
        <View style={styles.row}>
          <View style={styles.footerSide}>
            <SmartButton style={styles.circleButton} onPress={onSwipeLeft}>
              <AntDesign name="leftcircleo" size={36} color={Colors.text} />
            </SmartButton>
            <Text style={[styles.price, styles.text]}>${curProduct.price}</Text>
          </View>
          <View style={styles.footerSide}>
            <SmartButton
              onPress={handleAddToCartPress}
              backgroundColor={Colors.highlight}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </SmartButton>
            <SmartButton style={styles.circleButton} onPress={onSwipeRight}>
              <AntDesign name="rightcircleo" size={36} color={Colors.text} />
            </SmartButton>
          </View>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.foreground,
    borderTopWidth: 2,
    borderColor: Colors.lowContrast,
  },
  footerSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  circleButton: {
    padding: 0,
    borderRadius: 20,
  },
  addToCartText: {
    color: Colors.contrast,
  },
  swipeAction: {
    justifyContent: 'center',
    padding: 4,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
  },
});

export default ProductItemDetailsFooter;
