import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
	contacts: [
		{
			id: 0,
			firstName: '',
			lastName: '',
		}
	],
	editId: undefined,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
		setEditId: (state, action) => {
			state.editId = action.payload;
		}
  },
});

export const { setContacts, setEditId } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectEditId = (state: RootState) => state.contacts.editId;

export default contactsSlice.reducer;
