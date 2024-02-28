import * as types from '../constants/payment';

// Add Payment Method
export const apiAddPaymentMethodRequest = (data, token) => ({
  type: types.API_ADD_PAYMENT_METHOD_REQUEST,
  data,
  token,
});

export const apiAddPaymentMethodSuccess = response => ({
  type: types.API_ADD_PAYMENT_METHOD_SUCCESS,
  response,
});

export const apiAddPaymentMethodFailed = response => ({
  type: types.API_ADD_PAYMENT_METHOD_FAILED,
  response,
});

// Patch Payment Method
export const apiPatchPaymentMethodRequest = (data, token) => ({
  type: types.API_PATCH_PAYMENT_METHOD_REQUEST,
  data,
  token,
});

export const apiPatchPaymentMethodSuccess = response => ({
  type: types.API_PATCH_PAYMENT_METHOD_SUCCESS,
  response,
});

export const apiPatchPaymentMethodFailed = response => ({
  type: types.API_PATCH_PAYMENT_METHOD_FAILED,
  response,
});

export const apiGetAllPaymentMethodRequest = token => ({
  type: types.API_GET_ALL_PAYMENT_METHOD_REQUEST,
  token,
});

export const apiGetAllPaymentMethodSuccess = response => ({
  type: types.API_GET_ALL_PAYMENT_METHOD_SUCCESS,
  response,
});

export const apiGetAllPaymentMethodFailed = response => ({
  type: types.API_GET_ALL_PAYMENT_METHOD_FAILED,
  response,
});

export const apiGetAllInvoices = token => ({
  type: types.API_GET_ALL_INVOICES_REQUEST,
  token,
});

export const apiGetAllInvoicesSuccess = response => ({
  type: types.API_GET_ALL_INVOICES_SUCCESS,
  response,
});

export const apiGetAllInvoicesFailed = response => ({
  type: types.API_GET_ALL_INVOICES_FAILED,
  response,
});

export const apiChangeDefaultPaymentMethodRequest = (token, data) => ({
  type: types.API_CHANGE_DEFAULT_PAYMENT_METHOD_REQUEST,
  token,
  data,
});

export const apiChangeDefaultPaymentMethodSuccess = response => ({
  type: types.API_CHANGE_DEFAULT_PAYMENT_METHOD_SUCCESS,
  response,
});

export const apiChangeDefaultPaymentMethodFailed = response => ({
  type: types.API_CHANGE_DEFAULT_PAYMENT_METHOD_FAILED,
  response,
});

export const resetPayment = () => ({
  type: types.RESET_PAYMENT,
});
