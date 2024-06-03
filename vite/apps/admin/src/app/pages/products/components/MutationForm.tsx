import { useNavigate, useParams } from 'react-router-dom';

import {
  TextField,
  useForm,
  yupResolver,
  yup,
  FormContainer,
  DateTimeField,
  SelectField,
  FileUploadField,
} from '@vklink/components';
import { useMutation } from '@vklink/grpc-api';

import {
  FormFooter,
  OkButton,
  CancelButton,
  FormLayout,
  FormBody,
  FormHeader,
} from '@/shared/components';

import { useI18n, useToast } from '@/hooks';

type CreatingProductVariantAttributeValue = {
  attributeId: string;
  value: string;
};

type CreatingProductVariant = {
  stock: number;
  price: number;
  attributeValues: CreatingProductVariantAttributeValue[];
};

type FormValues = {
  name: string;
  slug: string;
  description: string;
  attributesIds: string[];
  variants: CreatingProductVariant[];
};

type Props = {
  defaultValues?: Partial<FormValues>;
};

const MutationForm = ({ defaultValues }: Props) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const toast = useToast();

  const { id } = useParams();

  const isEditing = !!id;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <FormLayout>
        <FormHeader title={t('label.generalInformation')} />
        <FormBody>
          <FormContainer>
            <TextField control={control} name="name" label={t('label.name')} isRequired />
            <TextField control={control} name="slug" label={t('label.slug')} isRequired />
            <TextField control={control} name="description" label={t('label.description')} />
          </FormContainer>
        </FormBody>
      </FormLayout>

      <FormLayout className="mt-5 mt-lg-10">
        <FormFooter>
          <CancelButton onClick={goBack}>{t('actions.cancel')}</CancelButton>
          <OkButton onClick={onSubmit}>{t('actions.save')}</OkButton>
        </FormFooter>
      </FormLayout>
    </>
  );
};

export default MutationForm;
