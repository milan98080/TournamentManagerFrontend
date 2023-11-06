import { ButtonHTMLAttributes } from 'react';
import { AbsoluteSpinner } from '../spinner';

/* eslint-disable-next-line */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  name?: string;
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  isLoading = false,
  name = 'Submit',
  type = 'button',
  size = 'medium',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`btn ${
        size === 'small' ? 'btn-xxs' : 'btn'
      } bg-green-600 w-full flex items-center justify-center text-gray-50`}
    >
      {isLoading ? (
        <div className="flex  justify-center items-center gap-2">
          <AbsoluteSpinner />
          <p>Submitting</p>
        </div>
      ) : (
        <p> {name}</p>
      )}
    </button>
  );
}
