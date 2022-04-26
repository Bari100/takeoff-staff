import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  authResponseData: {
    accessToken: localStorage.getItem('token'),
    user: {
      email: '',
      id: 0,
    },
  },
  authErrorData: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthResponseData: (state, action) => {
      state.authResponseData = action.payload;
    },
    setAuthErrorData: (state, action) => {
      state.authErrorData = action.payload;
    },
  },
});

export const { setAuthResponseData, setAuthErrorData } = authSlice.actions;

export const selectAuthResponseData = (state: RootState) => state.auth.authResponseData;
export const selectAuthErrorData = (state: RootState) => state.auth.authErrorData;

export default authSlice.reducer;
