import { generatePath, useNavigate, useParams } from 'react-router-dom';

import {
  TextField,
  useForm,
  yupResolver,
  yup,
  FormContainer,
  TextareaField,
} from '@vklink/components';
import { useMutation } from '@vklink/api';

import {
  FormFooter,
  OkButton,
  CancelButton,
  FormLayout,
  FormBody,
  FormHeader,
  SlugField,
  ApiSearchableSelectField,
} from '@/shared/components';
import { sendPostRequest, sendPutRequest } from '@/shared/http';

import { idNameSchema, QUERY_KEYS } from '@/constants';
import { useI18n, useQueryHelpers, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';

import { CreateShopCollectionPayload, CreateShopCollectionRequest } from '../types';
import { useShopCollectionsControl } from '../utils/use-shop-collections-control';

type FormValues = CreateShopCollectionRequest;

type Props = {
  defaultValues?: FormValues;
};

const MutationForm = ({ defaultValues }: Props) => {
  const { t } = useI18n();
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const queryHelpers = useQueryHelpers();

  const isEditing = !!id;

  const {
    mutate,
    isPending: isMutating,
    reset: actionReset,
  } = useMutation<any, any, FormValues>({
    mutationKey: [isEditing ? 'update-shop-collection' : 'create-shop-collection', id],
    mutationFn: (data) => {
      const payload: CreateShopCollectionPayload = {
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        parentId: data.parent?.id,
        children: data.children.map((item) => item.id),
      };

      if (isEditing) {
        return sendPutRequest(
          generatePath(INVENTORY_API_URLS.SHOP_COLLECTION_DETAIL, {
            id,
          }),
          {
            id,
            ...payload,
          }
        );
      }

      return sendPostRequest(INVENTORY_API_URLS.SHOP_COLLECTIONS, payload);
    },
    onSuccess: () => {
      toast.success(
        t(isEditing ? 'successfulNotification.update' : 'successfulNotification.create')
      );

      queryHelpers.invalidateListAndDetailQueries(QUERY_KEYS.shopCollection.base, id);

      goBack();
    },
    onError: (err) => {
      toast.error(t(isEditing ? 'failNotification.update' : 'failNotification.create'));
    },
    onSettled: () => {
      actionReset();
    },
  });

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    name: yup.string().required().max(200).label(t('label.name')),
    slug: yup.string().max(200).label(t('label.slug')),
    description: yup.string().max(500).label(t('label.description')),
    parent: idNameSchema.nullable().optional().label(t('label.parent')),
    children: yup.array().of(idNameSchema).required().label(t('label.categories')),
  });

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      parent: null,
      children: [],
    },
  });

  const childrenControl = useShopCollectionsControl({
    control,
  });

  const onSubmit = handleSubmit((data) => mutate(data));

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

            {/* <SlugField
              control={control}
              name="slug"
              label={t('label.slug')}
              isRequired
              isEditing={isEditing}
              setValue={setValue}
            /> */}

            <ApiSearchableSelectField
              isClearable
              label={t('label.parent')}
              control={control}
              name="parent"
              apiUrl={INVENTORY_API_URLS.SHOP_COLLECTION_OPTIONS}
              queryKey={['product-shop-collection-parent']}
            />

            <TextareaField
              rows={3}
              control={control}
              name="description"
              label={t('label.description')}
            />

            {childrenControl.field}
          </FormContainer>
        </FormBody>
        <FormFooter>
          <CancelButton onClick={goBack}>{t('actions.cancel')}</CancelButton>
          <OkButton isLoading={isMutating} onClick={onSubmit}>
            {t('actions.save')}
          </OkButton>
        </FormFooter>
      </FormLayout>
    </>
  );
};

export default MutationForm;
