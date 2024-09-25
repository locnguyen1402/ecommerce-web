import { useNavigate } from 'react-router-dom';

import { Customer } from '@/api/responses';
import { TableActions } from '@/shared/components';
import { useI18n } from '@/hooks';

type Props = Customer;

const CustomerListActions = ({ id }: Props) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`${id}/edit`);
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

export default CustomerListActions;
