import React, {
	useState,
} from 'react';
import ContactForm from '../ContactForm';

function Contact({
	contactId, setContactId, contactItem, removeItem, editItem,
}: any) {
	const [edit, setEdit] = useState(false);

	return (
		<li>
			<div>
				{contactItem.firstName}
			</div>
			<div>
				{contactItem.lastName}
			</div>
			<button type="button" onClick={removeItem}>remove</button>
			<button type="button" onClick={() => {
						setEdit(true)
						setContactId(contactId)
					}
				}
			>
				edit
			</button>
			{edit && <ContactForm onSubmit={editItem} buttonText="edit" />}
		</li>
	);
}

export default Contact;
