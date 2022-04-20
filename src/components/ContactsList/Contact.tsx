import React, {
	useState,
} from 'react';
import ContactForm from '../ContactForm';

function Contact({
	contactItem, removeItem,
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
			<button type="button" onClick={() => setEdit(true)}>edit</button>
			{edit && <ContactForm buttonText="edit" />}
		</li>
	);
}

export default Contact;
