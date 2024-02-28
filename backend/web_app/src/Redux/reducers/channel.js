import * as types from '../constants/channel';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  postSuccess: false,
  error: null,
  data: null,
  projectComms: null,
};

export default function channelApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // Add Comms
    case types.API_ADD_COMMS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        postSuccess: false,
        error: null,
      };
    case types.API_ADD_COMMS_SUCCESS:
      console.log('asda : ', action.response.data.result.comms[0].type);
      if (
        action.response.data.result.comms[0].type === 'program_feed' ||
        action.response.data.result.comms[0].type === 'multi_view'
      )
        toast.success('Viewers Added Successfully!');
      else toast.success('Comms Added Successfully!');
      return {
        ...newState,
        isLoading: false,
        postSuccess: true,
        error: null,
      };
    case types.API_ADD_COMMS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Patch Comms
    case types.API_PATCH_COMMS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        postSuccess: false,
        error: null,
      };
    case types.API_PATCH_COMMS_SUCCESS:
      if (action.response.data.type === 'program_feed')
        toast.success('Program Feed Updated Successfully!');
      else if (action.response.data.type === 'multi_view')
        toast.success('Multiview Updated Successfully!');
      else toast.success('Comms Updated Successfully!');
      return {
        ...newState,
        isLoading: false,
        postSuccess: true,
        error: null,
      };
    case types.API_PATCH_COMMS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Comms
    case types.API_GET_COMMS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_COMMS_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        projectComms: action.response.data.result || action.response.data,
      };
    case types.API_GET_COMMS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Comms BY ID
    case types.API_GET_COMMS_BY_ID_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_COMMS_BY_ID_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        data: action.response.data,
      };
    case types.API_GET_COMMS_BY_ID_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Delete Comms
    case types.API_DELETE_COMMS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_DELETE_COMMS_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        error: null,
      };
    case types.API_DELETE_COMMS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.RESET_TO_INITIAL_CHANNEL_STATE:
      return {
        isLoading: false,
        success: false,
        error: null,
      };

    default:
      return state;
  }
}
