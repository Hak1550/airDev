import { toast } from 'react-toastify';
import { mapErrorMessage } from 'Utils/mapErrorMessage';
import parseDjangoError from 'Utils/parseDjangoError';
import * as types from '../constants/onboarding';

const INITIAL_STATE = {
  success: false,
  error: null,
  data: null,
  orgSuccess: false,
  orgData: null,
  loading: false,
};

export default function onboardingReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.API_IS_AIR_VALID:
      return {
        ...newState,
        success: false,
        error: null,
      };
    case types.API_IS_AIR_VALID_SUCCESS:
      return {
        ...newState,
        success: true,
        error: null,
        data: action.response.data,
      };
    case types.API_IS_AIR_VALID_FAILED:
      return {
        ...newState,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_CREATE_ORG:
      return {
        ...newState,
        success: false,
        error: null,
        loading: true,
      };
    case types.API_CREATE_ORG_SUCCESS:
      toast.success('Organization Created Successfully!');
      return {
        ...newState,
        orgSuccess: true,
        error: null,
        loading: false,
        orgData: action.response.data,
      };

    case types.API_CREATE_ORG_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        success: false,
        orgSuccess: false,
        loading: false,
        error: mapErrorMessage(action),
      };

    case types.RESET_ONBOARDING:
      return {
        success: false,
        error: null,
        data: null,
        orgSuccess: false,
        orgData: null,
        loading: false,
      };

    default:
      return newState;
  }
}
