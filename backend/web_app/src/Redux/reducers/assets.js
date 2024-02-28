import * as types from '../constants/assets';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  data: null,
  allGears: null,
  storagePlan: null,
  createPayment: false,
  samePkg: false,
  newPkg: false,
  availablePkgs: null,
  currentStoragePlan: null,
  maximumStorage: null,
  url: null,
  wasabiUsedStorage: 0,
  instanceUsageDetails: null,
};
let toastId = null;
export default function assetsApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // Get All Assets
    case types.API_GET_ALL_ASSETS_REQUEST:
      // console.log('all assets req', action);
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_GET_ALL_ASSETS_SUCCESS:
      // console.log('all assets success', action);

      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        allGears: action.response.data.result,
      };

    case types.API_GET_ALL_ASSETS_FAILED:
      // console.log('all assets fail', action);

      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Instance Usage
    case types.API_GET_INSTANCE_USAGE_REQUEST:
      // console.log('all assets req', action);
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_GET_INSTANCE_USAGE_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        instanceUsageDetails: action.response?.data,
      };

    case types.API_GET_INSTANCE_USAGE_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Storage Plan
    case types.API_GET_STORAGE_PLAN_REQUEST:
      // console.log('Storage req', action);
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_GET_STORAGE_PLAN_SUCCESS:
      // console.log('Storage success', action);

      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        storagePlan: action.response.data.result,
        currentStoragePlan:
          action.response.data.result.length > 1
            ? action.response.data.result[
                action.response.data.result.length - 1
              ].package.id
            : action.response.data.result.length === 1
            ? action.response.data.result[0].package.id
            : 3,
        maximumStorage:
          action.response.data.result.length > 1
            ? action.response.data.result[
                action.response.data.result.length - 1
              ].package.id === 1
              ? '1 TB'
              : action.response.data.result[
                  action.response.data.result.length - 1
                ].package.id === 2
              ? '1 TB'
              : '500 GB'
            : '500 GB',
      };

    case types.API_GET_STORAGE_PLAN_FAILED:
      // console.log('Storage fail', action);

      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Wasabi Used storage
    case types.API_GET_WASABI_USED_STORAGE_REQUEST:
      // console.log('Storage req', action);
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_GET_WASABI_USED_STORAGE_SUCCESS:
      // console.log('Storage success', action);

      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        wasabiUsedStorage: action.response.data?.size || 0,
      };

    case types.API_GET_WASABI_USED_STORAGE_FAILED:
      // console.log('Storage fail', action);

      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get AVAILABLE PACKAGES

    case types.API_GET_AVAILABLE_PACKAGES_REQUEST:
      // console.log('Available Pkg req', action);
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_GET_AVAILABLE_PACKAGES_SUCCESS:
      // console.log('Available Pkg success', action);

      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        availablePkgs: action.response.data,
      };

    case types.API_GET_AVAILABLE_PACKAGES_FAILED:
      // console.log('Available Pkg fail', action);

      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // 1st Time Purchase
    case types.API_CREATE_PAYMENT_SESSION_REQUEST:
      // console.log('all assets req', action);
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_CREATE_PAYMENT_SESSION_SUCCESS:
      // console.log('all assets req', action.response.data.url);
      // toast.update(toastId, {
      //   render: 'Payment has been made successfully!',
      //   type: 'success',
      //   isLoading: false,
      //   autoClose: 3000,
      //   closeOnClick: true,
      // });

      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        createPayment: true,
        url: action.response.data.url,
        // storagePlan: action.response.data,
      };

    case types.API_CREATE_PAYMENT_SESSION_FAILED:
      // console.log('all assets fail', action);
      toast.update(toastId, {
        render: 'Something went wrong!',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Continue with Same Package
    case types.API_PAYMENT_SAME_PACKAGE_SESSION_REQUEST:
      // console.log('all assets req', action);
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_PAYMENT_SAME_PACKAGE_SESSION_SUCCESS:
      // console.log('with same success', action);
      toast.update(toastId, {
        render: 'Subscription has been renewed successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        samePkg: true,
      };

    case types.API_PAYMENT_SAME_PACKAGE_SESSION_FAILED:
      // console.log('all assets fail', action);
      toast.update(toastId, {
        render: 'Something went wrong!',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Continue with New Package
    case types.API_PAYMENT_NEW_PACKAGE_SESSION_REQUEST:
      // console.log('all assets req', action);
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_PAYMENT_NEW_PACKAGE_SESSION_SUCCESS:
      // console.log('all assets success', action);
      toast.update(toastId, {
        render: 'New Package has been subscribed successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        newPkg: true,
      };

    case types.API_PAYMENT_NEW_PACKAGE_SESSION_FAILED:
      // console.log('all assets fail', action);
      toast.update(toastId, {
        render: 'Something went wrong!',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Clear Url
    case types.API_CLEAR_URL:
      // console.log('Storage req', action);
      return {
        ...newState,
        url: null,
      };

    default:
      return newState;
  }
}
