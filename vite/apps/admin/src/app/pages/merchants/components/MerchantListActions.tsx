import { useNavigate } from 'react-router-dom';

import { TableActions } from '@/shared/components';
import { useI18n } from '@/hooks';
import { Merchant } from '@/api/responses';

type Props = Merchant;

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
