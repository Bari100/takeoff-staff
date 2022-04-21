import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const contact = {
	firstName: '',
	lastName: '',
}

const initialState = {
	contacts: [
		{
			id: 0,
			firstName: '',
			lastName: '',
		}
	],
	contact,
	edit: false,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
		setContact: (state, action) => {
      state.contact = action.payload;
    },
		setEdit: (state, action) => {
			state.edit = action.payload;
		}
  },
});

export const { setContacts, setContact, setEdit } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectContact = (state: RootState) => state.contacts.contact;
export const selectEdit = (state: RootState) => state.contacts.edit;

export default contactsSlice.reducer;
