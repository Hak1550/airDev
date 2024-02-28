import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function apiAddPaymentMethod(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(`/api/v1/payment/customer-payment-method/`, action.data, {
    headers,
  });
}

function apiPatchPaymentMethod(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.patch(
    `/api/v1/payment/customer-payment-method/`,
    action.data,
    {
      headers,
    },
  );
}

function apiGetAllPaymentMethod(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(`/api/v1/payment/customer-payment-method/`, {
    headers,
  });
}

function apiGetAllInvoices(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(`/api/v1/payment/invoice/`, {
    headers,
  });
}

function apiChangeDefaultPaymentMethod(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(
    `/api/v1/payment/change-default-payment-method/`,
    action.data,
    {
      headers,
    },
  );
}

export const paymentServices = {
  apiAddPaymentMethod,
  apiGetAllPaymentMethod,
  apiChangeDefaultPaymentMethod,
  apiPatchPaymentMethod,
  apiGetAllInvoices,
};
