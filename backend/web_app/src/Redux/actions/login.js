import * as types from '../constants/login';

// CONTACT US
export const apiLoginRequest = (data, socialType) => ({
  type: types.API_LOGIN_REQUEST,
  data,
  socialType,
});

export const apiLoginRequestSuccess = response => ({
  type: types.API_LOGIN_REQUEST_SUCCESS,
  response,
});

export const apiLoginRequestFailed = response => ({
  type: types.API_LOGIN_REQUEST_FAILED,
  response,
});

export const setUserInformation = data => ({
  type: types.SET_USER_INFORMATION,
  data,
});

export const clearToken = token => ({
  type: types.CLEAR_TOKEN,
  token,
});

export const resetMsg = () => ({
  type: types.RESET_MSG,
});

// Request password reset
export const apiPasswordResetRequest = email => ({
  type: types.API_PASSWORD_RESET_REQUEST,
  email,
});

export const apiPasswordResetSuccess = response => ({
  type: types.API_PASSWORD_RESET_SUCCESS,
  response,
});

export const apiPasswordResetFailed = response => ({
  type: types.API_PASSWORD_RESET_FAILED,
  response,
});

// Password reset confirm
export const apiPasswordResetConfirmRequest = data => ({
  type: types.API_PASSWORD_RESET_CONFIRM_REQUEST,
  data,
});

export const apiPasswordResetConfirmSuccess = response => ({
  type: types.API_PASSWORD_RESET_CONFIRM_SUCCESS,
  response,
});

export const apiPasswordResetConfirmFailed = response => ({
  type: types.API_PASSWORD_RESET_CONFIRM_FAILED,
  response,
});

export const setLoginCallBack = payload => ({
  type: types.LOGIN_CALLBACK,
  payload,
});
