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

function apiGetProject(action) {
  const { search, name, client, status, page, page_size } = action;
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  let url = `/api/v1/project/?search=${encodeURIComponent(
    search,
  )}&name=${encodeURIComponent(name)}&client=${encodeURIComponent(
    client,
  )}&page_size=${page_size}${status !== null ? '&status=' + status : ''}${
    page ? '&page=' + page : ''
  }`;
  return authAPI.get(url, { headers });
}

function apiPostProject(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);
  return authAPI.post(`/api/v1/project/`, formData, { headers });
}

function apiPostDuplicateProject(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);
  return authAPI.post(
    `/api/v1/project/${action.project_id}/duplicate-project/`,
    formData,
    {
      headers,
    },
  );
}

function apiPatchProject(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);
  return authAPI.patch(`/api/v1/project/${action.project_id}/`, formData, {
    headers,
  });
}

function apiDeleteProject(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.delete(`/api/v1/project/${action.project_id}/`, { headers });
}

function apiAddMember(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(
    `/api/v1/project/${action.project_id}/${action.user_id}/add_member/`,
    { headers },
  );
}

function apiRemoveMember(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(
    `/api/v1/project/${action.project_id}/${action.user_id}/remove_member/`,
    { headers },
  );
}

function apiAddExternalLinks(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.post(`/api/v1/project/project-links/`, action.data, {
    headers,
  });
}

function apiGetExternalLinks(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/project/get-project-links/${action.project_id}`, {
    headers,
  });
}

function apiDeleteExternalLinks(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.delete(`/api/v1/project/project-links/${action.id}/`, {
    headers,
  });
}

function apiAddProjectFiles(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = new FormData();
  formData.append('project_id', action.data.project_id);
  for (let i = 0; i < action.data.files.length; i++) {
    formData.append('files', action.data.files[i]);
  }
  return authAPI.post(`/api/v1/project/project-file/`, formData, {
    headers,
  });
}

function apiGetProjectFiles(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/project/get-project-files/${action.project_id}`, {
    headers,
  });
}

function apiDeleteProjectFiles(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.delete(`/api/v1/project/project-file/${action.id}/`, {
    headers,
  });
}

export const projectServices = {
  apiGetProject,
  apiPostProject,
  apiPostDuplicateProject,
  apiPatchProject,
  apiDeleteProject,
  apiAddMember,
  apiRemoveMember,
  apiAddExternalLinks,
  apiGetExternalLinks,
  apiAddProjectFiles,
  apiGetProjectFiles,
  apiDeleteProjectFiles,
  apiDeleteExternalLinks,
};
