import { useNavigate } from 'react-router-dom';

import { TableActions } from '@/shared/components';
import { useI18n } from '@/hooks';
import { ShopCollection } from '@/api/responses';

type Props = ShopCollection & {
  onAddProducts: (item: ShopCollection) => void;
  onRemoveProducts: (item: ShopCollection) => void;
};

const ListActions = ({ onAddProducts, onRemoveProducts, ...shopCollection }: Props) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`${shopCollection.id}/edit`);
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
        {
          isLoading: false,
          icon: <i className="bi bi-plus"></i>,
          title: t('actions.addProducts'),
          onClick: () => onAddProducts(shopCollection),
        },
        {
          isLoading: false,
          icon: <i className="bi bi-minus"></i>,
          title: t('actions.removeProducts'),
          onClick: () => onRemoveProducts(shopCollection),
        },
      ]}
    />
  );
};

export default ListActions;
