import { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

export type TextInputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({ startDecorator, endDecorator, ...rest }: TextInputProps) => {
  return (
    <div className="d-flex align-items-center w-100">
      {startDecorator && <div className=" d-inline-flex me-2">{startDecorator}</div>}
      <input {...rest} />
      {endDecorator && <div className=" d-inline-flex ms-2">{endDecorator}</div>}
    </div>
  );
};

export { TextInput };
