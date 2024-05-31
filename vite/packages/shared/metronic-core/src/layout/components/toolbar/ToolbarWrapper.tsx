import { ReactNode, useEffect } from 'react';

import clsx from 'clsx';

import { Toolbar } from './Toolbar';
import { PageTitleWrapper } from './page-title';
import { ILayout, ToolbarType, useLayout } from '../../core';

type Props = {
  toolbar?: ReactNode;
};

const ToolbarWrapper = ({ toolbar }: Props) => {
  const { config, classes } = useLayout();
  if (!config.app?.toolbar?.display) {
    return null;
  }

  const isPageTitleVisible = showPageTitle(
    config.app?.toolbar?.layout,
    config.app?.pageTitle?.display
  );

  useEffect(() => {
    updateDOM(config);
    document.body.setAttribute('data-kt-app-toolbar-enabled', 'true');
  }, [config]);

  return (
    <div
      id="kt_app_toolbar"
      className={clsx('app-toolbar', classes.toolbar.join(' '), config?.app?.toolbar?.class)}
    >
      <div
        id="kt_app_toolbar_container"
        className={clsx(
          'app-container',
          classes.toolbarContainer.join(' '),
          config.app?.toolbar?.containerClass,
          config.app?.toolbar?.minimize?.enabled ? 'app-toolbar-minimize' : '',
          {
            'container-fluid': config.app?.toolbar?.container === 'fluid',
            'container-xxl': config.app?.toolbar?.container === 'fixed',
          }
        )}
      >
        {isPageTitleVisible && <PageTitleWrapper />}
        {toolbar || <Toolbar />}
      </div>
    </div>
  );
};

const showPageTitle = (appToolbarLayout?: ToolbarType, appPageTitleDisplay?: boolean): boolean => {
  const viewsWithPageTitles = ['classic', 'reports', 'saas'];
  if (!appToolbarLayout || !appPageTitleDisplay) {
    return false;
  }

  return appPageTitleDisplay && viewsWithPageTitles.some((t) => t === appToolbarLayout);
};

const updateDOM = (config: ILayout) => {
  let appToolbarSwapAttributes: { [attrName: string]: string } = {};
  const appToolbarSwapEnabled = config.app?.toolbar?.swap?.enabled;
  if (appToolbarSwapEnabled) {
    appToolbarSwapAttributes = config.app?.toolbar?.swap?.attributes as {
      [attrName: string]: string;
    };
  }

  let appToolbarStickyAttributes: { [attrName: string]: string } = {};
  const appToolbarStickyEnabled = config.app?.toolbar?.sticky?.enabled;
  if (appToolbarStickyEnabled) {
    appToolbarStickyAttributes = config.app?.toolbar?.sticky?.attributes as {
      [attrName: string]: string;
    };

    let appToolbarMinimizeAttributes: { [attrName: string]: string } = {};
    const appToolbarMinimizeEnabled = config.app?.toolbar?.minimize?.enabled;
    if (appToolbarMinimizeEnabled) {
      appToolbarMinimizeAttributes = config.app?.toolbar?.minimize?.attributes as {
        [attrName: string]: string;
      };
    }

    if (config.app?.toolbar?.fixed?.desktop) {
      document.body.setAttribute('data-kt-app-toolbar-fixed', 'true');
    }

    if (config.app?.toolbar?.fixed?.mobile) {
      document.body.setAttribute('data-kt-app-toolbar-fixed-mobile', 'true');
    }

    setTimeout(() => {
      const toolbarElement = document.getElementById('kt_app_toolbar');
      // toolbar
      if (toolbarElement) {
        const toolbarAttributes = toolbarElement
          .getAttributeNames()
          .filter((t) => t.indexOf('data-') > -1);
        toolbarAttributes.forEach((attr) => toolbarElement.removeAttribute(attr));

        if (appToolbarSwapEnabled) {
          for (const key in appToolbarSwapAttributes) {
            if (appToolbarSwapAttributes.hasOwnProperty(key)) {
              toolbarElement.setAttribute(key, appToolbarSwapAttributes[key]);
            }
          }
        }

        if (appToolbarStickyEnabled) {
          for (const key in appToolbarStickyAttributes) {
            if (appToolbarStickyAttributes.hasOwnProperty(key)) {
              toolbarElement.setAttribute(key, appToolbarStickyAttributes[key]);
            }
          }
        }

        if (appToolbarMinimizeEnabled) {
          for (const key in appToolbarMinimizeAttributes) {
            if (appToolbarMinimizeAttributes.hasOwnProperty(key)) {
              toolbarElement.setAttribute(key, appToolbarMinimizeAttributes[key]);
            }
          }
        }
      }
    }, 0);
  }
};

export { ToolbarWrapper };
