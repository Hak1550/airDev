import * as types from '../constants/gear';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  gearList: [],
  airGearGlobalList: [],
  airGearAssignedList: [],
  membersData: [],
  cameraStatusList: [],
  cameraDetails: null,
  cameraDetailsErr: null,
  onboardCameraDetails: null,
  redirect_url: null,
};

let toastId = null;
export default function gearApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    // list gear
    case types.API_GEAR_LIST_REQUEST:
      // log
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GEAR_LIST_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        gearList: action.response.data.results,
      };
    case types.API_GEAR_LIST_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };
    case types.API_GEAR_GLOBAL_LIST_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GEAR_GLOBAL_LIST_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        airGearGlobalList: action.response.data.data,
      };

    case types.API_GEAR_GLOBAL_LIST_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_GEAR_ASSIGN_LIST_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GEAR_ASSIGN_LIST_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        airGearAssignedList: action.response.data.data,
      };

    case types.API_GEAR_ASSIGN_LIST_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // add gear
    case types.API_GEAR_POST_REQUEST:
      console.log('request', action);
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_GEAR_POST_SUCCESS:
      toast.update(toastId, {
        render: 'Gear added successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });

      console.log('success onBoard', action);
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        // gearList: [action.response.data.data, ...newState.gearList],
      };

    case types.API_GEAR_POST_FAILED:
      const clear_url = () => {
        setTimeout(() => {
          newState.redirect_url = null;
        }, 3000);
      };
      clear_url();
      console.log('fail onboard', action?.response);
      if (!action.response.response.data.data.url) {
        toast.update(toastId, {
          render: action.response.response.data?.error?.air_id
            ? parseDjangoError(action.response.response.data.error.air_id[0])
            : action.response.response.data?.error
            ? parseDjangoError(action.response.response.data.error)
            : parseDjangoError(action.response.response.data),
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      }
      return {
        ...newState,
        isLoading: false,
        success: false,
        redirect_url: action.response.response.data.data.url,
        error: mapErrorMessage(action),
      };

    // Edit Camera
    case types.API_CAMERA_PATCH_REQUEST:
      // console.log('patch req', action);
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_CAMERA_PATCH_SUCCESS:
      // console.log('success', action);
      toast.update(toastId, {
        render: 'Camera edit successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        // gearList: [action.response.data.data, ...newState.gearList],
      };

    case types.API_CAMERA_PATCH_FAILED:
      // console.log('fail', action);
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data.error),
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

    // Edit Instance
    case types.API_INSTANCE_PATCH_REQUEST:
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_INSTANCE_PATCH_SUCCESS:
      toast.update(toastId, {
        render: 'Instance edit successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        // gearList: [action.response.data.data, ...newState.gearList],
      };

    case types.API_INSTANCE_PATCH_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data.error),
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
    //  Get Camera Details ==================================
    case types.API_GET_CAMERA_DETAILS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
        cameraDetails: null,
        cameraDetailsErr: null,
      };
    case types.API_GET_CAMERA_DETAILS_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        cameraDetails: action.response.data.result
          ? action.response.data.result
          : null,
        cameraDetailsErr: action.response.data.error
          ? action.response.data.error
          : null,
      };

    case types.API_GET_CAMERA_DETAILS_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    //  Get Camera Deactivate ==================================
    case types.API_POST_CAMERA_DEACTIVATE_REQUEST:
      toastId = toast.loading('Please wait...');
      console.log('camera deactivate req', action);
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_POST_CAMERA_DEACTIVATE_SUCCESS:
      console.log('camera deactivate suc', action);
      toast.update(toastId, {
        render: 'Camera deactivated successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };

    case types.API_POST_CAMERA_DEACTIVATE_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data.error),
        type: 'error',
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
      console.log('camera deactivate fail', action);
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.RESET_GEAR:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: null,
      };
    case types.SET_MEMBERS_DATA:
      return {
        ...newState,
        membersData: action.response.data,
      };

    case types.CLEAR_CAMERA_DETAILS:
      return {
        ...newState,
        cameraDetails: null,
        cameraDetailsErr: null,
        onboardCameraDetails: null,
      };

    case types.ONBOARD_CAMERA_DETAILS:
      return {
        ...newState,
        onboardCameraDetails: action.data,
      };

    default:
      return state;
  }
}
