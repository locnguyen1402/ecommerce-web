import { Fragment, useCallback } from 'react';

import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useMasterLayoutData } from '../../../MasterLayoutData';

const SidebarMenuMain = () => {
  const { sidebarMenuItems, t } = useMasterLayoutData();

  const renderMenuItem = useCallback(
    ({ children, title, to, icon, hasBullet }: Omit<ISidebarMenuItem, 'kind'>) => {
      const hasChildren = !!children && !!children.length;
      return (
        <>
          {!hasChildren ? (
            <SidebarMenuItem
              to={to || '/'}
              icon={icon}
              title={t(title)}
              hasBullet={hasBullet || !icon}
            />
          ) : (
            <SidebarMenuItemWithSub
              to=""
              icon={icon}
              title={`intl.formatMessage({ id: title })`}
              hasBullet={hasBullet || !icon}
            >
              {children.map((child) => (
                <Fragment key={child.title}>{renderMenuItem(child)}</Fragment>
              ))}
            </SidebarMenuItemWithSub>
          )}
        </>
      );
    },
    []
  );

  return (
    <>
      {sidebarMenuItems.map(({ title, to, icon, hasBullet, kind, children }, index) => {
        return (
          <Fragment key={`${title}-${index}`}>
            {!kind || kind === 'item' ? (
              <>
                {renderMenuItem({
                  title,
                  to,
                  icon,
                  hasBullet,
                  children,
                })}
              </>
            ) : (
              <>
                <div className="menu-item">
                  <div className="menu-content pt-8 pb-2">
                    <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                      {t(title)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
export { SidebarMenuMain };
