import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeAllItemsInCart, removeItemFromCart, updateItemQuantity } from '../store/cart-slice';
import { addItemToWishlist, removeItemFromWishlist } from '../store/WishlistSlice';

const useProductActions = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items)
  const wishlistItems = useSelector(state => state.wishlist.items)

  const isInCart = (productId) => {
    return !!cartItems.find(item => item.id === productId)
  }
  
  const isInWishlist = (productId) => {
    return !!wishlistItems.find(item => item === productId)
  }

  const addToCart = (product) => {
    dispatch(addItemToCart({ cartItems, product }));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItemFromCart({ cartItems, productId }));
  };

  const increaseItem = (productId) => {
    dispatch(updateItemQuantity({ cartItems, productId, quantity: 1 }));
  };

  const decreaseItem = (productId) => {
    dispatch(updateItemQuantity({ cartItems, productId, quantity: -1 }));
  };

  const emptyCart = () => {
    dispatch(removeAllItemsInCart());
  };

  const addToWishlist = (productId) => {
    dispatch(addItemToWishlist({ wishlistItems, itemId: productId }))
  };
  
  const removeFromWishlist = (productId) => {
    dispatch(removeItemFromWishlist({ wishlistItems, itemId: productId }))
  };

  return {
    isInCart,
    addToCart,
    removeFromCart,
    increaseItem,
    decreaseItem,
    emptyCart,
    isInWishlist,
    addToWishlist,
    removeFromWishlist
  }
};

export default useProductActions;