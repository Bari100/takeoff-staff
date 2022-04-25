import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ResponseData {
  accessToken: string | null
  user: {
    email: string
    id: number
  }
}

export interface AuthState {
  responseData: ResponseData;
}

const initialState: AuthState = {
  responseData: {
    accessToken: localStorage.getItem('token'),
    user: {
      email: '',
      id: 0,
    },
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setResponseData: (state, action) => action.payload,
  },
});

export const { setResponseData } = authSlice.actions;

export const selectResponseData = (state: RootState) => state.auth.responseData;

export default authSlice.reducer;
