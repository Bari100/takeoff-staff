import React, {
  Dispatch, FormEventHandler, MouseEventHandler, SetStateAction,
} from 'react';
import { useAppDispatch } from '../../utils/hooks';
import ContactForm from '../ContactForm';
import { setEditId } from '../../redux/contactsSlice';
import { ContactType } from '../../types/contacts';

interface ContactProps {
  contactId: number
  setContactId: Dispatch<SetStateAction<number>>
  contactItem: ContactType
  removeItem: MouseEventHandler<HTMLButtonElement>
  editId: number
  editItem: FormEventHandler<HTMLFormElement>
}

function Contact({
  contactId, setContactId, contactItem, removeItem, editId, editItem,
}: ContactProps) {
  const dispatch = useAppDispatch();

  return (
    <li>
      {`${contactItem.firstName} ${contactItem.lastName}`}

      <button
        type="button"
        onClick={() => {
          dispatch(setEditId(contactId));
          setContactId(contactId);
        }}
      >
        edit
      </button>
      <button type="button" onClick={removeItem}>remove</button>
      {editId === contactId && (
        <ContactForm
          onSubmit={editItem}
          buttonText="edit"
          firstName={contactItem.firstName}
          lastName={contactItem.lastName}
          cancelButton
        />
      )}
    </li>
  );
}

export default Contact;
