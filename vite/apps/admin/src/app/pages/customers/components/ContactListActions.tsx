import { generatePath, useNavigate } from 'react-router-dom';

import { useMutation } from '@mila/api';

import { sendDeleteRequest } from '@/shared/http';
import { TableActions } from '@/shared/components';
import { useConfirmDialog, useI18n, useQueryHelpers, useToast } from '@/hooks';
import { CustomerContact } from '@/api/responses';
import { CUSTOMER_API_URLS } from '@/api';
import { QUERY_KEYS } from '@/constants';

type Props = CustomerContact & {
  customerId: string;
  onEdit: (contact: CustomerContact) => void;
};

const ContactListActions = ({ onEdit, customerId, ...contact }: Props) => {
  const { t } = useI18n();
  const toast = useToast();
  const queryHelpers = useQueryHelpers();
  const [DeleteConfirmDialog, confirm] = useConfirmDialog();

  const {
    mutate: deleteContact,
    isPending,
    reset: deleteReset,
  } = useMutation({
    mutationKey: [customerId, contact.id, 'delete-customer-contact'],
    mutationFn: () => {
      const url = generatePath(CUSTOMER_API_URLS.CONTACT_DETAIL, {
        id: customerId,
        contactId: contact.id,
      });

      return sendDeleteRequest(url);
    },
    onSuccess: () => {
      toast.success(t('successfulNotification.delete'));

      queryHelpers.invalidate([
        QUERY_KEYS.customer.base,
        QUERY_KEYS.customer.detail,
        customerId!,
        QUERY_KEYS.customerContact.base,
        QUERY_KEYS.customerContact.list,
      ]);
    },
    onError: () => {
      toast.error(t('failNotification.delete'));
    },
    onSettled: () => {
      deleteReset();
    },
  });

  const handleEdit = () => {
    onEdit(contact);
  };

  const handleDelete = async () => {
    if (await confirm()) {
      deleteContact();
    }
  };

  return (
    <>
      <TableActions
        actions={[
          {
            isLoading: false,
            icon: <i className="bi bi-pencil"></i>,
            title: t('actions.edit'),
            onClick: handleEdit,
          },
          {
            isLoading: isPending,
            icon: <i className="bi bi-trash"></i>,
            title: t('actions.delete'),
            onClick: handleDelete,
          },
        ]}
      />

      <DeleteConfirmDialog
        title={t('actions.delete')}
        message={t('confirmMessages.deleteCustomerContact')}
      />
    </>
  );
};

export default ContactListActions;
