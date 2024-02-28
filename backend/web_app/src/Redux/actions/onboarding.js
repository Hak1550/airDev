import * as types from '../constants/onboarding';

export const verifyAirId = (air_id, token) => ({
  type: types.API_IS_AIR_VALID,
  air_id,
  token,
});

export const apiVerifyAirIdSuccess = response => ({
  type: types.API_IS_AIR_VALID_SUCCESS,
  response,
});

export const apiVerifyAirIdFailed = response => ({
  type: types.API_IS_AIR_VALID_FAILED,
  response,
});

export const createOrganization = (data, token) => ({
  type: types.API_CREATE_ORG,
  data,
  token,
});

export const createOrganizationSuccess = response => ({
  type: types.API_CREATE_ORG_SUCCESS,
  response,
});

export const createOrganizationFailed = response => ({
  type: types.API_CREATE_ORG_FAILED,
  response,
});

export const resetOnboarding = () => ({
  type: types.RESET_ONBOARDING,
});
