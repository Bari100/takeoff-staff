import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState = {
  contacts: [
    {
      firstName: '',
      lastName: '',
      id: -1,
    },
  ],
  editId: -1,
  contactsError: false,
  contactInteractionError: false,
  noResults: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    setContactsError: (state, action) => {
      state.contactsError = action.payload;
    },
    setContactInteractionError: (state, action) => {
      state.contactInteractionError = action.payload;
    },
    setNoResults: (state, action) => {
      state.noResults = action.payload;
    },
  },
});

export const {
  setContacts, setEditId, setContactsError, setContactInteractionError, setNoResults,
} = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectEditId = (state: RootState) => state.contacts.editId;
export const selectContactsError = (state: RootState) => state.contacts.contactsError;
export const selectContactInteractionError = (state: RootState) => (
  state.contacts.contactInteractionError
);
export const selectNoResults = (state: RootState) => state.contacts.noResults;

export default contactsSlice.reducer;
