import { yup } from '@vklink/components';

export const ValidationPatterns = {
  numberString: /^\d+$/,
  phoneNumber: /^(0)+(\d{9})$/,
  email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  // userName: /^[a-zA-Z0-9]{1,50}$/,
  password: /^(?=.*[\W])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([\w\d\W]){8,20}$/,
};

export const idNameSchema: yup.ObjectSchema<IdName> = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
});

export const getPhoneNumberSchema = (t: (key: any) => string) => {
  return yup
    .string()
    .transform((value) => (value ? value : undefined))
    .matches(ValidationPatterns.phoneNumber, t('errorMessages.invalidPhoneNumber'))
    .max(10);
};

export const getEmailSchema = (t: (key: any) => string) => {
  return yup
    .string()
    .transform((value) => (value ? value : undefined))
    .matches(ValidationPatterns.email, t('errorMessages.invalidEmail'));
};

export const getPasswordSchema = (t: (key: any) => string) => {
  return yup.string().matches(ValidationPatterns.password, t('errorMessages.invalidPassword'));
};
