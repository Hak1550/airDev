import * as types from '../constants/assets';

// Get Assets
export const apiGetAllAssetsRequest = (token, organisation_id) => ({
  type: types.API_GET_ALL_ASSETS_REQUEST,
  token,
  organisation_id,
});

export const apiGetAllAssetsSuccess = response => ({
  type: types.API_GET_ALL_ASSETS_SUCCESS,
  response,
});

export const apiGetAllAssetsFailed = response => ({
  type: types.API_GET_ALL_ASSETS_FAILED,
  response,
});

// Get Instance Usage
export const apiGetInstanceUsageRequest = token => ({
  type: types.API_GET_INSTANCE_USAGE_REQUEST,
  token,
});

export const apiGetInstanceUsageSuccess = response => ({
  type: types.API_GET_INSTANCE_USAGE_SUCCESS,
  response,
});

export const apiGetInstanceUsageFailed = response => ({
  type: types.API_GET_INSTANCE_USAGE_FAILED,
  response,
});

// Get My Storage Plan
export const apiGetStoragePlanRequest = token => ({
  type: types.API_GET_STORAGE_PLAN_REQUEST,
  token,
});

export const apiGetStoragePlanSuccess = response => ({
  type: types.API_GET_STORAGE_PLAN_SUCCESS,
  response,
});

export const apiGetStoragePlanFailed = response => ({
  type: types.API_GET_STORAGE_PLAN_FAILED,
  response,
});

// Get Used wasabi Storage
export const apiGetWasabiUsedStorageRequest = (token, id) => ({
  type: types.API_GET_WASABI_USED_STORAGE_REQUEST,
  token,
  id,
});

export const apiGetWasabiUsedStorageSuccess = response => ({
  type: types.API_GET_WASABI_USED_STORAGE_SUCCESS,
  response,
});

export const apiGetWasabiUsedStorageFailed = response => ({
  type: types.API_GET_WASABI_USED_STORAGE_FAILED,
  response,
});

// Get Avaialble Packages
export const apiGetAvailablePkgRequest = token => ({
  type: types.API_GET_AVAILABLE_PACKAGES_REQUEST,
  token,
});

export const apiGetAvailablePkgSuccess = response => ({
  type: types.API_GET_AVAILABLE_PACKAGES_SUCCESS,
  response,
});

export const apiGetAvailablePkgFailed = response => ({
  type: types.API_GET_AVAILABLE_PACKAGES_FAILED,
  response,
});

// 1st Time Purchase
export const apiCreatePaymentRequest = (token, data) => ({
  type: types.API_CREATE_PAYMENT_SESSION_REQUEST,
  token,
  data,
});

export const apiCreatePaymentSuccess = response => ({
  type: types.API_CREATE_PAYMENT_SESSION_SUCCESS,
  response,
});

export const apiCreatePaymentFailed = response => ({
  type: types.API_CREATE_PAYMENT_SESSION_FAILED,
  response,
});

// Continue with Same Package
export const apiContinueSamePkgRequest = (token, data) => ({
  type: types.API_PAYMENT_SAME_PACKAGE_SESSION_REQUEST,
  token,
  data,
});

export const apiContinueSamePkgSuccess = response => ({
  type: types.API_PAYMENT_SAME_PACKAGE_SESSION_SUCCESS,
  response,
});

export const apiContinueSamePkgFailed = response => ({
  type: types.API_PAYMENT_SAME_PACKAGE_SESSION_FAILED,
  response,
});

// Continue with NEW Package
export const apiContinueNewPkgRequest = (token, data) => ({
  type: types.API_PAYMENT_NEW_PACKAGE_SESSION_REQUEST,
  token,
  data,
});

export const apiContinueNewPkgSuccess = response => ({
  type: types.API_PAYMENT_NEW_PACKAGE_SESSION_SUCCESS,
  response,
});

export const apiContinueNewPkgFailed = response => ({
  type: types.API_PAYMENT_NEW_PACKAGE_SESSION_FAILED,
  response,
});

export const apiClearUrl = response => ({
  type: types.API_CLEAR_URL,
  response,
});
