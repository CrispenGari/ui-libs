import React, { FC, HTMLAttributes, ReactNode } from 'react';
export interface Props extends HTMLAttributes<HTMLButtonElement> {
  /** The title of the button */
  children?: ReactNode;
  /** the variant of the button defalt is primary */
  variant: 'primary' | 'secondary';
}

/** my simple button component */
export const Button: FC<Props> = ({
  children,
  variant = 'primary',
  style,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button ${className ?? ''}`}
      style={{
        backgroundColor: variant === 'primary' ? 'black' : 'red',
        ...style,
      }}
    >
      {children}
    </button>
  );
};
