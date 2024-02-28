import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ReactCountrySelect from 'Components/ReactCountrySelect';
import {
  PaymentInputsWrapper,
  usePaymentInputs,
} from 'Components/PaymentFormComponent';
import images from 'Components/PaymentFormComponent/images';
import { OutlinedButton } from 'Components/IconButton/styles';
import {
  AddCrewContentContainer,
  DoneButton,
  NavFooter,
} from 'Components/AddCollaboratorContent/styles';
import { AddGearFormContainer } from 'Components/AddExternalLinks/styles';
import { BorderBottom, FormErrorText } from 'Components/CommonStyles';
import Email from 'Components/Icons/Email';
import { EachCollabolatorsP3P } from 'Pages/ArchiveProjectsPage/styles';
import {
  apiAddPaymentMethodRequest,
  apiGetAllPaymentMethodRequest,
  apiPatchPaymentMethodRequest,
  resetPayment,
} from 'Redux/actions/payment';
import Loader from 'Components/Loader';

const PaymentDetailsForm = ({
  onRightNavClose,
  handleSideNavPage,
  selectedMethod,
  paymentMethods,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const payment = useSelector(state => state.payment);
  const [showMetaError, setShowMetaError] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [cardbrand, setCardbrand] = useState(null);
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    getZIPProps,
  } = usePaymentInputs({ isEdit: selectedMethod ? true : false });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm();
  const onAddPaymentFormSubmit = () => {
    setShowMetaError(true);
    handleSubmit(data => {
      if (!meta?.error) {
        if (!selectedMethod) {
          const submitData = {
            name: data.name,
            number: data.card_number.replace(/\s/g, ''),
            exp_month: data.expiry.split('/')[0].replace(/\s/g, ''),
            exp_year: data.expiry.split('/')[1].replace(/\s/g, ''),
            cvc: data.cvv,
            default: paymentMethods?.length > 0 ? 0 : 1,
            email: data.email,
            address: {
              line1: data?.line1,
              city: data?.city,
              state: data?.state,
              postal_code: data?.postal_code,
              country: data?.country?.value,
            },
          };
          dispatch(apiAddPaymentMethodRequest(submitData, auth.token));
        } else {
          const submitEditData = {
            name: data.name,
            exp_month: data.expiry.split('/')[0].replace(/\s/g, ''),
            exp_year: data.expiry.split('/')[1].replace(/\s/g, ''),
            email: data.email,
            address: {
              line1: data?.line1,
              city: data?.city,
              state: data?.state,
              postal_code: data?.postal_code,
              country: data?.country?.value,
            },
          };
          submitEditData['id'] = cardDetails?.id;
          // if (dirtyFields?.card_number)
          //   submitEditData['number'] = data.card_number.replace(/\s/g, '');
          // if (dirtyFields?.cvv) submitEditData['cvc'] = data.cvv;
          dispatch(apiPatchPaymentMethodRequest(submitEditData, auth.token));
        }
      }
    })();
  };

  useEffect(() => {
    if (payment.postSuccess) {
      onRightNavClose();
      dispatch(resetPayment());
      dispatch(apiGetAllPaymentMethodRequest(auth.token));
      if (!window.location.pathname.includes('/settings/billing'))
        handleSideNavPage('Payment Method');
    }
  }, [payment.postSuccess]);

  useEffect(() => {
    if (selectedMethod) {
      const details = paymentMethods.find(item => item.id === selectedMethod);
      setCardDetails(details);
      setCardbrand({
        displayName: details?.card?.brand,
        type: details?.card?.brand,
      });
      setValue('name', details?.billing_details?.name);
      setValue('card_number', '**** **** **** ' + details?.card?.last4);
      const expiry =
        `0${details?.card?.exp_month}`.slice(-2) +
        ' / ' +
        details?.card?.exp_year.toString().slice(-2);
      setValue('expiry', expiry);
      setValue('email', details?.billing_details?.email);
      setValue('line1', details?.billing_details?.address.line1);
      setValue('city', details?.billing_details?.address.city);
      setValue('state', details?.billing_details?.address.state);
      setValue(
        'postal_code',
        Number(details?.billing_details?.address.postal_code),
      );
      setValue('country', details?.billing_details?.address.country);
    }
  }, []);
  return payment.isLoading ? (
    <Loader />
  ) : (
    <AddCrewContentContainer>
      <AddGearFormContainer>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name on card
            </label>
            <Controller
              name="name"
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
                  placeholder="Name on card"
                />
              )}
            />
            {errors.name && (
              <FormErrorText className="form-text">
                {errors.name.message}
              </FormErrorText>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="card_number" className="form-label">
              Card number
            </label>
            <Controller
              name="card_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="input-group flex-nowrap">
                  <span
                    className="input-group-text"
                    style={selectedMethod ? { background: '#e9ecef' } : null}
                  >
                    {selectedMethod ? (
                      <svg {...getCardImageProps({ images, cardbrand })} />
                    ) : (
                      <svg {...getCardImageProps({ images })} />
                    )}
                  </span>
                  <input
                    {...field}
                    {...getCardNumberProps({
                      onBlur: field.onBlur,
                      onChange: field.onChange,
                    })}
                    disabled={selectedMethod}
                    type="text"
                    className="form-control"
                    placeholder="Card Number"
                  />
                </div>
              )}
            />
            {meta?.erroredInputs?.cardNumber && showMetaError && (
              <FormErrorText className="form-text">
                {meta?.erroredInputs?.cardNumber}
              </FormErrorText>
            )}
          </div>
          {!selectedMethod ? (
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <Controller
                name="cvv"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    {...getCVCProps({
                      onBlur: field.onBlur,
                      onChange: field.onChange,
                    })}
                    type="password"
                    className="form-control"
                    placeholder="CVV"
                  />
                )}
              />
              {meta?.erroredInputs?.cvc && showMetaError && (
                <FormErrorText className="form-text">
                  {meta?.erroredInputs?.cvc}
                </FormErrorText>
              )}
            </div>
          ) : null}

          <div className="mb-3">
            <label htmlFor="expiry" className="form-label">
              Expiry
            </label>
            <Controller
              name="expiry"
              control={control}
              defaultValue=""
              rules={{
                required: 'This field is required.',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  {...getExpiryDateProps({
                    onBlur: field.onBlur,
                    onChange: field.onChange,
                  })}
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                />
              )}
            />
            {meta?.erroredInputs?.expiryDate && showMetaError && (
              <FormErrorText className="form-text">
                {meta?.erroredInputs?.expiryDate}
              </FormErrorText>
            )}
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label d-flex flex-column mb-3"
            >
              Email address
              <EachCollabolatorsP3P>
                Invoices will be sent to this email address.
              </EachCollabolatorsP3P>
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
                <div className="input-group flex-nowrap">
                  <span className="input-group-text">
                    <Email />
                  </span>
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="olivia@example.com"
                  />
                </div>
              )}
            />
            {errors.email && (
              <FormErrorText className="form-text">
                {errors.email.message}
              </FormErrorText>
            )}
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label htmlFor="line1" className="form-label">
              Street address
            </label>
            <Controller
              name="line1"
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
                  placeholder="Street address"
                />
              )}
            />
            {errors?.line1 && (
              <FormErrorText className="form-text">
                {errors?.line1?.message}
              </FormErrorText>
            )}
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <Controller
              name="city"
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
                  placeholder="City"
                />
              )}
            />
            {errors?.city && (
              <FormErrorText className="form-text">
                {errors?.city?.message}
              </FormErrorText>
            )}
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State / Province
            </label>
            <div className="row">
              <div className="col-6">
                <Controller
                  name="state"
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
                      placeholder="State / Province"
                    />
                  )}
                />
                {errors?.state && (
                  <FormErrorText className="form-text">
                    {errors?.state?.message}
                  </FormErrorText>
                )}
              </div>
              <div className="col-6">
                <Controller
                  name="postal_code"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'This field is required.',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      {...getZIPProps({
                        onBlur: field.onBlur,
                        onChange: field.onChange,
                      })}
                      type="text"
                      className="form-control"
                      placeholder="Zip Code"
                    />
                  )}
                />
                {meta?.erroredInputs?.zip && showMetaError && (
                  <FormErrorText className="form-text">
                    {meta?.erroredInputs?.zip}
                  </FormErrorText>
                )}
              </div>
            </div>
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: 'This field is required.',
              }}
              render={({ field }) => (
                <ReactCountrySelect {...field} ref={null} />
              )}
            />
            {errors?.country && (
              <FormErrorText className="form-text">
                {errors?.country?.message}
              </FormErrorText>
            )}
          </div>
        </form>
      </AddGearFormContainer>
      <NavFooter>
        <OutlinedButton
          className="btn btn-sm"
          //   disabled={gear.isLoading}
          // onClick={onRightNavClose}
          onClick={() => handleSideNavPage('Payment Method')}
        >
          Cancel
        </OutlinedButton>
        <DoneButton
          //   disabled={gear.isLoading}
          className="btn btn-primary btn-sm"
          onClick={onAddPaymentFormSubmit}
        >
          Confirm
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default PaymentDetailsForm;
