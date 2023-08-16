import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';

const initialAuthState = {
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state){
      state.isAuthenticated = true;
    },
    logout(state){
      state.isAuthenticated = false;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;