import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './authSlice';
import contactsReducer from './contactsSlice';
import watchFetchToken from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchToken);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
