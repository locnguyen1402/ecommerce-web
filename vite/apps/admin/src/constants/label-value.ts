import { LabelValueListDef } from '@vklink/components';

import { TransLabelValueListDef } from '@/shared/components';
import { AuditableObject } from '@/shared/types/api';

import { formatDateTime } from '@/i18n';

export const AuditableObjectDef: LabelValueListDef<AuditableObject> = [
  {
    label: 'label.createdBy',
    value: {
      valueGetter: (d) => d.creator?.displayName,
    },
  },
  {
    label: 'label.createdAt',
    value: {
      valueGetter: (d) => formatDateTime(d.creator?.timestamp),
    },
  },
  {
    label: 'label.updatedBy',
    value: {
      valueGetter: (d) => d.updater?.displayName,
    },
  },
  {
    label: 'label.updatedAt',
    value: {
      valueGetter: (d) => formatDateTime(d.updater?.timestamp),
    },
  },
];

export const TransAuditableObjectDef =
  AuditableObjectDef as TransLabelValueListDef<AuditableObject>;
