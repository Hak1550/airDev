import * as types from '../constants/invite';

// invite
export const apiInviteRequest = (
  email,
  user_type = null,
  project_id = null,
  collaborator_id = null,
) => ({
  type: types.API_INVITE_REQUEST,
  email,
  user_type,
  project_id,
  collaborator_id,
});

export const apiInviteRequestSuccess = response => ({
  type: types.API_INVITE_REQUEST_SUCCESS,
  response,
});

export const apiInviteRequestFailed = response => ({
  type: types.API_INVITE_REQUEST_FAILED,
  response,
});

export const apiCheckInvitationRequest = token_id => ({
  type: types.API_CHECK_INVITATION_REQUEST,
  token_id,
});

export const apiCheckInvitationSuccess = response => ({
  type: types.API_CHECK_INVITATION_SUCCESS,
  response,
});

export const apiCheckInvitationFailed = response => ({
  type: types.API_CHECK_INVITATION_FAILED,
  response,
});

export const resetInvite = () => ({
  type: types.RESET_INVITE,
});
