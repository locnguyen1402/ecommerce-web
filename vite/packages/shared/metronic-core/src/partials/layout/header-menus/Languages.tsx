import { FC } from 'react';

import clsx from 'clsx';

import { useMasterLayoutData } from '../../../layout';

const Languages: FC = () => {
  const { supportedLanguages, language, onChangeLanguage } = useMasterLayoutData();
  const currentLanguage = supportedLanguages.find((x) => x.code === language);

  return (
    <>
      {!!supportedLanguages.length && currentLanguage && (
        <div
          className="menu-item px-5"
          data-kt-menu-trigger="hover"
          data-kt-menu-placement="left-start"
          data-kt-menu-flip="bottom"
        >
          <a href="#" className="menu-link px-5">
            <span className="menu-title position-relative">
              Language
              <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
                {currentLanguage?.name}{' '}
                <img
                  className="w-15px h-15px rounded-1 ms-2"
                  src={currentLanguage?.flag}
                  alt="metronic"
                />
              </span>
            </span>
          </a>

          <div className="menu-sub menu-sub-dropdown w-175px py-4">
            {supportedLanguages.map((l) => (
              <div
                className="menu-item px-3"
                key={l.code}
                onClick={() => {
                  onChangeLanguage && onChangeLanguage(l.code);
                }}
              >
                <a
                  href="#"
                  className={clsx('menu-link d-flex px-5', {
                    active: l.code === language,
                  })}
                >
                  <span className="symbol symbol-20px me-4">
                    <img className="rounded-1" src={l.flag} alt="metronic" />
                  </span>
                  {l.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export { Languages };
