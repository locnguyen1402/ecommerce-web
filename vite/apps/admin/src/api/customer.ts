const CUSTOMER_GROUP = '/inventory/admin/customers';

const CUSTOMER_CONTACT_GROUP = '/inventory/admin/customers/:id/contacts';

export const CUSTOMER_API_URLS = {
  CUSTOMERS: `${CUSTOMER_GROUP}`,
  CUSTOMER_DETAIL: `${CUSTOMER_GROUP}/:id`,

  CONTACTS: `${CUSTOMER_CONTACT_GROUP}`,
  CONTACT_DETAIL: `${CUSTOMER_CONTACT_GROUP}/:contactId`,
};
