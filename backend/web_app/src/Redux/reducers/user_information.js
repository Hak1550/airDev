import * as types from '../constants/user_information';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  data: null,
  users: [],
  successMsg: null,
  showMsg: true,
  storagePlan: null,
  assetList: null,
  onlineMembers: null,
};

export default function userInformationApiReducer(
  state = INITIAL_STATE,
  action,
) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // get user information
    case types.API_GET_USER_INFORMATION:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_GET_USER_INFORMATION_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        data: action.response.data.data,
      };

    case types.API_GET_USER_INFORMATION_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // get MyStoragePlan
    case types.API_GET_MY_STORAGE_PLAN:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_GET_MY_STORAGE_PLAN_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        storagePlan: action.response.data.result,
      };

    case types.API_GET_MY_STORAGE_PLAN_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // get MyAssets
    case types.API_GET_MY_ASSETS:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_GET_MY_ASSETS_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        assetList: action.response.data.result,
      };

    case types.API_GET_MY_ASSETS_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // get MyAssets
    case types.API_GET_ONLINE_MEMBERS:
      return {
        ...newState,
        success: false,
        error: null,
      };

    case types.API_GET_ONLINE_MEMBERS_SUCCESS:
      return {
        ...newState,
        success: true,
        error: null,
        onlineMembers: action.response.data.result,
      };

    case types.API_GET_ONLINE_MEMBERS_FAILED:
      return {
        ...newState,
        success: false,
        error: mapErrorMessage(action),
      };

    // list user information
    case types.API_LIST_USER_INFORMATION:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_LIST_USER_INFORMATION_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        users: action.response.data,
      };

    case types.API_LIST_USER_INFORMATION_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // add user information
    case types.API_POST_USER_INFORMATION:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_POST_USER_INFORMATION_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        data: action.response.data,
      };

    case types.API_POST_USER_INFORMATION_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // update user information
    case types.API_PUT_USER_INFORMATION:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_PUT_USER_INFORMATION_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        data: action.response.data,
      };

    case types.API_PUT_USER_INFORMATION_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // patch user information
    case types.API_PATCH_USER_INFORMATION:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_PATCH_USER_INFORMATION_SUCCESS:
      if (action?.action?.showMsg === true)
        toast.success(
          action?.action?.successMsg ||
            'User Information Successfully Updated!',
        );
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        successMsg: null,
        data: action.response.data.data,
      };

    case types.API_PATCH_USER_INFORMATION_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.RESET_USER_INFORMATION_STATE:
      return {
        ...newState,
        isLoading: false,
        success: false,
      };
    default:
      return newState;
  }
}
