import { useEffect, useState } from 'react';

import { TextField, useWatch } from '@mila/components';
import { KTIcon } from '@mila/metronic-core';

import { slugify } from '@/shared/utils';
import { useI18n } from '@/hooks';

type Props = {
  control: any;
  setValue: any;
  name: string;
  isRequired?: boolean;
  isEditing: boolean;
  referenceFieldName?: string;
  label?: string;
};

const SlugField = ({
  name,
  control,
  label,
  isRequired,
  referenceFieldName = 'name',
  isEditing,
  setValue,
}: Props) => {
  const { t } = useI18n();
  const [autoSync, setAutoSync] = useState(!isEditing);
  const [manualEditing, setManualEditing] = useState(false);

  const referenceFieldValue: string = useWatch({
    control,
    name: referenceFieldName,
  });

  const makeSlugAsEditable = () => {
    setManualEditing(true);

    if (!isEditing) setAutoSync(false);
  };

  useEffect(() => {
    if (autoSync) {
      setValue(name, slugify(referenceFieldValue));
    }
  }, [referenceFieldValue, autoSync, setValue]);

  return (
    <TextField
      control={control}
      name={name}
      label={label}
      isRequired={isRequired}
      isDisabled={!manualEditing}
      inputRender={
        !manualEditing
          ? (input) => {
              return (
                <div className="d-flex align-items-center position-relative">
                  <button
                    onClick={makeSlugAsEditable}
                    className="btn btn-icon btn-sm btn-active-color-primary position-absolute end-0 ms-3"
                  >
                    <KTIcon iconName="notepad-edit" className="fs-2" />
                  </button>
                  {input}
                </div>
              );
            }
          : undefined
      }
    />
  );
};

export { SlugField };
