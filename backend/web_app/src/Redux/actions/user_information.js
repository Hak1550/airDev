import * as types from '../constants/user_information';

// get user information
export const apiGetUserInformation = (user_id, token) => ({
  type: types.API_GET_USER_INFORMATION,
  user_id,
  token,
});

export const apiGetUserInformationSuccess = response => ({
  type: types.API_GET_USER_INFORMATION_SUCCESS,
  response,
});

export const apiGetUserInformationFailed = response => ({
  type: types.API_GET_USER_INFORMATION_FAILED,
  response,
});

// get MyStoragePlan
export const apiGetMyStoragePlan = token => ({
  type: types.API_GET_MY_STORAGE_PLAN,
  token,
});

export const apiGetMyStoragePlanSuccess = response => ({
  type: types.API_GET_MY_STORAGE_PLAN_SUCCESS,
  response,
});

export const apiGetMyStoragePlanFailed = response => ({
  type: types.API_GET_MY_STORAGE_PLAN_FAILED,
  response,
});

// get online meber
export const apiGetOnlineMembers = (project_id, token) => ({
  type: types.API_GET_ONLINE_MEMBERS,
  project_id,
  token,
});

export const apiGetOnlineMembersSuccess = response => ({
  type: types.API_GET_ONLINE_MEMBERS_SUCCESS,
  response,
});

export const apiGetOnlineMembersFailed = response => ({
  type: types.API_GET_ONLINE_MEMBERS_FAILED,
  response,
});

// get MyAssets
export const apiGetMyAssets = token => ({
  type: types.API_GET_MY_ASSETS,
  token,
});

export const apiGetMyAssetsSuccess = response => ({
  type: types.API_GET_MY_ASSETS_SUCCESS,
  response,
});

export const apiGetMyAssetsFailed = response => ({
  type: types.API_GET_MY_ASSETS_FAILED,
  response,
});

// list user information
export const apiListUserInformation = (search, token) => ({
  type: types.API_LIST_USER_INFORMATION,
  search,
  token,
});

export const apiListUserInformationSuccess = response => ({
  type: types.API_LIST_USER_INFORMATION_SUCCESS,
  response,
});

export const apiListUserInformationFailed = response => ({
  type: types.API_LIST_USER_INFORMATION_FAILED,
  response,
});

// post user information
export const apiPostUserInformation = (data, token) => ({
  type: types.API_POST_USER_INFORMATION,
  data,
  token,
});

export const apiPostUserInformationSuccess = response => ({
  type: types.API_POST_USER_INFORMATION_SUCCESS,
  response,
});

export const apiPostUserInformationFailed = response => ({
  type: types.API_POST_USER_INFORMATION_FAILED,
  response,
});

// update user information
export const apiPutUserInformation = (data, user_id, token) => ({
  type: types.API_PUT_USER_INFORMATION,
  data,
  user_id,
  token,
});

export const apiPutUserInformationSuccess = response => ({
  type: types.API_PUT_USER_INFORMATION_SUCCESS,
  response,
});

export const apiPutUserInformationFailed = response => ({
  type: types.API_PUT_USER_INFORMATION_FAILED,
  response,
});

// patch user information
export const apiPatchUserInformation = (
  data,
  user_id,
  token,
  successMsg = null,
  showMsg = true,
) => ({
  type: types.API_PATCH_USER_INFORMATION,
  data,
  user_id,
  token,
  successMsg,
  showMsg,
});

export const apiPatchUserInformationSuccess = (response, action) => ({
  type: types.API_PATCH_USER_INFORMATION_SUCCESS,
  response,
  action,
});

export const apiPatchUserInformationFailed = response => ({
  type: types.API_PATCH_USER_INFORMATION_FAILED,
  response,
});

//
export const resetUserInformationState = () => ({
  type: types.RESET_USER_INFORMATION_STATE,
});
