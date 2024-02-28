import * as types from '../constants/onlineStatus';

// Get Camera Status
export const apiGetCameraStatusRequest = (air_ids, token) => ({
  type: types.API_GET_CAMERA_STATUS_REQUEST,
  air_ids,
  token,
});

export const apiGetCameraStatusSuccess = response => ({
  type: types.API_GET_CAMERA_STATUS_SUCCESS,
  response,
});

export const apiGetCameraStatusFailed = response => ({
  type: types.API_GET_CAMERA_STATUS_FAILED,
  response,
});
