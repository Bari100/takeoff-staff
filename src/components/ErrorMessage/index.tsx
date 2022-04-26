import React from 'react';
import { selectContactInteractionError, setContactInteractionError } from '../../redux/contactsSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

interface ErrorMessageProps {
  delay: number
}

function ErrorMessage({ delay }: ErrorMessageProps) {
  const dispatch = useAppDispatch();
  const contactInteractionError = useAppSelector(selectContactInteractionError);

  setTimeout(() => {
    dispatch(setContactInteractionError(false));
  }, delay);

  return contactInteractionError ? <div>Some error occurred</div> : null;
}

export default ErrorMessage;
