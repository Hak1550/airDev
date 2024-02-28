import * as types from '../constants/login';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { auth } from '../../Utils/auth';
import { toast } from 'react-toastify';
import parseDjangoError from 'Utils/parseDjangoError';
import { getObjectByLowestValue } from 'Utils/permissions';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  token: null,
  user: null,
  user_information: null,
  organisation_data: null,
  loginCallback: null,
  organisation_permission: null,
};

export default function loginApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // LOGIN
    case types.API_LOGIN_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
        token: null,
        user_information: null,
        organisation_data: null,
        organisation_permission: null,
      };

    case types.API_LOGIN_REQUEST_SUCCESS:
      auth.setToken(action.response.data.token);
      // const permission =
      //   action.response.data?.user_information?.organisation_data?.length > 0 &&
      //   action.response.data?.user_information?.organisation_data?.reduce(
      //     (previous, current) => {
      //       return current.role < previous.role ? current : previous;
      //     },
      //   );
      const permission =
        action.response.data?.user_information?.organisation_data?.length &&
        getObjectByLowestValue(
          action.response.data?.user_information?.organisation_data,
          'role',
        );
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        token: action.response.data.token,
        organisation_data: action.response.data?.organisation_data,
        user: action.response.data?.user,
        user_information: action.response.data?.user_information,
        organisation_permission: permission,
      };

    case types.API_LOGIN_REQUEST_FAILED:
      toast.error(parseDjangoError(action?.response.response.data));
      return {
        ...newState,
        isLoading: false,
        success: false,
        // error: mapErrorMessage(action),
      };

    // Request password reset
    case types.API_PASSWORD_RESET_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_PASSWORD_RESET_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };

    case types.API_PASSWORD_RESET_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Request password reset confirm
    case types.API_PASSWORD_RESET_CONFIRM_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_PASSWORD_RESET_CONFIRM_SUCCESS:
      toast.success(action.response?.data?.message);
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };

    case types.API_PASSWORD_RESET_CONFIRM_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.SET_USER_INFORMATION:
      return {
        ...newState,
        user_information: action.data,
      };

    case types.CLEAR_TOKEN:
      auth.logout();
      return {
        isLoading: false,
        success: false,
        error: null,
        token: null,
        user: null,
        user_information: null,
        organisation_data: null,
        organisation_permission: null,
      };

    case types.RESET_MSG:
      return {
        ...newState,
        success: false,
        error: null,
      };

    case types.LOGIN_CALLBACK:
      return {
        ...newState,
        loginCallback: action.payload,
      };

    default:
      return state;
  }
}
