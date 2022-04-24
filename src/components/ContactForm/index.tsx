import React, { FormEventHandler } from 'react';
import { setEditId } from '../../redux/contactsSlice';
import { useAppDispatch } from '../../utils/hooks';

interface FormTextEmailProps {
  onSubmit: FormEventHandler<HTMLFormElement>
  buttonText: string
	firstName?: string
	lastName?: string
	cancelButton?: boolean
}

function FormTextEmail({
  onSubmit,
	buttonText,
	firstName,
	lastName,
	cancelButton = false,
}: FormTextEmailProps) {
	const dispatch = useAppDispatch();

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="firstName" defaultValue={firstName} required />
      <input type="text" name="lastName" defaultValue={lastName} required />
      <button type="submit">{buttonText}</button>
			{cancelButton &&
				<button type="button" onClick={() => dispatch(setEditId(undefined))}>cancel</button>
			}
    </form>
  );
}

export default FormTextEmail;