import { TextField, yup, useForm, yupResolver, FormContainer } from '@mila/components';
import { useMutation } from '@mila/api';

import { AuthUtils } from '@/shared/utils';
import { useI18n, useToast } from '@/hooks';

import { useAuth } from './core/Auth';

type FormValues = { username: string; password: string };

export const Login = () => {
  const { t } = useI18n();
  const toast = useToast();
  const { saveAuth, setCurrentUser } = useAuth();

  const {
    mutate,
    isPending: loading,
    reset,
  } = useMutation<any, any, FormValues>({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      const { accessToken, refreshToken, tokenType } = await AuthUtils.signInWithPassword({
        username: data.username,
        password: data.password,
        rememberMe: false,
      });
      const user = await AuthUtils.getIdentityUserInfo(accessToken, tokenType);

      saveAuth({
        accessToken,
        tokenType,
        refreshToken,
      });
      setCurrentUser(user);
    },
    onError: (error) => {
      console.error(error);
      toast.error(t('failNotification.login'));
      formReset({
        username: '',
        password: '',
      });
    },
    onSettled: () => {
      reset();
    },
  });

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    username: yup.string().required().label(t('label.userName')),
    password: yup.string().required().label(t('label.password')),
  });

  const {
    control,
    handleSubmit,
    reset: formReset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <form className="form w-100" onSubmit={onSubmit}>
      {/* begin::Heading */}
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">{t('actions.signIn')}</h1>
        <div className="text-gray-500 fw-semibold fs-6">Your Admin Portal</div>
      </div>
      {/* begin::Heading */}

      <FormContainer orientation="vertical">
        <TextField
          control={control}
          name="username"
          label={t('label.userName')}
          isRequired
          autoComplete="username"
        />
        <TextField
          autoComplete="current-password"
          control={control}
          name="password"
          type="password"
          label={t('label.password')}
          isRequired
        />
      </FormContainer>

      {/* <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />

        <Link to="/auth/forgot-password" className="link-primary">
          Forgot Password ?
        </Link>
      </div> */}

      {/* begin::Action */}
      <div className="d-grid mb-10">
        <button type="submit" id="kt_sign_in_submit" className="btn btn-primary" disabled={loading}>
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: 'block' }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  );
};
