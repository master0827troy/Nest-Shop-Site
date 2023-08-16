import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {collection, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore';
import { db } from "../firebase";
import {getAuth} from 'firebase/auth';

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (userId) => {
    try {
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

      const updatedFirestoreCartItems = [{id: product.id, quantity: 1}]

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
        cartItems: updatedFirestoreCartItems
      });

      const updatedCartItems = [
        ...cartItems,
        {
          id: product.id,
          image: product.image,
          price: product.price,
          quantity: 1,
          rating: product.rating,
          stock: product.stock,
          title: product.title,
        }
      ]

      let totalQuantity = 0;
      let totalPrice = 0;

      for (const cartItem of updatedCartItems) {
        totalPrice += cartItem.price * cartItem.quantity;
        totalQuantity += cartItem.quantity;
      }

      return {
        cartItems: updatedCartItems,
        totalQuantity,
        totalPrice,
      };
    } catch (error) {
      console.log(error)
    }
  }
)

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async ({ cartItems, productId }) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

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

    return {
      cartItems: updatedCartItems,
      totalQuantity,
      totalPrice,
    };
  }
)

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ cartItems, productId, quantity }) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const existingProduct = cartItems.find(cartItem => cartItem.id === productId)
    const remainingProducts = cartItems.filter(cartItem => cartItem.id !== productId);
    const updatedFirestoreCartItems = []

    for (const cartItem of remainingProducts) {
      const newItem = {};
      for (let key in cartItem) {
        if (key === 'id' || key === 'quantity') {
          newItem[key] = cartItem[key];
        }
      }
      updatedFirestoreCartItems.push(newItem);
    }

    updatedFirestoreCartItems.push({ id: existingProduct.id, quantity: existingProduct.quantity + quantity })

    await updateDoc(doc(db, 'users', userId), {
      cartItems: updatedFirestoreCartItems
    });

    const updatedCartItems = [
      ...remainingProducts,
      {
        ...existingProduct,
        quantity: existingProduct.quantity + quantity
      }
    ]

    let totalQuantity = 0;
    let totalPrice = 0;

    for (const cartItem of updatedCartItems) {
      totalPrice += cartItem.price * cartItem.quantity;
      totalQuantity += cartItem.quantity;
    }

    return {
      cartItems: updatedCartItems,
      totalQuantity,
      totalPrice,
    };
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
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
        state.items = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.items = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;