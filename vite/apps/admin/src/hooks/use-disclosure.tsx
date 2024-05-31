import { useState } from 'react';

export const useDisclosure = (initial?: boolean) => {
  const [isOpen, setOpen] = useState(!!initial);

  const toggle = () => setOpen((prev) => !prev);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
