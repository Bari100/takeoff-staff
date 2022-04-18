import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ResponseData {
  accessToken: string
  user: {
    email: string
    id: number
  }
}

export interface AuthState {
  responseData: ResponseData;
  user: {
    email: string,
    password: string,
  }
}

const initialState: AuthState = {
  responseData: {
    accessToken: '',
    user: {
      email: '',
      id: 0,
    }
  },
  user: {
    email: '',
    password: '',
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setResponseData: (state, action) => {
      state.responseData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setResponseData, setUser } = authSlice.actions;

export const selectResponseData = (state: RootState) => state.auth.responseData;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
