import * as types from '../constants/channel';

// Add Project Comms

export const apiAddCommsRequest = (data, token, isOrg = false) => ({
  type: types.API_ADD_COMMS_REQUEST,
  data,
  token,
  isOrg,
});

export const apiAddCommsSuccess = response => ({
  type: types.API_ADD_COMMS_SUCCESS,
  response,
});

export const apiAddCommsFailed = response => ({
  type: types.API_ADD_COMMS_FAILED,
  response,
});

// Get Project Comms
export const apiGetCommsRequest = (project_id, token, isOrg = false) => ({
  type: types.API_GET_COMMS_REQUEST,
  project_id,
  token,
  isOrg,
});

export const apiGetCommsSuccess = response => ({
  type: types.API_GET_COMMS_SUCCESS,
  response,
});

export const apiGetCommsFailed = response => ({
  type: types.API_GET_COMMS_FAILED,
  response,
});

// Get Project Comms By Id

export const apiGetCommsByIdRequest = (id, token) => ({
  type: types.API_GET_COMMS_BY_ID_REQUEST,
  id,
  token,
});

export const apiGetCommsByIdSuccess = response => ({
  type: types.API_GET_COMMS_BY_ID_SUCCESS,
  response,
});

export const apiGetCommsByIdFailed = response => ({
  type: types.API_GET_COMMS_BY_ID_FAILED,
  response,
});

// Delete Project Comms
export const apiCommsDeleteRequest = (id, token, project_id = null) => ({
  type: types.API_DELETE_COMMS_REQUEST,
  id,
  token,
  project_id,
});

export const apiCommsDeleteSuccess = response => ({
  type: types.API_DELETE_COMMS_SUCCESS,
  response,
});

export const apiCommsDeleteFailed = response => ({
  type: types.API_DELETE_COMMS_FAILED,
  response,
});

// Patch Project Comms
export const apiPatchCommsRequest = (
  commsId,
  project_id,
  data,
  token,
  isOrg = false,
) => ({
  type: types.API_PATCH_COMMS_REQUEST,
  commsId,
  project_id,
  data,
  token,
  isOrg,
});

export const apiPatchCommsSuccess = response => ({
  type: types.API_PATCH_COMMS_SUCCESS,
  response,
});

export const apiPatchCommsFailed = response => ({
  type: types.API_PATCH_COMMS_FAILED,
  response,
});

export const resetChannelInitialState = () => ({
  type: types.RESET_TO_INITIAL_CHANNEL_STATE,
});
