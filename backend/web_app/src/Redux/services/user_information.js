import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function apiGetUserInformation(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/user-information/${action.user_id}/`, {
    headers,
  });
}

function apiGetMyStoragePlan(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/user/my-storage-plan/`, {
    headers,
  });
}

function apiGetOnlineMembers(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/user/online-members/${action.project_id}/`, {
    headers,
  });
}

function apiGetMyAssets(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/user/my-assets/`, {
    headers,
  });
}

function apiListUserInformation(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(
    `/api/v1/user-information/?search=${action.search}&ordering=first_name`,
    {
      headers,
    },
  );
}

function apiPostUserInformation(action) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.post(`/api/v1/user-information/`, action.data, { headers });
}

function apiPutUserInformation(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.put(
    `/api/v1/user-information/${action.user_id}/`,
    action.data,
    { headers },
  );
}

function apiPatchUserInformation(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.patch(
    `/api/v1/user-information/${action.user_id}/`,
    action.data,
    { headers },
  );
}

export const userInformationServices = {
  apiListUserInformation,
  apiGetUserInformation,
  apiPostUserInformation,
  apiPatchUserInformation,
  apiPutUserInformation,
  apiGetMyStoragePlan,
  apiGetMyAssets,
  apiGetOnlineMembers,
};
