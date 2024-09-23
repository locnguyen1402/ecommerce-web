import { useNavigate } from 'react-router-dom';

import { TableActions } from '@/shared/components';
import { useI18n } from '@/hooks';

type Props = {
  id: string;
};

const MerchantListActions = ({ id }: Props) => {
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

export default MerchantListActions;
