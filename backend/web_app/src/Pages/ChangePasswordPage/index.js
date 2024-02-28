import { FormErrorText } from 'Components/CommonStyles';
import { OutlinedButton } from 'Components/IconButton/styles';
import Loader from 'Components/Loader';
import {
  FormContent,
  FormDescription,
  FormFooter,
  FormHeader,
  FormHeaderButtons,
  FormHeaderTitleColumn,
  FormLabel,
  FormRow,
  FormTitle,
  SaveButton,
} from 'Pages/AccountPage/styles';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { apiChangePasswordRequest } from 'Redux/actions/signup';

const ChangePasswordPage = ({ auth }) => {
  const signup = useSelector(state => state.signup);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});
  const newPassword = useRef({});
  newPassword.current = watch('new_password', '');
  const dispatch = useDispatch();
  const onSave = () => {
    handleSubmit(data => {
      dispatch(apiChangePasswordRequest(auth.token, data));
      reset();
    })();
  };
  return (
    <>
      <FormHeader>
        <FormHeaderTitleColumn>
          <FormTitle>Password</FormTitle>
          <FormDescription>
            Please enter your current password to change your password.
          </FormDescription>
        </FormHeaderTitleColumn>
      </FormHeader>
      {signup.isLoading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <FormContent>
            <form>
              <FormRow className="row">
                <FormLabel className="col-sm-3">Current password</FormLabel>
                <div className="col-sm-9">
                  <div className="row" style={{ maxWidth: '512px' }}>
                    <div className="col-sm-12">
                      <Controller
                        name="old_password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: 'This field is required',
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="password"
                            className="form-control"
                            placeholder="Current password"
                          />
                        )}
                      />

                      {errors.old_password && (
                        <FormErrorText className="form-text">
                          {errors.old_password.message}
                        </FormErrorText>
                      )}
                    </div>
                  </div>
                </div>
              </FormRow>
              <FormRow className="row">
                <FormLabel className="col-sm-3">New password</FormLabel>
                <div className="col-sm-9">
                  <div className="row" style={{ maxWidth: '512px' }}>
                    <div className="col-sm-12">
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
                              ) ||
                              'Must be at least include 1 special character.'
                            );
                          },
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="password"
                            className="form-control"
                            placeholder="New password"
                          />
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
                          Your new password must be at least 8 characters long
                          and include 1 special character.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FormRow>
              <FormRow className="row">
                <FormLabel className="col-sm-3">Confirm new password</FormLabel>
                <div className="col-sm-9">
                  <div className="row" style={{ maxWidth: '512px' }}>
                    <div className="col-sm-12">
                      <Controller
                        name="confirm_password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: 'This field is required',
                          validate: value =>
                            value === newPassword.current ||
                            'The passwords do not match',
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                          />
                        )}
                      />

                      {errors.confirm_password && (
                        <FormErrorText className="form-text">
                          {errors.confirm_password.message}
                        </FormErrorText>
                      )}
                    </div>
                  </div>
                </div>
              </FormRow>
            </form>
          </FormContent>
          <FormFooter>
            <span></span>
            <FormHeaderButtons>
              <OutlinedButton
                className="btn"
                onClick={() => {
                  reset();
                }}
              >
                Cancel
              </OutlinedButton>
              <SaveButton className="btn btn-primary" onClick={onSave}>
                Update password
              </SaveButton>
            </FormHeaderButtons>
          </FormFooter>
        </>
      )}
    </>
  );
};

export default ChangePasswordPage;
