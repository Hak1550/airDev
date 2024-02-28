import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AuthLayout from '../../Layouts/AuthLayout';
import { FormErrorText } from '../../Components/CommonStyles';
import { TextLink } from './styles';
import { useState } from 'react';
import useShowMsg from 'hooks/useShowMsg';

const ForgetPasswordPage = ({ auth, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { showMsg } = useShowMsg(auth);

  useEffect(() => {
    if (auth.success) {
      reset({
        email: '',
      });
    }
  }, [auth]);

  return (
    <AuthLayout
      title="Forgot Password"
      description="Recover your password below"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email*
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

        <div className="d-grid gap-2">
          <button
            disabled={auth.isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Request Password Reset
          </button>
        </div>

        <p className="form-text text-center mt-4">
          Don't have an account? <TextLink to="/signup">Sign up</TextLink>
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

        {auth.success === true && showMsg ? (
          <div className="mt-3">
            <div className="alert text-center alert-primary" role="alert">
              Password reset e-mail has been sent.
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>
    </AuthLayout>
  );
};

export default ForgetPasswordPage;
