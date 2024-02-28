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

function apiListTeam(action) {
  // const { search, name, role, project, status, page, page_size } = action;
  // return authAPI.get(
  //   `/api/v1/user/team-members?search=${encodeURIComponent(
  //     search,
  //   )}&name=${encodeURIComponent(name)}&role=${encodeURIComponent(
  //     role,
  //   )}&project=${encodeURIComponent(project)}${
  //     status !== null ? '&status=' + status : ''
  //   }${page ? '&page=' + page + '&page_size=' + page_size : ''}`,
  //   { headers },
  // );
  const { search, role, project, page, selectAll } = action;
  // console.log(typeof role, role);
  let intRole = parseInt(role);
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  let url = `/api/v1/user/team-members${`?user=${encodeURIComponent(search)}`}${
    role === null || role === NaN || role === ''
      ? ''
      : `&role=${encodeURIComponent(intRole)}`
  }${`&project=${encodeURIComponent(project)}`}${page ? '&page=' + page : ''}${
    selectAll ? '&all=' + 1 : ''
  }`;
  // console.log(url);
  return authAPI.get(url, { headers });
}

function apiListOtherMembers(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/user-information/`, { headers });
}

function apiListProject(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/user/team-members`, { headers });
}

function apiMemberAssign(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);

  return authAPI.post(`/api/v1/organisation/collaborator/`, formData, {
    headers,
  });
}
function apiPatchMember(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  const formData = dataToFormData(action.data);

  return authAPI.patch(
    `/api/v1/organisation/collaborator/${action.id}/`,
    formData,
    {
      headers,
    },
  );
}

function apiTeamDeleteMember(action) {
  let token = action.token;
  let id = action.id;
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${token}`,
  };

  return authAPI.delete(`/api/v1/organisation/collaborator/${id}/`, {
    headers,
  });
}

// function apiGearAssign(action) {
//     const headers = {
//       Accept: 'application/json',
//       Authorization: `Token ${action.token}`,
//     };

//     const formData = dataToFormData(action.data);

//     return authAPI.post(`/api/v1/gear/${action.project_id}/assigned/`, formData, {
//       headers,
//     });
//   }

export const teamServices = {
  apiListTeam,
  apiListOtherMembers,
  apiMemberAssign,
  apiPatchMember,
  apiTeamDeleteMember,
};
