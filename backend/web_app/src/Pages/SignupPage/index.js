import React from 'react';
import { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useForm, Controller } from 'react-hook-form';

import { FormErrorText } from '../../Components/CommonStyles';
import IconButton from '../../Components/IconButton';
import Google from '../../Components/Icons/Google';
import PasswordField from '../../Components/PasswordField';
import AuthLayout from '../../Layouts/AuthLayout';
import { TextLink } from './styles';
import { useDispatch } from 'react-redux';
import { apiSignupRequest } from 'Redux/actions/signup';
import { FormLabel, FormLableDescription } from 'Pages/AccountPage/styles';
import { MainSelectImg } from 'Pages/TeamPage/styles';
import tick from '../../Assets/images/tick-square.png';
import CheckboxBase from '../../Assets/images/checkboxBase.png';
import useShowMsg from 'hooks/useShowMsg';
import { apiLoginRequest } from 'Redux/actions/login';
import { toast } from 'react-toastify';

const SignupPage = ({ state, onSubmit, email = '' }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  useEffect(() => {
    setValue('email', email);
  }, [email]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email',
        // response_type: 'code',
        access_type: 'offline',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const responseGoogle = response => {
    if (response?.error) toast.error(`${response?.details}`);
    else
      dispatch(
        apiLoginRequest(
          { access_token: response.accessToken, code: response.code },
          'connect',
        ),
      );
  };

  return (
    <AuthLayout title="Sign up" description="Create an account below.">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name*
          </label>
          <Controller
            name="first_name"
            control={control}
            defaultValue=""
            rules={{
              required: 'This field is required.',
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Enter your first name"
              />
            )}
          />
          {errors.first_name && (
            <FormErrorText className="form-text">
              {errors.first_name.message}
            </FormErrorText>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name*
          </label>
          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            rules={{
              required: 'This field is required.',
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Enter your last name"
              />
            )}
          />
          {errors.last_name && (
            <FormErrorText className="form-text">
              {errors.last_name.message}
            </FormErrorText>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email*
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue={email}
            rules={{
              required: 'This field is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid e-mail address',
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                disabled={email}
              />
            )}
          />
          {errors.email && (
            <FormErrorText className="form-text">
              {errors.email.message}
            </FormErrorText>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password*
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'This field is required.',
              minLength: {
                value: 8,
                message: 'Must be at least 8 characters.',
              },
              validate: value => {
                return (
                  [/^((?=.*?[#?!@$%^&*-])).{8,}$/].every(pattern =>
                    pattern.test(value),
                  ) || 'Must be at least include 1 special character.'
                );
              },
            }}
            render={({ field }) => (
              <PasswordField placeholder={'Create a password'} {...field} />
            )}
          />

          {errors.password ? (
            <FormErrorText className="form-text">
              {errors.password.message}
            </FormErrorText>
          ) : (
            <p className="form-text mb-3">
              Must be at least 8 characters long and include 1 special
              character.
            </p>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <div className="form-check d-flex ps-0">
            <Controller
              name="check_visibility"
              control={control}
              defaultValue={false}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <>
                  <MainSelectImg
                    src={watch('check_visibility') ? tick : CheckboxBase}
                    onClick={() =>
                      setValue('check_visibility', !watch('check_visibility'))
                    }
                  />
                </>
              )}
            />
            <FormLabel className="form-label form-check-label pe-0">
              Add me to the AIRCloud Project Database
              <FormLableDescription>
                By checking this box, your account will be visible across
                AIRCloud and you will be availible to join other producer’s
                projects.
              </FormLableDescription>
            </FormLabel>
          </div>
        </div>

        <div className="d-grid gap-2">
          <button
            disabled={state.isLoading || !watch('check_visibility')}
            type="submit"
            className="btn btn-primary"
          >
            Create Account
          </button>
        </div>
      </form>
      <GoogleLogin
        clientId={clientId}
        render={renderProps => (
          <IconButton
            text="Sign up with Google"
            icon={<Google />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled || !watch('check_visibility')}
            style={{ width: '100%', marginTop: '16px' }}
          />
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        // responseType={'code'}
        accessType="offline"
      />
      <p className="form-text text-center mt-4">
        Already have an account? <TextLink to="/login">Login</TextLink>
      </p>
      {state.error ? (
        <div className="mt-3">
          <div className="alert text-center alert-danger" role="alert">
            {state.error.message}
          </div>
        </div>
      ) : (
        <></>
      )}
    </AuthLayout>
  );
};

export default SignupPage;
