import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AuthLayout from '../../Layouts/AuthLayout';
import { FormErrorText } from '../../Components/CommonStyles';
import { TextLink } from './styles';
import { useRef } from 'react';
import PasswordField from 'Components/PasswordField';

const ForgetPasswordConfirmPage = ({ auth, onSubmit }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch('new_password', '');

  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your new password below"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="new_password1" className="form-label">
            New Password*
          </label>
          <Controller
            name="new_password"
            control={control}
            defaultValue=""
            rules={{
              required: 'This field is required',
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
              <PasswordField {...field} placeholder="New password" />
            )}
          />

          {errors.new_password ? (
            <FormErrorText className="form-text">
              {errors.new_password.message}
            </FormErrorText>
          ) : (
            <div
              className="form-text"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#667085',
                fontWeight: '400',
              }}
            >
              Your new password must be at least 8 characters long and include 1
              special character.
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="new_password2" className="form-label">
            Confirm New Password*
          </label>
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            rules={{
              required: 'This field is required',
              validate: value =>
                value === newPassword.current || 'The passwords do not match',
            }}
            render={({ field }) => (
              <PasswordField {...field} placeholder="Confirm new password" />
            )}
          />

          {errors.confirm_password && (
            <FormErrorText className="form-text">
              {errors.confirm_password.message}
            </FormErrorText>
          )}
        </div>

        <div className="d-grid gap-2">
          <button
            disabled={auth.isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Reset Password
          </button>
        </div>

        <p className="form-text text-center mt-4">
          Don't have an account? <TextLink to="/signup">Sign up</TextLink>
        </p>

        {auth.error !== null ? (
          <div className="mt-3">
            <div className="alert text-center alert-danger" role="alert">
              {auth.error.message}
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>
    </AuthLayout>
  );
};

export default ForgetPasswordConfirmPage;
