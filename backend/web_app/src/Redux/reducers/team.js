import * as types from '../constants/team';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: null,
  teamMembers: {},
  otherMemberList: [],
};

let toastId = null;
export default function teamApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.API_TEAM_LIST_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_TEAM_LIST_SUCCESS:
      // console.log('ol', action);
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        teamMembers: action.response.data,
      };

    case types.API_TEAM_LIST_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_MEMBERS_LIST_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_MEMBERS_LIST_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        otherMemberList: action.response.data,
      };

    case types.API_MEMBERS_LIST_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // add Team Member
    case types.API_TEAM_POST_REQUEST:
      console.log('Request', action);

      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_TEAM_POST_SUCCESS:
      console.log('Success', action);

      toast.update(toastId, {
        render: 'Added Collaborator successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        teamMembers: [action.response.data],
      };

    case types.API_TEAM_POST_FAILED:
      console.log('new error', action.response.response.data);
      if (
        !action.response.response.data.error
        //  ===
        // 'The fields organisation, user must make a unique set.'
      ) {
        toast.update(toastId, {
          render: 'Already a collaborator!',
          type: 'error',
          isLoading: false,
          autoClose: 1500,
          closeOnClick: true,
        });
      } else {
        toast.update(toastId, {
          render: parseDjangoError(action.response.response.data.error),
          type: 'error',
          isLoading: false,
          autoClose: 1500,
          closeOnClick: true,
        });
      }
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Delete Team Member
    case types.API_TEAM_DELETE_REQUEST:
      // toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_TEAM_DELETE_SUCCESS:
      toast.update(toastId, {
        render: 'Collaborator delete successfully!',
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

    case types.API_TEAM_DELETE_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data.error),
        type: 'error',
        isLoading: false,
        autoClose: 1500,
        closeOnClick: true,
      });

      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Edit Role Team Member
    case types.API_TEAM_PATCH_REQUEST:
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.API_TEAM_PATCH_SUCCESS:
      toast.update(toastId, {
        render: "Collaborator's role update successfully!",
        type: 'success',
        isLoading: false,
        autoClose: 1500,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };

    case types.API_TEAM_PATCH_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data.error),
        type: 'error',
        isLoading: false,
        autoClose: 1500,
        closeOnClick: true,
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    default:
      return state;
  }
}
