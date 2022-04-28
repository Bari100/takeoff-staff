import React, { ReactNode } from 'react';
import css from './Button.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset'
  children: ReactNode
}

function Button({ type, children }: ButtonProps) {
  return (
    <button type={type} className={css.button}>{children}</button>
  );
}

export default Button;
