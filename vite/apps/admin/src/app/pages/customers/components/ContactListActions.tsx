import { useNavigate } from 'react-router-dom';

import { CustomerContact } from '@/api/responses';
import { TableActions } from '@/shared/components';
import { useI18n } from '@/hooks';

type Props = CustomerContact & {
  onEdit: (contact: CustomerContact) => void;
};

const ContactListActions = ({ onEdit, ...contact }: Props) => {
  const { t } = useI18n();

  const handleEdit = () => {
    onEdit(contact);
  };

  return (
    <TableActions
      actions={[
        {
          isLoading: false,
          icon: <i className="bi bi-pencil"></i>,
          title: t('actions.edit'),
          onClick: handleEdit,
        },
      ]}
    />
  );
};

export default ContactListActions;
