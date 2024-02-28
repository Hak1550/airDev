import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function apiVerifyAirId(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/gear/${action.air_id}/is_valid/`, {
    headers,
  });
}

function apiCreateOrganization(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.post(`/api/v1/organisation/create/`, action.data, {
    headers,
  });
}

export const onboardingServices = {
  apiVerifyAirId,
  apiCreateOrganization,
};
