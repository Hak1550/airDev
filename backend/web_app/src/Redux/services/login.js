import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function apiLoginRequest(action) {
  if (action?.socialType === 'login')
    return authAPI.post(
      `/modules/django-social-auth/google/login/`,
      action.data,
      null,
    );
  else if (action?.socialType === 'connect')
    return authAPI.post(
      `/modules/django-social-auth/google/connect/`,
      action.data,
      null,
    );
  else return authAPI.post(`/api/v1/login/`, action.data, null);
}

function apiPasswordResetRequest(action) {
  return authAPI.get(`/api/v1/user/reset-password/${action.email}/`);
}

function apiLogOutRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(`/api/v1/user/logout/`, { headers });
}

function apiPasswordResetConfirmRequest(action) {
  return authAPI.post(
    `/api/v1/user/confirm-reset-password/`,
    action.data,
    null,
  );
}

export const loginServices = {
  apiLoginRequest,
  apiPasswordResetRequest,
  apiPasswordResetConfirmRequest,
  apiLogOutRequest,
};
