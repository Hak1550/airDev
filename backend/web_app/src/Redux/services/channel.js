import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const dataToFormData = data => {
  const formData = new FormData();
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      formData.append(key, element);
    }
  }

  return formData;
};

function apiAddComms(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  if (action.isOrg)
    return authAPI.post(
      `/api/v1/organisation/organisation-comms/`,
      action.data,
      {
        headers,
      },
    );
  return authAPI.post(`/api/v1/project/project-comms/`, action.data, {
    headers,
  });
}
function apiPatchComms(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  if (action.isOrg)
    return authAPI.patch(
      `/api/v1/organisation/organisation-comms/${action.commsId}/`,
      action.data,
      {
        headers,
      },
    );
  return authAPI.patch(
    `/api/v1/project/project-comms/${action.commsId}/`,
    action.data,
    {
      headers,
    },
  );
}

function apiGetCommsById(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/project/project-comms/${action.id}/`, {
    headers,
  });
}

function apiGetComms(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  if (action.isOrg)
    return authAPI.get(`/api/v1/organisation/organisation-comms/`, {
      headers,
    });
  return authAPI.get(`/api/v1/project/get-project-comms/${action.project_id}`, {
    headers,
  });
}

function apiDeleteComms(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.delete(`/api/v1/project/project-comms/${action.id}/`, {
    headers,
  });
}

export const channelServices = {
  apiAddComms,
  apiGetComms,
  apiDeleteComms,
  apiGetCommsById,
  apiPatchComms,
};
