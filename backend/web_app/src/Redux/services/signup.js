import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function apiSignupRequest(action) {
  // if (action?.socialType === 'connect')
  //   return authAPI.post(
  //     `/modules/django-social-auth/google/connect/`,
  //     action.data,
  //     null,
  //   );
  // else
  return authAPI.post(`/api/v1/signup/`, action.data, null);
}

function apiChangePasswordRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(`/api/v1/change-password/`, action.data, {
    headers,
  });
}

function apiUserConfirmationRequest(action) {
  return authAPI.get(`api/v1/user/confirm/${action.confirmationCode}/`);
}

export const signupServices = {
  apiSignupRequest,
  apiChangePasswordRequest,
  apiUserConfirmationRequest,
};
