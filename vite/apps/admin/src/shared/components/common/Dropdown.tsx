import { HTMLProps, ReactNode, forwardRef, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { default as Base } from 'react-bootstrap/Dropdown';

const DropdownButton = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(
  ({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref as any}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick(e as any);
      }}
    >
      {children}
    </a>
  )
);

const DropdownMenu = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        {children}
      </div>
    );
  }
);

type Props = {
  dropdownButton: (options: { open: () => void }) => ReactNode;
  className?: string;
  children: ReactNode | ((props: { close: () => void }) => ReactNode);
};

const Dropdown = ({ children, dropdownButton, className }: Props) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  const open = () => setShow(true);
  const close = () => setShow(false);

  useOnClickOutside(ref, close);

  return (
    <Base ref={ref} className={className} show={show}>
      <Base.Toggle as={DropdownButton}>{dropdownButton({ open })}</Base.Toggle>
      <Base.Menu show={show} as={DropdownMenu}>
        {typeof children === 'function' ? children({ close }) : children}
      </Base.Menu>
    </Base>
  );
};

const DropdownItem = Base.Item;
export { Dropdown, DropdownItem };
