import * as types from '../constants/project';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  deleteSuccess: false,
  postSuccess: false,
  deleteItemSuccess: false,
  error: null,
  projectList: null,
  archiveProjectList: null,
  membersData: [],
  projectFiles: null,
  projectLinks: null,
};

export default function projectApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // list projects
    case types.API_PROJECT_GET_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_PROJECT_GET_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        projectList: action.response.data.results,
      };
    case types.API_PROJECT_GET_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // list archive projects
    case types.API_ARCHIVE_PROJECT_GET_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_ARCHIVE_PROJECT_GET_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        archiveProjectList: action.response.data,
      };
    case types.API_ARCHIVE_PROJECT_GET_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // add project
    case types.API_PROJECT_POST_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_DUPLICATE_PROJECT_POST_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_PROJECT_POST_SUCCESS:
      toast.success('Project Created Successfully!');
      return {
        ...newState,
        isLoading: false,
        success: true,
        postSuccess: true,
        error: null,
        projectList: [action.response.data.data, ...newState.projectList],
      };
    case types.API_PROJECT_POST_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // edit project
    case types.API_PROJECT_PATCH_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_PROJECT_PATCH_SUCCESS:
      toast.success('Project Updated Successfully!');
      return {
        ...newState,
        isLoading: false,
        success: true,
        postSuccess: true,
        error: null,
        projectList: [
          ...newState.projectList?.map(project =>
            project.id === action.response.data.data?.id
              ? action.response.data.data
              : project,
          ),
        ],
      };

    case types.API_PROJECT_PATCH_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // DELETE project
    case types.API_PROJECT_DELETE_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_PROJECT_DELETE_SUCCESS:
      toast.success('Project Deleted Successfully!');
      return {
        ...newState,
        isLoading: false,
        deleteSuccess: true,
        error: null,
        projectList: [
          ...newState.projectList?.filter(p => p.id !== action.response),
        ],
      };

    case types.API_PROJECT_DELETE_FAILED:
      toast.error(
        parseDjangoError(
          action.response.response.data.error || action.response.response.data,
        ),
      );
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // add memeber
    case types.API_ADD_MEMBER_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_ADD_MEMBER_SUCCESS:
      // toast.success('Member Added Successfully!', { autoClose: 500 });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };

    case types.API_ADD_MEMBER_FAILED:
      toast.error(action.response.response.data.error);
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // remove member
    case types.API_REMOVE_MEMBER_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_REMOVE_MEMBER_SUCCESS:
      // toast.success('Member Removed Successfully!', { autoClose: 500 });
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };

    case types.API_REMOVE_MEMBER_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_ADD_PROJECT_LINKS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_ADD_PROJECT_LINKS_SUCCESS:
      toast.success('External Links Created Successfully!');
      return {
        ...newState,
        isLoading: false,
        success: true,
        postSuccess: true,
        error: null,
      };
    case types.API_ADD_PROJECT_LINKS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_ADD_PROJECT_FILES_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_ADD_PROJECT_FILES_SUCCESS:
      toast.success('Project Files Uploaded Successfully!');
      return {
        ...newState,
        isLoading: false,
        success: true,
        postSuccess: true,
        error: null,
      };
    case types.API_ADD_PROJECT_FILES_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_GET_PROJECT_FILES_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_PROJECT_FILES_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        postSuccess: true,
        error: null,
        projectFiles: action.response.data.result,
      };
    case types.API_GET_PROJECT_FILES_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_DELETE_PROJECT_FILES_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        deleteItemSuccess: false,
        error: null,
      };
    case types.API_DELETE_PROJECT_FILES_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        deleteItemSuccess: true,
        error: null,
      };
    case types.API_DELETE_PROJECT_FILES_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        deleteItemSuccess: false,
        error: mapErrorMessage(action),
      };

    case types.API_GET_PROJECT_LINKS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_PROJECT_LINKS_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        postSuccess: true,
        error: null,
        projectLinks: action.response.data.result,
      };
    case types.API_GET_PROJECT_LINKS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_DELETE_PROJECT_LINKS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        deleteItemSuccess: false,
        error: null,
      };
    case types.API_DELETE_PROJECT_LINKS_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        deleteItemSuccess: true,
        error: null,
      };
    case types.API_DELETE_PROJECT_LINKS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        deleteItemSuccess: false,
        error: mapErrorMessage(action),
      };

    case types.RESET_PROJECT:
      return {
        ...newState,
        deleteSuccess: false,
        isLoading: false,
        success: false,
        postSuccess: false,
        deleteItemSuccess: false,
        error: null,
      };

    case types.RESET_TO_INITIAL_STATE:
      return {
        isLoading: false,
        success: false,
        postSuccess: false,
        deleteSuccess: false,
        deleteItemSuccess: false,
        error: null,
        projectList: null,
      };

    default:
      return state;
  }
}
