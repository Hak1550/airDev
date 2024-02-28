import * as types from '../constants/invite';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  data: null,
  invitedData: null,
  isValidInvitations: null,
};
let toastId = null;
export default function inviteApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // invite
    case types.API_INVITE_REQUEST:
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_INVITE_REQUEST_SUCCESS:
      toast.update(toastId, {
        render: 'Invitation sent!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        data: action.response.data,
      };

    case types.API_INVITE_REQUEST_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data),
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_CHECK_INVITATION_REQUEST:
      return {
        ...newState,
        isLoading: false,
        success: false,
      };

    case types.API_CHECK_INVITATION_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: null,
        isValidInvitations: true,
        invitedData: action.response.data,
      };

    case types.API_CHECK_INVITATION_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        isLoading: false,
        success: false,
        isValidInvitations: false,
        error: mapErrorMessage(action),
      };

    case types.RESET_INVITE:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: null,
        isValidInvitations: null,
        invitedData: null,
      };

    default:
      return newState;
  }
}
