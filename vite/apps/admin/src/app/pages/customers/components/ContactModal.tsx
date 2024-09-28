import { ComponentProps } from 'react';
import { Modal } from 'react-bootstrap';

import { CancelButton, OkButton } from '@/shared/components';
import { CustomerContact } from '@/api/responses';
import { useI18n } from '@/hooks';

import ContactForm from './ContactForm';

type FormValues = ComponentProps<typeof ContactForm>['defaultValues'];

type Props = {
  customerId?: string;
  isOpen: boolean;
  onClose: () => void;
  contact?: CustomerContact | null;
  successCallback?: () => void;
};

const ContactModal = ({ customerId, contact, isOpen, onClose, successCallback }: Props) => {
  const { t } = useI18n();

  const isEditing = !!contact;

  const onSuccessCallback = () => {
    onClose();
    successCallback?.();
  };

  const mapToForm = (contact: CustomerContact): FormValues => {
    return {
      name: contact.name,
      contactName: contact.contactName,
      phoneNumber: contact.phoneNumber,
      type: contact.type,
      isDefault: contact.isDefault,
      notes: contact.note,
      province: {
        id: contact.addressInfo?.provinceId,
        name: contact.addressInfo?.provinceName,
        code: contact.addressInfo?.provinceCode,
      },
      district: {
        id: contact.addressInfo?.districtId,
        name: contact.addressInfo?.districtName,
        code: contact.addressInfo?.districtCode,
      },
      ward: {
        id: contact.addressInfo?.wardId,
        name: contact.addressInfo?.wardName,
        code: contact.addressInfo?.wardCode,
      },
      addressLine1: contact.addressInfo?.addressLine1,
    };
  };

  return (
    <Modal size="lg" centered show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('actions.addContact')}</Modal.Title>
      </Modal.Header>
      <ContactForm
        defaultValues={isEditing ? mapToForm(contact!) : undefined}
        successCallback={onSuccessCallback}
        customerId={customerId}
        contactId={contact?.id}
      >
        {({ isMutating, onSubmit, form }) => {
          return (
            <>
              <Modal.Body>{form}</Modal.Body>
              <Modal.Footer>
                <CancelButton type="button" onClick={onClose}>
                  {t('actions.cancel')}
                </CancelButton>
                <OkButton isLoading={isMutating} onClick={onSubmit}>
                  {t(isEditing ? 'actions.update' : 'actions.create')}
                </OkButton>
              </Modal.Footer>
            </>
          );
        }}
      </ContactForm>
    </Modal>
  );
};

export default ContactModal;
