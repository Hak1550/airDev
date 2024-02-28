import * as types from '../constants/project';

// List Project
export const apiProjectGetRequest = (
  token,
  status = null,
  search = '',
  name = '',
  client = '',
  page = null,
  page_size = 1000,
) => ({
  type: types.API_PROJECT_GET_REQUEST,
  token,
  status,
  search,
  name,
  client,
  page,
  page_size,
});

export const apiProjectGetSuccess = response => ({
  type: types.API_PROJECT_GET_SUCCESS,
  response,
});

export const apiProjectGetFailed = response => ({
  type: types.API_PROJECT_GET_FAILED,
  response,
});

// List Archive Project
export const apiArchiveProjectGetRequest = (
  token,
  status = 0,
  search = '',
  name = '',
  client = '',
  page = null,
  page_size = null,
) => ({
  type: types.API_ARCHIVE_PROJECT_GET_REQUEST,
  token,
  status,
  search,
  name,
  client,
  page,
  page_size,
});

export const apiArchiveProjectGetSuccess = response => ({
  type: types.API_ARCHIVE_PROJECT_GET_SUCCESS,
  response,
});

export const apiArchiveProjectGetFailed = response => ({
  type: types.API_ARCHIVE_PROJECT_GET_FAILED,
  response,
});

// Post Project
export const apiProjectPostRequest = (data, token) => ({
  type: types.API_PROJECT_POST_REQUEST,
  data,
  token,
});

export const apiDuplicateProjectPostRequest = (data, token, project_id) => ({
  type: types.API_DUPLICATE_PROJECT_POST_REQUEST,
  data,
  token,
  project_id,
});

export const apiProjectPostSuccess = response => ({
  type: types.API_PROJECT_POST_SUCCESS,
  response,
});

export const apiProjectPostFailed = response => ({
  type: types.API_PROJECT_POST_FAILED,
  response,
});

// Patch Project
export const apiProjectPatchRequest = (data, project_id, token) => ({
  type: types.API_PROJECT_PATCH_REQUEST,
  data,
  project_id,
  token,
});

export const apiProjectPatchSuccess = response => ({
  type: types.API_PROJECT_PATCH_SUCCESS,
  response,
});

export const apiProjectPatchFailed = response => ({
  type: types.API_PROJECT_PATCH_FAILED,
  response,
});

// Delete Project
export const apiProjectDeleteRequest = (project_id, token) => ({
  type: types.API_PROJECT_DELETE_REQUEST,
  project_id,
  token,
});

export const apiProjectDeleteSuccess = response => ({
  type: types.API_PROJECT_DELETE_SUCCESS,
  response,
});

export const apiProjectDeleteFailed = response => ({
  type: types.API_PROJECT_DELETE_FAILED,
  response,
});

// Add project member
export const apiAddMemberRequest = (user_id, project_id, token) => ({
  type: types.API_ADD_MEMBER_REQUEST,
  user_id,
  project_id,
  token,
});

export const apiAddMemberSuccess = response => ({
  type: types.API_ADD_MEMBER_SUCCESS,
  response,
});

export const apiAddMemberFailed = response => ({
  type: types.API_ADD_MEMBER_FAILED,
  response,
});

// Remove project member
export const apiRemoveMemberRequest = (user_id, project_id, token) => ({
  type: types.API_REMOVE_MEMBER_REQUEST,
  user_id,
  project_id,
  token,
});

export const apiRemoveMemberSuccess = response => ({
  type: types.API_REMOVE_MEMBER_SUCCESS,
  response,
});

export const apiRemoveMemberFailed = response => ({
  type: types.API_REMOVE_MEMBER_FAILED,
  response,
});

// Add Project Links

export const apiAddProjectLinksRequest = (data, token) => ({
  type: types.API_ADD_PROJECT_LINKS_REQUEST,
  data,
  token,
});

export const apiAddProjectLinksSuccess = response => ({
  type: types.API_ADD_PROJECT_LINKS_SUCCESS,
  response,
});

export const apiAddProjectLinksFailed = response => ({
  type: types.API_ADD_PROJECT_LINKS_FAILED,
  response,
});

// Get Project Links

export const apiGetProjectLinksRequest = (project_id, token) => ({
  type: types.API_GET_PROJECT_LINKS_REQUEST,
  project_id,
  token,
});

export const apiGetProjectLinksSuccess = response => ({
  type: types.API_GET_PROJECT_LINKS_SUCCESS,
  response,
});

export const apiGetProjectLinksFailed = response => ({
  type: types.API_GET_PROJECT_LINKS_FAILED,
  response,
});

// Add Project Files

export const apiAddProjectFilesRequest = (data, token) => ({
  type: types.API_ADD_PROJECT_FILES_REQUEST,
  data,
  token,
});

export const apiAddProjectFilesSuccess = response => ({
  type: types.API_ADD_PROJECT_FILES_SUCCESS,
  response,
});

export const apiAddProjectFilesFailed = response => ({
  type: types.API_ADD_PROJECT_FILES_FAILED,
  response,
});

// Get Project Files

export const apiGetProjectFilesRequest = (project_id, token) => ({
  type: types.API_GET_PROJECT_FILES_REQUEST,
  project_id,
  token,
});

export const apiGetProjectFilesSuccess = response => ({
  type: types.API_GET_PROJECT_FILES_SUCCESS,
  response,
});

export const apiGetProjectFilesFailed = response => ({
  type: types.API_GET_PROJECT_FILES_FAILED,
  response,
});

// Delete Project Files
export const apiProjectFilesDeleteRequest = (id, token) => ({
  type: types.API_DELETE_PROJECT_FILES_REQUEST,
  id,
  token,
});

export const apiProjectFilesDeleteSuccess = response => ({
  type: types.API_DELETE_PROJECT_FILES_SUCCESS,
  response,
});

export const apiProjectFilesDeleteFailed = response => ({
  type: types.API_DELETE_PROJECT_FILES_FAILED,
  response,
});

// Delete Project Links
export const apiProjectLinksDeleteRequest = (id, token) => ({
  type: types.API_DELETE_PROJECT_LINKS_REQUEST,
  id,
  token,
});

export const apiProjectLinksDeleteSuccess = response => ({
  type: types.API_DELETE_PROJECT_LINKS_SUCCESS,
  response,
});

export const apiProjectLinksDeleteFailed = response => ({
  type: types.API_DELETE_PROJECT_LINKS_FAILED,
  response,
});

// reset
export const resetProject = () => ({
  type: types.RESET_PROJECT,
});
export const resetProjectState = () => ({
  type: types.RESET_TO_INITIAL_STATE,
});
