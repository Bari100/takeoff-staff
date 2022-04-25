import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  contacts: [
    {
      firstName: '',
      lastName: '',
      id: -1,
    },
  ],
  editId: -1,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => action.payload,
    setEditId: (state, action) => action.payload,
  },
});

export const { setContacts, setEditId } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectEditId = (state: RootState) => state.contacts.editId;

export default contactsSlice.reducer;
