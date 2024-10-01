import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import {
  LayoutProvider,
  LayoutSplashScreen,
  MasterInit,
  MasterLayoutDataProvider,
  ThemeModeProvider,
} from '@mila/metronic-core';

import { ToastContainer } from '@/shared/components';
import { MENU_ITEMS, SUPPORTED_LANGUAGES } from '@/constants';
import { useI18n } from '@/hooks';

import { AuthInit, useAuth } from './modules/auth';

const App = () => {
  const auth = useAuth();
  const { t, locale, changeLocale } = useI18n();

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <MasterLayoutDataProvider
        data={{
          sidebarMenuItems: MENU_ITEMS,
          t: t as any,
          supportedLanguages: SUPPORTED_LANGUAGES,
          language: locale,
          onChangeLanguage: changeLocale,
          logoutText: t('actions.signOut'),
          onLogout: () => {
            auth.logout();
          },
        }}
      >
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
              <ToastContainer />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </MasterLayoutDataProvider>
    </Suspense>
  );
};

export { App };
