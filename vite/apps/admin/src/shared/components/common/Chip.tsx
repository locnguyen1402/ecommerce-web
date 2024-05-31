import { ReactNode } from 'react';

import clsx from 'clsx';

export type ChipColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  // | 'light'
  | 'dark';

type ChipProps = {
  className?: string;
  color?: ChipColor;
  label: ReactNode;
};

const Chip = ({ color = 'primary', label, className }: ChipProps) => {
  return (
    <div className={clsx('badge border', `badge-light-${color} border-${color}`, className)}>{label}</div>
  );
};

export { Chip };
