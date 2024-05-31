/* eslint-disable no-prototype-builtins */
import { useEffect } from 'react';
import { ILayout, useLayout } from '../../core';
import {
  ToolbarAccounting,
  ToolbarClassic,
  ToolbarExtended,
  ToolbarReports,
  ToolbarSaas,
} from './toolbars';

const Toolbar = () => {
  const { config } = useLayout();

  switch (config.app?.toolbar?.layout) {
    case 'classic':
      return <ToolbarClassic />;
    case 'accounting':
      return <ToolbarAccounting />;
    case 'extended':
      return <ToolbarExtended />;
    case 'reports':
      return <ToolbarReports />;
    case 'saas':
      return <ToolbarSaas />;
    default:
      return <ToolbarClassic />;
  }
};

export { Toolbar };
