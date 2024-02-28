import * as types from '../constants/media';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  postSuccess: false,
  error: null,
  allCollections: null,
  collectionData: null,
  allMediaList: null,
  mediaContentDetails: null,
  selectedOrg: null,
  mediaDetails: null,
  clientList: [],
};

export default function mediaApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // Add Collection
    case types.API_ADD_COLLECTION_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        postSuccess: false,
        error: null,
        mediaContentDetails: null,
      };
    case types.API_ADD_COLLECTION_SUCCESS:
      toast.success('Collection Added Successfully!');
      return {
        ...newState,
        isLoading: false,
        postSuccess: true,
        error: null,
      };
    case types.API_ADD_COLLECTION_FAILED:
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

    // Add Collection Items
    case types.API_ADD_COLLECTION_ITEMS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        postSuccess: false,
        error: null,
      };
    case types.API_ADD_COLLECTION_ITEMS_SUCCESS:
      // toast.success('Assets added to the collectios successfully!', {
      //   toastId: 'asset-to-col',
      // });
      return {
        ...newState,
        isLoading: false,
        postSuccess: true,
        error: null,
      };
    case types.API_ADD_COLLECTION_ITEMS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error), {
        toastId: 'asset-to-col-error',
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get All Collections
    case types.API_GET_ALL_COLLECTIONS_REQUEST:
      return {
        ...newState,
        // isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_ALL_COLLECTIONS_SUCCESS:
      return {
        ...newState,
        // isLoading: false,
        success: true,
        error: null,
        allCollections: action.response.data,
      };
    case types.API_GET_ALL_COLLECTIONS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get All Media
    case types.API_GET_ALL_MEDIA_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_ALL_MEDIA_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        allMediaList: action.response.data,
      };
    case types.API_GET_ALL_MEDIA_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error), {
        toastId: 'all-media-error',
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Delete Media
    case types.API_DELETE_MEDIA_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_DELETE_MEDIA_SUCCESS:
      toast.success('Media deleted successfully!');
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };
    case types.API_DELETE_MEDIA_FAILED:
      const parseError = parseDjangoError(
        action.response.response.data.error ||
          action.response.response.data.result,
      );
      console.log('p err : ', parseError);
      toast.error(parseError);
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Delete Collection Item
    case types.API_DELETE_COLLECTION_ITEMS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_DELETE_COLLECTION_ITEMS_SUCCESS:
      // toast.success('Media deleted successfully!');
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };
    case types.API_DELETE_COLLECTION_ITEMS_FAILED:
      const error = parseDjangoError(
        action.response.response.data.error ||
          action.response.response.data.result,
      );
      toast.error(error);
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Delete Collection
    case types.API_DELETE_COLLECTION_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_DELETE_COLLECTION_SUCCESS:
      toast.success('Collection deleted successfully!');
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
      };
    case types.API_DELETE_COLLECTION_FAILED:
      const delError = parseDjangoError(
        action.response.response.data.error ||
          action.response.response.data.result,
      );
      toast.error(delError);
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Collection BY ID
    case types.API_GET_COLLECTION_BY_ID_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_COLLECTION_BY_ID_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        collectionData: action.response.data,
      };
    case types.API_GET_COLLECTION_BY_ID_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Media BY ID
    case types.API_GET_MEDIA_DETAILS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_MEDIA_DETAILS_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        mediaDetails: action.response.data,
      };
    case types.API_GET_MEDIA_DETAILS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get Clients
    case types.API_GET_CLIENTS_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };
    case types.API_GET_CLIENTS_SUCCESS:
      return {
        ...newState,
        success: true,
        error: null,
        clientList: action.response.data,
      };
    case types.API_GET_CLIENTS_FAILED:
      toast.error(parseDjangoError(action.response.response.data.error), {
        toastId: 'client-error',
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.SET_MEDIA_CONTENT_DETAILS:
      return {
        ...newState,
        mediaContentDetails: action.data,
      };

    case types.SET_SELECTED_ORG:
      return {
        ...newState,
        selectedOrg: action.data,
      };
    case types.RESET_TO_INITIAL_STATE:
      return {
        isLoading: false,
        success: false,
        error: null,
      };

    default:
      return state;
  }
}
