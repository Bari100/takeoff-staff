import React, {
	useState,
} from 'react';
import { useAppDispatch } from '../../utils/hooks';
import ContactForm from '../ContactForm';
import { setEditId } from '../../redux/contactsSlice';

function Contact({
	contactId, setContactId, contactItem, removeItem, editId, editItem,
}: any) {
	const dispatch = useAppDispatch();

	return (
		<li>
			<div>
				{contactItem.firstName}
			</div>
			<div>
				{contactItem.lastName}
			</div>
			<button type="button" onClick={removeItem}>remove</button>
			<button type="button" onClick={
				() => {
						dispatch(setEditId(contactId));
						setContactId(contactId)
					}
				}
			>
				edit
			</button>
			{editId === contactId &&
				<ContactForm 
					onSubmit={editItem} 
					buttonText="edit" 
					firstName={contactItem.firstName} 
					lastName={contactItem.lastName}
					cancelButton
				/>
			}
		</li>
	);
}

export default Contact;
