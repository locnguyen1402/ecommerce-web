import { HTMLProps, PropsWithChildren, ReactNode, forwardRef } from 'react';

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

type Props = PropsWithChildren<{
  dropdownButton: ReactNode;
  className?: string;
}>;

const Dropdown = ({ children, dropdownButton, className }: Props) => {
  return (
    <Base className={className}>
      <Base.Toggle as={DropdownButton}>{dropdownButton}</Base.Toggle>
      <Base.Menu as={DropdownMenu}>{children}</Base.Menu>
    </Base>
  );
};

const DropdownItem = Base.Item;
export { Dropdown, DropdownItem };
