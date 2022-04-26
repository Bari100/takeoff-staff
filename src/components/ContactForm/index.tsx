import React, { FormEventHandler, RefObject } from 'react';
import { setEditId } from '../../redux/contactsSlice';
import { useAppDispatch } from '../../utils/hooks';

interface ContactFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>
  buttonText: string
  firstName?: string
  lastName?: string
  cancelButton?: boolean
  formRef?: RefObject<HTMLFormElement>
}

function ContactForm({
  onSubmit,
  buttonText,
  firstName = '',
  lastName = '',
  cancelButton = false,
  formRef,
}: ContactFormProps) {
  const dispatch = useAppDispatch();

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <input type="text" name="firstName" defaultValue={firstName} required />
      <input type="text" name="lastName" defaultValue={lastName} required />
      <button type="submit">{buttonText}</button>
      {cancelButton
        && <button type="button" onClick={() => dispatch(setEditId(undefined))}>cancel</button>}
    </form>
  );
}

export default ContactForm;
