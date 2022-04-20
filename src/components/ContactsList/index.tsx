import React, { useCallback, useEffect } from 'react';
import Contact from './Contact';
import ContactForm from '../ContactForm';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectContacts, setContacts } from '../../redux/contactsSlice';

function Contacts() {
  const dispatch = useAppDispatch();
  
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

  function removeItem(id: number) {
    dispatch({type: 'REMOVE_CONTACT', id})
  }

  console.log(contactsList);

  return (
    <div>
      <ul>
        {contactsList.map((contactItem) => (
          <Contact
            key={contactItem.id}
            contactItem={contactItem}
            removeItem={() => removeItem(contactItem.id)}
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
