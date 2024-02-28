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

function apiListGear(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/gear/camera/`, { headers });
}

function apiPostGear(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);

  return authAPI.post(`/api/v1/gear/camera/`, formData, { headers });
}

function apiPatchCamera(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  // console.log('gear_id', data);

  const formData = dataToFormData(action.gear);

  return authAPI.patch(`/api/v1/gear/air-camera/${action.gear_id}/`, formData, {
    headers,
  });
}

function apiPatchInstance(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.gear);
  console.log('formData', formData);
  return authAPI.patch(
    `/api/v1/gear/air-instance/${action.gear_id}/`,
    formData,
    {
      headers,
    },
  );
}

function apiPostCamera(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);
  // console.log('service', formData);
  return authAPI.post(`/api/v1/gear/onboard-camera/`, formData, { headers });
}

function apiPostInstance(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);

  return authAPI.post(`/api/v1/gear/air-instance/`, formData, { headers });
}

function apiGearGlobalList(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/gear/list/`, {
    headers,
  });
}

function apiGearAssignedList(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/gear/${action.project_id}/assigned/`, {
    headers,
  });
}

function apiGearAssign(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);

  return authAPI.post(`/api/v1/gear/${action.project_id}/assigned/`, formData, {
    headers,
  });
}

function apiGetCamDetails(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/gear/get-camera-details/${action.air_ids}/`, {
    headers,
  });
}
function apiGetCamDeactivate(action) {
  const headers = {
    // Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(
    `/api/v1/gear/deactivate-camera/${action.air_ids}/`,
    {},
    {
      headers,
    },
  );
}

export const gearServices = {
  apiListGear,
  apiPostGear,
  apiPostCamera,
  apiPostInstance,
  apiGearAssignedList,
  apiGearGlobalList,
  apiGearAssign,
  apiPatchCamera,
  apiPatchInstance,
  apiGetCamDetails,
  apiGetCamDeactivate,
};
