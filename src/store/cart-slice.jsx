import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from "../firebase";
import { toast } from "react-toastify";

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async () => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      const userData = await getDoc(doc(db, 'users', userId));
      const productsData = await getDocs(collection(db, 'products'));

      const allProducts = [];
      productsData.forEach((doc) => {
        allProducts.push({ ...doc.data(), id: doc.id });
      });

      if (userData.exists()) {
        const cartItems = userData.data().cartItems;
        const products = [];

        if (cartItems) {
          products.push(...cartItems.map(item => {
            const matchingProduct = allProducts.find(product => product.id === item.id);
            return {
              id: matchingProduct.id,
              title: matchingProduct.title,
              image: matchingProduct.image,
              price: matchingProduct.price,
              rating: matchingProduct.rating,
              stock: matchingProduct.stock,
              quantity: item.quantity,
            };
          }));
        }

        let totalQuantity = 0;
        let totalPrice = 0;

        for (const product of products) {
          totalPrice += product.price * product.quantity;
          totalQuantity += product.quantity;
        }

        return {
          cartItems: products,
          totalQuantity,
          totalPrice,
        };
      }
    } catch (error) {
      console.log(error)
    }
  }
);

export const removeAllItemsInCart = createAsyncThunk(
  'cart/removeAllItemsInCart',
  async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    await updateDoc(doc(db, 'users', userId), {
      cartItems: []
    });
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ cartItems, product }) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      if (!cartItems.find(cartItem => cartItem.id === product.id) && product.stock >= 1) {
        const updatedCartItems = [
          {
            id: product.id,
            image: product.image,
            price: product.price,
            quantity: 1,
            rating: product.rating,
            stock: product.stock,
            title: product.title,
          },
          ...cartItems
        ]

        const updatedFirestoreCartItems = [];
        for (const cartItem of updatedCartItems) {
          const newItem = {};
          for (let key in cartItem) {
            if (key === 'id' || key === 'quantity') {
              newItem[key] = cartItem[key];
            }
          }
          updatedFirestoreCartItems.push(newItem);
        }

        await updateDoc(doc(db, 'users', userId), {
          cartItems: updatedFirestoreCartItems
        });

        let totalQuantity = 0;
        let totalPrice = 0;
  
        for (const cartItem of updatedCartItems) {
          totalPrice += cartItem.price * cartItem.quantity;
          totalQuantity += cartItem.quantity;
        }
  
        toast.success('Added product to cart!')
        
        return {
          cartItems: updatedCartItems,
          totalQuantity,
          totalPrice,
        };
      } else if (product.stock < 1) {
        toast.error('Product is not available!');
      } else {
        toast.info('Product is already in cart!')
      }

    } catch (error) {
      toast.error('You need to log in first!')
    }
  }
)

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ cartItems, productId }) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      if (cartItems.find(cartItem => cartItem.id === productId)) {
        const updatedFirestoreCartItems = [];

        for (const cartItem of cartItems) {
          const newItem = {};
          for (let key in cartItem) {
            if (key === 'id' || key === 'quantity') {
              newItem[key] = cartItem[key];
            }
          }
          updatedFirestoreCartItems.push(newItem);
        }

        await updateDoc(doc(db, 'users', userId), {
          cartItems: updatedFirestoreCartItems.filter(item => item.id !== productId)
        });

        const updatedCartItems = cartItems.filter(item => item.id !== productId);

        let totalQuantity = 0;
        let totalPrice = 0;

        for (const cartItem of updatedCartItems) {
          totalPrice += cartItem.price * cartItem.quantity;
          totalQuantity += cartItem.quantity;
        }

        toast.success('Removed product from cart!')
        
        return {
          cartItems: updatedCartItems,
          totalQuantity,
          totalPrice,
        };
      }

      toast.info('Product is not in cart!')

    } catch (error) {
      toast.error('You need to log in first!')
    }
  }
)

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ cartItems, productId, quantity }, thunkAPI) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      const existingProduct = cartItems.find(cartItem => cartItem.id === productId);
      const updatedQuantity = existingProduct.quantity + quantity;

      if(updatedQuantity > 0 && updatedQuantity <= existingProduct.stock) {
        const updatedCartItems = [];
        for (const cartItem of cartItems) {
          let itemQuantity = cartItem.quantity;
          if (cartItem.id === productId) {
            itemQuantity += quantity;
          }
          updatedCartItems.push({...cartItem, quantity: itemQuantity});
        }

        const updatedFirestoreCartItems = []
        for (const cartItem of updatedCartItems) {
          const newItem = {};
          for (let key in cartItem) {
            if (key === 'id' || key === 'quantity') {
              newItem[key] = cartItem[key];
            }
          }
          updatedFirestoreCartItems.push(newItem);
        }

        await updateDoc(doc(db, 'users', userId), {
          cartItems: updatedFirestoreCartItems
        });

        let totalQuantity = 0;
        let totalPrice = 0;

        for (const cartItem of updatedCartItems) {
          totalPrice += cartItem.price * cartItem.quantity;
          totalQuantity += cartItem.quantity;
        }

        toast.success('Updated product quantity!')
        
        return {
          cartItems: updatedCartItems,
          totalQuantity,
          totalPrice,
        };
      } else if (updatedQuantity > existingProduct.stock) {
        toast.error('Exceeded stock!')
      } else if (updatedQuantity < 1) {
        thunkAPI.dispatch(removeItemFromCart({cartItems, productId}))
      }

    } catch (error) {
      toast.error('You need to log in first!')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    emptyCart(state) {
      state.items = initialCartState.items;
      state.totalQuantity = initialCartState.totalQuantity;
      state.totalPrice = initialCartState.totalPrice;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeAllItemsInCart.fulfilled, (state) => {
        state.items = initialCartState.items;
        state.totalQuantity = initialCartState.totalQuantity;
        state.totalPrice = initialCartState.totalPrice;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.cartItems;
          state.totalQuantity = action.payload.totalQuantity;
          state.totalPrice = action.payload.totalPrice;
        }
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.cartItems;
          state.totalQuantity = action.payload.totalQuantity;
          state.totalPrice = action.payload.totalPrice;
        }
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.cartItems;
          state.totalQuantity = action.payload.totalQuantity;
          state.totalPrice = action.payload.totalPrice;
        }
      })
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;