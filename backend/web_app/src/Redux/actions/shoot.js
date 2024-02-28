import * as types from '../constants/shoot';

// List Shoot
export const apiShootGetRequest = (token, project_id) => ({
  type: types.API_SHOOT_GET_REQUEST,
  token,
  project_id,
});

export const apiShootGetSuccess = response => ({
  type: types.API_SHOOT_GET_SUCCESS,
  response,
});

export const apiShootGetFailed = response => ({
  type: types.API_SHOOT_GET_FAILED,
  response,
});

// Patch Shoot
export const apiShootPatchRequest = (data, shoot_id, token) => ({
  type: types.API_SHOOT_PATCH_REQUEST,
  data,
  shoot_id,
  token,
});

export const apiDeleteBackground = (shoot_image_id, project_id, token) => ({
  type: types.API_BACKGROUND_DELETE_REQUEST,
  shoot_image_id,
  project_id,
  token,
});

export const apiShootPatchSuccess = response => ({
  type: types.API_SHOOT_PATCH_SUCCESS,
  response,
});

export const apiShootPatchFailed = response => ({
  type: types.API_SHOOT_PATCH_FAILED,
  response,
});

export const apiUpdateUserPermission = action => ({
  type: types.API_UPDATE_PERMISSION,
  action,
});
export const apiRemoveUserPermissions = action => ({
  type: types.API_REMOVE_PERMISSION,
  action,
});
export const apiRemoveUserPermissionsSuccess = action => ({
  type: types.API_REMOVE_PERMISSION_SUCCESS,
  action,
});

export const setUpdateUserPermissionSuccess = action => ({
  type: types.SET_UPDATE_PERMISSION_STATUS,
  action,
});

export const apiGetRelatedGear = (air_id, token) => ({
  type: types.API_RELATED_GEAR_REQUEST,
  air_id,
  token,
});
export const apiRelatedGearFailed = response => ({
  type: types.API_RELATED_GEAR_FAILED,
  response,
});

export const setRelatedGearId = response => ({
  type: types.SET_RELATED_GEAR_ID,
  response,
});

// reset
export const resetShoot = () => ({
  type: types.RESET_SHOOT,
});

// reset
export const toggleSidePan = response => ({
  type: types.TOGGLE_SIDEPAN,
  response,
});

// toggle view
export const toggleCrewView = response => ({
  type: types.TOGGLE_CREW_VIEW,
});

// toggle view
export const toggleGearView = response => ({
  type: types.TOGGLE_GEAR_VIEW,
});

// toggle view
export const toggleSiteView = response => ({
  type: types.TOGGLE_SITE_VIEW,
});
// toggle view
export const toggleBGImageSize = response => ({
  type: types.TOGGLE_BACKGROUND_IMAGE_SIZE,
});

// toggle view
export const toggleRightNavOnMobile = response => ({
  type: types.TOGGLE_RIGHT_NAV_ON_MOBILE,
});
