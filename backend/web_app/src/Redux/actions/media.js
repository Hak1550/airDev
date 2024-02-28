import * as types from '../constants/media';

// Add Collection
export const apiAddCollectionRequest = (data, token, isUpdate = false) => ({
  type: types.API_ADD_COLLECTION_REQUEST,
  data,
  token,
  isUpdate,
});

export const apiAddCollectionSuccess = response => ({
  type: types.API_ADD_COLLECTION_SUCCESS,
  response,
});

export const apiAddCollectionFailed = response => ({
  type: types.API_ADD_COLLECTION_FAILED,
  response,
});

// Add Collection items
export const apiAddCollectionItemsRequest = (
  data,
  token,
  organizationId = null,
) => ({
  type: types.API_ADD_COLLECTION_ITEMS_REQUEST,
  data,
  token,
  organizationId,
});

export const apiAddCollectionItemsSuccess = response => ({
  type: types.API_ADD_COLLECTION_ITEMS_SUCCESS,
  response,
});

export const apiAddCollectionItemsFailed = response => ({
  type: types.API_ADD_COLLECTION_ITEMS_FAILED,
  response,
});

// fetch all Collections
export const apiGetAllCollectionsRequest = (
  token,
  search,
  page,
  pageSize,
  ordering = 'created',
) => ({
  type: types.API_GET_ALL_COLLECTIONS_REQUEST,
  token,
  search,
  page,
  pageSize,
  ordering,
});

export const apiGetAllCollectionsSuccess = response => ({
  type: types.API_GET_ALL_COLLECTIONS_SUCCESS,
  response,
});

export const apiGetAllCollectionsFailed = response => ({
  type: types.API_GET_ALL_COLLECTIONS_FAILED,
  response,
});

// Get Collection By Id
export const apiGetCollectionByIdRequest = (
  id,
  token,
  search = '',
  ordering = 'created',
  created__lte = null,
  created__gte = null,
  page = 1,
  page_size = 20,
) => ({
  type: types.API_GET_COLLECTION_BY_ID_REQUEST,
  search,
  ordering,
  created__lte,
  created__gte,
  page,
  page_size,
  id,
  token,
});

export const apiGetCollectionByIdSuccess = response => ({
  type: types.API_GET_COLLECTION_BY_ID_SUCCESS,
  response,
});

export const apiGetCollectionByIdFailed = response => ({
  type: types.API_GET_COLLECTION_BY_ID_FAILED,
  response,
});

// fetch all Media
export const apiGetAllMediaRequest = (token, organizationId) => ({
  type: types.API_GET_ALL_MEDIA_REQUEST,
  token,
  organizationId,
});

export const apiGetAllMediaSuccess = response => ({
  type: types.API_GET_ALL_MEDIA_SUCCESS,
  response,
});

export const apiGetAllMediaFailed = response => ({
  type: types.API_GET_ALL_MEDIA_FAILED,
  response,
});

// Delete Media
export const apiDeleteMediaRequest = (token, organizationId, keys) => ({
  type: types.API_DELETE_MEDIA_REQUEST,
  token,
  organizationId,
  keys,
});

export const apiDeleteMediaSuccess = response => ({
  type: types.API_DELETE_MEDIA_SUCCESS,
  response,
});

export const apiDeleteMediaFailed = response => ({
  type: types.API_DELETE_MEDIA_FAILED,
  response,
});

// Delete Collection Items
export const apiDeleteCollectionItemsRequest = (token, data) => ({
  type: types.API_DELETE_COLLECTION_ITEMS_REQUEST,
  token,
  data,
});

export const apiDeleteCollectionItemsSuccess = response => ({
  type: types.API_DELETE_COLLECTION_ITEMS_SUCCESS,
  response,
});

export const apiDeleteCollectionItemsFailed = response => ({
  type: types.API_DELETE_COLLECTION_ITEMS_FAILED,
  response,
});

// Delete Collection
export const apiDeleteCollectionRequest = (token, data) => ({
  type: types.API_DELETE_COLLECTION_REQUEST,
  token,
  data,
});

export const apiDeleteCollectionSuccess = response => ({
  type: types.API_DELETE_COLLECTION_SUCCESS,
  response,
});

export const apiDeleteCollectionFailed = response => ({
  type: types.API_DELETE_COLLECTION_FAILED,
  response,
});

export const setMediaContentDetails = data => ({
  type: types.SET_MEDIA_CONTENT_DETAILS,
  data,
});

// Get Media By Id
export const apiGetMediaDetailsRequest = (organizationId, token, key) => ({
  type: types.API_GET_MEDIA_DETAILS_REQUEST,
  organizationId,
  token,
  key,
});

export const apiGetMediaDetailsSuccess = response => ({
  type: types.API_GET_MEDIA_DETAILS_SUCCESS,
  response,
});

export const apiGetMediaDetailsFailed = response => ({
  type: types.API_GET_MEDIA_DETAILS_FAILED,
  response,
});

// Get Clients
export const apiGetClientsRequest = (organizationId, token) => ({
  type: types.API_GET_CLIENTS_REQUEST,
  organizationId,
  token,
});

export const apiGetClientsSuccess = response => ({
  type: types.API_GET_CLIENTS_SUCCESS,
  response,
});

export const apiGetClientsFailed = response => ({
  type: types.API_GET_CLIENTS_FAILED,
  response,
});

export const setSelectedBucket = data => ({
  type: types.SET_SELECTED_ORG,
  data,
});

export const resetInitialState = () => ({
  type: types.RESET_TO_INITIAL_STATE,
});
