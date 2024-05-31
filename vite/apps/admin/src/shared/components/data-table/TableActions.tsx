import { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { Dropdown, DropdownItem } from '../common';

type ActionButton = {
  title: string;
  onClick?: MouseEventHandler<HTMLElement>;
  icon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  href?: string;
};

type Props = {
  actions: ActionButton[];
};

const TableActions = ({ actions }: Props) => {
  return (
    <Dropdown
      dropdownButton={
        <div className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
          <i className="bi bi-three-dots fs-3" />
        </div>
      }
    >
      <div className="menu menu-column menu-rounded menu-gray-600 menu-state-bg-primary">
        {!!actions?.length &&
          actions.map((btn, index) => {
            return (
              <DropdownItem
                key={`${btn.title}_${index}`}
                to={btn.href!}
                as={btn.href ? Link : undefined}
                className={clsx('menu-item px-3', {
                  'opacity-25': btn.isDisabled,
                })}
                disabled={btn.isDisabled}
                onClick={btn.isLoading ? undefined : btn.onClick}
              >
                <div className="menu-link fw-bold fs-7">
                  <span className="me-auto">{btn.title}</span>
                  {!btn.isLoading ? (
                    btn.icon
                  ) : (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                </div>
              </DropdownItem>
            );
          })}
      </div>
    </Dropdown>
  );
};

export { TableActions };
