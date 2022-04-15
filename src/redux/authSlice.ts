import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AuthState {
  token: string;
  user: {
    email: string,
    password: string,
  }
}

const initialState: AuthState = {
  token: '',
  user: {
    email: '',
    password: '',
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setToken, setUser } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
