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

function apiGetShoot(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/shoot/${action.project_id}/project/`, {
    headers,
  });
}

function apiUpdatePermission(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  const data = {
    role_name: action.role_name,
  };
  return authAPI.post(
    `/api/v1/project/${action.project_id}/${action.user_id}/change_role`,
    data,
    {
      headers,
    },
  );
}
function apiRemovePermission(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  const data = {
    role_name: action.role_name,
  };
  return authAPI.post(
    `/api/v1/project/${action.project_id}/${action.user_id}/remove_role/`,
    data,
    {
      headers,
    },
  );
}

function apiDeleteBackground(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.delete(
    `/api/v1/shoot/${action.shoot_image_id}/delete-background/`,
    {
      headers,
    },
  );
}

function apiPatchShoot(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  let formData = null;
  if (action.data?.background_image_base64) {
    // formData = dataToFormData(action.data);
    return authAPI.put(
      `/api/v1/shoot/${action.shoot_id}/update-background/`,
      action.data,
      {
        headers,
      },
    );
  } else {
    formData = action.data;
    return authAPI.patch(`/api/v1/shoot/${action.shoot_id}/`, formData, {
      headers,
    });
  }
}

function apiRelatedProject(action) {
  console.log('action in service', action);
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(`/api/v1/project/related-project/${action.air_id}/`, {
    headers,
  });
}

export const shootServices = {
  apiGetShoot,
  apiPatchShoot,
  apiUpdatePermission,
  apiRelatedProject,
  apiDeleteBackground,
  apiRemovePermission,
};
