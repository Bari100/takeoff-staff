import React, { useCallback, useEffect, useState } from 'react';
import Contact from './Contact';
import ContactForm from '../ContactForm';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectContacts } from '../../redux/contactsSlice';

function Contacts() {
  const dispatch = useAppDispatch();
  const [contactId, setContactId] = useState();
  
  useEffect(() => {
		dispatch({type: 'GET_CONTACTS'});
	}, [])

  const contactsList = useAppSelector(selectContacts);

  const addItem = useCallback((e:any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const contact = {
      firstName,
      lastName,
    }
    dispatch({type: 'ADD_CONTACT', contact})
  }, [contactsList]);

  const removeItem = (contactId: number) => {
    dispatch({type: 'REMOVE_CONTACT', contactId});
  };

  const editItem = (e: any) => {
		e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const contact = {
      firstName,
      lastName,
    }
		dispatch({type: 'EDIT_CONTACT', payload: {contact, contactId}});
	}

  return (
    <div>
      <ul>
        {contactsList.map((contactItem) => (
          <Contact
            key={contactItem.id}
            contactId={contactItem.id}
            setContactId={setContactId}
            contactItem={contactItem}
            removeItem={() => removeItem(contactItem.id)}
            editItem={editItem}
          />
        ))}
      </ul>
      <ContactForm
        onSubmit={addItem}
        buttonText="add"
      />
    </div>
  );
}

export default Contacts;
