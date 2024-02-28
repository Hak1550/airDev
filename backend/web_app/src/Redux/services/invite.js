import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function apiInviteRequest(action) {
  const { email, user_type, project_id, collaborator_id } = action;
  console.log(email, user_type, project_id, collaborator_id);
  return authAPI.get(
    `/api/v1/user/invite/${email}${
      user_type !== null ? '?type=' + user_type : ''
    }${project_id !== null ? '&project=' + project_id : ''}${
      collaborator_id !== null ? '&organisation=' + collaborator_id : ''
    }`,
    null,
  );
}

function apiCheckInvitation(action) {
  return authAPI.get(
    `/api/v1/user/member-invitations/${action.token_id}/`,
    null,
  );
}

export const inviteServices = {
  apiInviteRequest,
  apiCheckInvitation,
};
