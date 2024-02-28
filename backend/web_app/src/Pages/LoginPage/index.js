import PasswordField from 'Components/PasswordField';
import { gapi } from 'gapi-script';
import useShowMsg from 'hooks/useShowMsg';
import React from 'react';
import { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { apiLoginRequest } from 'Redux/actions/login';
import { apiSignupRequest } from 'Redux/actions/signup';

import { FormErrorText } from '../../Components/CommonStyles';
import IconButton from '../../Components/IconButton';
import Google from '../../Components/Icons/Google';
import AuthLayout from '../../Layouts/AuthLayout';
import { TextLink } from './styles';

const LoginPage = ({ auth, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { showMsg } = useShowMsg(auth);

  const dispatch = useDispatch();

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
    else {
      dispatch(
        apiLoginRequest(
          { access_token: response.accessToken, code: response.code },
          'login',
        ),
      );
    }
  };

  return (
    <AuthLayout
      title="Login"
      description="Welcome back! Please enter your details."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
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
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'This field is required.',
            }}
            render={({ field }) => (
              // <input
              //   {...field}
              //   type="password"
              //   className="form-control"
              //   id="password"
              // />
              <PasswordField {...field} />
            )}
          />

          {errors.password && (
            <FormErrorText className="form-text">
              {errors.password.message}
            </FormErrorText>
          )}
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="form-check">
            <Controller
              name="remember_me"
              control={control}
              defaultValue={false}
              rules={{
                required: false,
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="checkbox"
                  className="form-check-input"
                  id="remember_me"
                />
              )}
            />

            <label
              className="form-label form-check-label"
              htmlFor="remember_me"
            >
              Remember for 30 days
            </label>
          </div>
          <TextLink to="/forget-password">Forgot Password</TextLink>
        </div>
        <div className="d-grid gap-2">
          <button
            disabled={auth.isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>

        {/* <p className="form-text text-center mt-4">
          Don’t have an account? <TextLink to="/signup">Sign up</TextLink>
        </p>

        {auth.error !== null ? (
          <div className="mt-3">
            <div className="alert text-center alert-danger" role="alert">
              {auth.error.message}
            </div>
          </div>
        ) : (
          <></>
        )} */}
      </form>
      <GoogleLogin
        clientId={clientId}
        render={renderProps => (
          <IconButton
            text="Sign in with Google"
            icon={<Google />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
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
        Don’t have an account? <TextLink to="/signup">Sign up</TextLink>
      </p>

      {auth.error !== null && showMsg ? (
        <div className="mt-3">
          <div className="alert text-center alert-danger" role="alert">
            {auth.error.message}
          </div>
        </div>
      ) : (
        <></>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
