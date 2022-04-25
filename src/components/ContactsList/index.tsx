import React, {
  FormEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import Contact from './Contact';
import ContactForm from '../ContactForm';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectContacts, selectEditId, setEditId } from '../../redux/contactsSlice';

function Contacts() {
  const dispatch = useAppDispatch();
  const [contactId, setContactId] = useState(-1);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    dispatch({ type: 'GET_CONTACTS' });
  }, [dispatch]);

  const contactsList = useAppSelector(selectContacts);
  const editId = useAppSelector(selectEditId);

  const addItem = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
    };
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const contact = {
      firstName,
      lastName,
    };
    dispatch({ type: 'ADD_CONTACT', contact });
    formRef.current?.reset();
  }, [dispatch]);

  const removeItem = (contactId: number) => {
    dispatch({ type: 'REMOVE_CONTACT', contactId });
  };

  const editItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
    };
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const contact = {
      firstName,
      lastName,
    };
    dispatch(setEditId(undefined));
    dispatch({ type: 'EDIT_CONTACT', payload: { contact, contactId } });
  };

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
            editId={editId}
            editItem={editItem}
          />
        ))}
      </ul>
      <ContactForm
        formRef={formRef}
        onSubmit={addItem}
        buttonText="add"
      />
    </div>
  );
}

export default Contacts;
