import React, {
  Dispatch, FormEventHandler, RefObject, SetStateAction,
} from 'react';
import { ContactType } from '../../types/contacts';
import Contact from '../Contact';
import ContactForm from '../ContactForm';

interface ContactsListProps {
  contactsList: ContactType[]
  setId: Dispatch<SetStateAction<number>>
  removeItem: (contactId: number) => void
  editId: number
  editItem: FormEventHandler<HTMLFormElement>
  formRef: RefObject<HTMLFormElement>
  addItem: FormEventHandler<HTMLFormElement>
}

function ContactsList({
  contactsList, setId, removeItem, editId, editItem, formRef, addItem,
}: ContactsListProps) {
  return (
    <>
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
    </>
  );
}

export default ContactsList;
