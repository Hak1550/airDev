import * as types from '../constants/signup';

// SIGNUP
export const apiSignupRequest = (data, socialType = null) => ({
  type: types.API_SIGNUP_REQUEST,
  data,
  socialType,
});

export const setSuccess = payload => ({
  type: types.SET_SUCCESS,
  payload,
});

export const apiSignupRequestSuccess = response => ({
  type: types.API_SIGNUP_REQUEST_SUCCESS,
  response,
});

export const apiSignupRequestFailed = response => ({
  type: types.API_SIGNUP_REQUEST_FAILED,
  response,
});

export const apiChangePasswordRequest = (token, data) => ({
  type: types.API_CHANGE_PASSWORD_REQUEST,
  token,
  data,
});
export const apiChangePasswordSuccess = response => ({
  type: types.API_CHANGE_PASSWORD_SUCCESS,
  response,
});
export const apiChangePasswordFailed = response => ({
  type: types.API_CHANGE_PASSWORD_FAILED,
  response,
});

export const apiUserConfirmationRequest = confirmationCode => ({
  type: types.API_USER_CONFIRMATION_REQUEST,
  confirmationCode,
});
export const apiUserConfirmationSuccess = response => ({
  type: types.API_USER_CONFIRMATION_SUCCESS,
  response,
});
export const apiUserConfirmationFailed = response => ({
  type: types.API_USER_CONFIRMATION_FAILED,
  response,
});
