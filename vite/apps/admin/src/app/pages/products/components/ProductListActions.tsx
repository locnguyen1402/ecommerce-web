import { useNavigate } from 'react-router-dom';

import { TableActions } from '@/shared/components';
import { useI18n } from '@/hooks';
import { Product } from '@/api/responses';

type Props = Product;

const ListActions = ({ ...product }: Props) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`${product.id}/edit`);
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

export default ListActions;
