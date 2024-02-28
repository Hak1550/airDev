import * as types from '../constants/signup';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from 'Utils/parseDjangoError';
import { useHistory } from 'react-router-dom';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  data: null,
};

export default function signupApiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // SIGNUP
    case types.API_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_SIGNUP_REQUEST_SUCCESS:
      toast.success('Signed up successfully');
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        data: action.response.data,
      };

    case types.API_SIGNUP_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_CHANGE_PASSWORD_SUCCESS:
      toast.success('Password changes successfully');
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        data: action.response.data,
      };

    case types.API_CHANGE_PASSWORD_FAILED:
      toast.error(parseDjangoError(action.response.response.data.message));
      return {
        ...state,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_USER_CONFIRMATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_USER_CONFIRMATION_SUCCESS:
      toast.success('The user verified successfully.');
      setTimeout(() => {
        window.location.replace('/login');
      }, 3000);
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.response.data,
      };

    case types.API_USER_CONFIRMATION_FAILED:
      toast.error(parseDjangoError(action.response.response.data.message));
      setTimeout(() => {
        window.location.replace('/login');
      }, 3000);
      return {
        ...state,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
        data: null,
      };

    default:
      return state;
  }
}
