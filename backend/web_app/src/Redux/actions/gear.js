import * as types from '../constants/gear';

// List Gear
export const apiGearListRequest = token => ({
  type: types.API_GEAR_LIST_REQUEST,
  token,
});

export const apiGearListSuccess = response => ({
  type: types.API_GEAR_LIST_SUCCESS,
  response,
});

export const apiGearListFailed = response => ({
  type: types.API_GEAR_LIST_FAILED,
  response,
});

// Post Gear
export const apiGearPostRequest = (data, token, formType) => ({
  type: types.API_GEAR_POST_REQUEST,
  data,
  token,
  formType,
});

export const apiGearPostSuccess = response => ({
  type: types.API_GEAR_POST_SUCCESS,
  response,
});

export const apiGearPostFailed = response => ({
  type: types.API_GEAR_POST_FAILED,
  response,
});

export const resetGear = () => ({
  type: types.RESET_GEAR,
});

export const apiGearGlobalListRequest = token => ({
  type: types.API_GEAR_GLOBAL_LIST_REQUEST,
  token,
});

export const apiGearGlobalListSuccess = response => ({
  type: types.API_GEAR_GLOBAL_LIST_SUCCESS,
  response,
});

export const apiGearGlobalListFailed = response => ({
  type: types.API_GEAR_GLOBAL_LIST_FAILED,
  response,
});

export const apiGearAssignedListRequest = (token, project_id) => ({
  type: types.API_GEAR_ASSIGN_LIST_REQUEST,
  token,
  project_id,
});

export const apiGearAssignedListSuccess = response => ({
  type: types.API_GEAR_ASSIGN_LIST_SUCCESS,
  response,
});

export const apiGearAssignedListFailed = response => ({
  type: types.API_GEAR_ASSIGN_LIST_FAILED,
  response,
});

export const apiGearAssignedRequest = (token, project_id, data) => ({
  type: types.API_GEAR_ASSIGN_REQUEST,
  token,
  project_id,
  data,
});

export const apiGearAssignedSuccess = response => ({
  type: types.API_GEAR_ASSIGN_SUCCESS,
  response,
});

export const apiGearAssignedFailed = response => ({
  type: types.API_GEAR_ASSIGN_FAILED,
  response,
});

// set Members Data
export const setMembersData = data => ({
  type: types.SET_MEMBERS_DATA,
  data,
});

// Patch Camera
export const apiCameraPatchRequest = (token, gear_id, gear) => ({
  type: types.API_CAMERA_PATCH_REQUEST,
  token,
  gear_id,
  gear,
});

export const apiCameraPatchSuccess = response => ({
  type: types.API_CAMERA_PATCH_SUCCESS,
  response,
});

export const apiCameraPatchFailed = response => ({
  type: types.API_CAMERA_PATCH_FAILED,
  response,
});

// Patch Instance
export const apiInstancePatchRequest = (token, gear_id, gear) => ({
  type: types.API_INSTANCE_PATCH_REQUEST,
  token,
  gear_id,
  gear,
});

export const apiInstancePatchSuccess = response => ({
  type: types.API_INSTANCE_PATCH_SUCCESS,
  response,
});

export const apiInstancePatchFailed = response => ({
  type: types.API_INSTANCE_PATCH_FAILED,
  response,
});

// Get Camera Detail
export const apiGetCameraDetailRequest = (air_ids, token) => ({
  type: types.API_GET_CAMERA_DETAILS_REQUEST,
  air_ids,
  token,
});

export const apiGetCameraDetailSuccess = response => ({
  type: types.API_GET_CAMERA_DETAILS_SUCCESS,
  response,
});

export const apiGetCameraDetailFailed = response => ({
  type: types.API_GET_CAMERA_DETAILS_FAILED,
  response,
});

// Get Camera Deactivate
export const apiGetCameraDeactivateRequest = (
  air_ids,
  token,
  project_id = null,
) => ({
  type: types.API_POST_CAMERA_DEACTIVATE_REQUEST,
  air_ids,
  token,
  project_id,
});

export const apiGetCameraDeactivateSuccess = response => ({
  type: types.API_POST_CAMERA_DEACTIVATE_SUCCESS,
  response,
});

export const apiGetCameraDeactivateFailed = response => ({
  type: types.API_POST_CAMERA_DEACTIVATE_FAILED,
  response,
});

export const clearcameraDetails = response => ({
  type: types.CLEAR_CAMERA_DETAILS,
});

export const onboardCameraDetails = data => ({
  type: types.ONBOARD_CAMERA_DETAILS,
  data,
});
