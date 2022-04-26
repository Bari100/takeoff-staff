import React, {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import Contact from './Contact';
import ContactForm from '../ContactForm';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  selectContactInteractionError,
  selectContacts, selectContactsError, selectEditId, setEditId,
} from '../../redux/contactsSlice';
import ErrorMessage from '../ErrorMessage';

function ContactsList() {
  const dispatch = useAppDispatch();
  const [id, setId] = useState(-1);
  const formRef = useRef<HTMLFormElement>(null);

  const contactsList = useAppSelector(selectContacts);
  const editId = useAppSelector(selectEditId);
  const contactsError = useAppSelector(selectContactsError);
  const contactInteractionError = useAppSelector(selectContactInteractionError);

  useEffect(() => {
    dispatch({ type: 'GET_CONTACTS' });
  }, [dispatch]);

  const getContact = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
    };
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const contact = {
      firstName,
      lastName,
    };
    return contact;
  };

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact = getContact(e);
    dispatch({ type: 'ADD_CONTACT', contact });
    formRef.current?.reset();
  };

  const removeItem = (contactId: number) => {
    dispatch({ type: 'REMOVE_CONTACT', contactId });
  };

  const editItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact = getContact(e);
    const contactId = id;
    dispatch(setEditId(undefined));
    dispatch({ type: 'EDIT_CONTACT', payload: { contact, contactId } });
  };

  return (
    <>
      {!contactsError ? (
        <div>
          <ul>
            {contactsList.map((contactItem) => (
              <Contact
                key={contactItem.id}
                contactId={contactItem.id}
                setContactId={setId}
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
      ) : (
        <strong>{'Contacts can\'t be loaded'}</strong>
      )}
      {contactInteractionError && <ErrorMessage delay={5000} />}
    </>
  );
}

export default ContactsList;
