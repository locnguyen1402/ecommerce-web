import { ReactNode } from 'react';

type Props = {
  children: (props: { onSubmit: () => void; isMutating: boolean }) => ReactNode;
};

type FormValues = {};

const ContactForm = ({}: Props) => {
  return <></>;
};

export default ContactForm;
