import React, {
  ChangeEvent,
  FormEvent, useEffect, useRef, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  selectContactInteractionError,
  selectContacts, selectContactsError, selectEditId, selectNoResults, setEditId,
} from '../../redux/contactsSlice';
import ErrorMessage from '../ErrorMessage';
import ContactsList from '../ContactsList';

function ContactsPage() {
  const dispatch = useAppDispatch();
  const [id, setId] = useState(-1);
  const formRef = useRef<HTMLFormElement>(null);

  const contactsList = useAppSelector(selectContacts);
  const editId = useAppSelector(selectEditId);
  const contactsListError = useAppSelector(selectContactsError);
  const contactInteractionError = useAppSelector(selectContactInteractionError);
  const noSearchResults = useAppSelector(selectNoResults);

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

  const findItem = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch({ type: 'FIND_CONTACT', value });
  };

  if (contactsListError) {
    return <strong>{'Contacts can\'t be loaded'}</strong>;
  }

  return (
    <>
      <div>
        <input type="search" onChange={findItem} />
        {!noSearchResults ? (
          <ContactsList
            contactsList={contactsList}
            setId={setId}
            removeItem={removeItem}
            editId={editId}
            editItem={editItem}
            formRef={formRef}
            addItem={addItem}
          />
        ) : (
          <strong>No results</strong>
        )}
      </div>
      {contactInteractionError && <ErrorMessage delay={5000} />}
    </>
  );
}

export default ContactsPage;
