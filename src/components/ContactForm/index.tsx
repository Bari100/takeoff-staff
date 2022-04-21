import React, { FormEventHandler } from 'react';

interface FormTextEmailProps {
  onSubmit: FormEventHandler<HTMLFormElement>
  buttonText: string
}

function FormTextEmail({
  onSubmit, buttonText,
}: FormTextEmailProps) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="firstName" required />
      <input type="text" name="lastName" required />
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default FormTextEmail;