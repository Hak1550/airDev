import * as types from '../constants/team';

// List Team Members
export const apiTeamListRequest = (
  token,
  search = '',
  role = null,
  project = '',
  page = null,
  selectAll,
) => ({
  type: types.API_TEAM_LIST_REQUEST,
  token,
  search,
  role,
  project,
  page,
  selectAll,
  // page_size,
});

export const apiTeamListSuccess = response => ({
  type: types.API_TEAM_LIST_SUCCESS,
  response,
});

export const apiTeamListFailed = response => ({
  type: types.API_TEAM_LIST_FAILED,
  response,
});

// List other Members
export const apiMembersListRequest = token => ({
  type: types.API_MEMBERS_LIST_REQUEST,
  token,
});

export const apiMembersListSuccess = response => ({
  type: types.API_MEMBERS_LIST_SUCCESS,
  response,
});

export const apiMembersListFailed = response => ({
  type: types.API_MEMBERS_LIST_FAILED,
  response,
});

// Delete Members from Team Members List
export const apiTeamDeleteRequest = (id, token) => ({
  type: types.API_TEAM_DELETE_REQUEST,
  id,
  token,
});
export const apiTeamDeleteSuccess = response => ({
  type: types.API_TEAM_DELETE_SUCCESS,
  response,
});

export const apiTeamDeleteFailed = response => ({
  type: types.API_TEAM_DELETE_FAILED,
  response,
});

// Add Members to Team Members
export const apiTeamPostRequest = (data, token) => ({
  type: types.API_TEAM_POST_REQUEST,
  data,
  token,
});
export const apiTeamPostSuccess = response => ({
  type: types.API_TEAM_POST_SUCCESS,
  response,
});

export const apiTeamPostFailed = response => ({
  type: types.API_TEAM_POST_FAILED,
  response,
});

// Get All Projects
export const apiProjectListRequest = token => ({
  type: types.API_PROJECT_LIST_REQUEST,
  token,
});

export const apiProjectListSuccess = response => ({
  type: types.API_PROJECT_LIST_SUCCESS,
  response,
});

export const apiProjectListFailed = response => ({
  type: types.API_PROJECT_LIST_FAILED,
  response,
});

// Edit Collabolators
export const apiTeamMemberPatchRequest = (data, token, id) => ({
  type: types.API_TEAM_PATCH_REQUEST,
  data,
  token,
  id,
});
export const apiTeamMemberPatchSuccess = response => ({
  type: types.API_TEAM_PATCH_SUCCESS,
  response,
});

export const apiTeamMemberPatchFailed = response => ({
  type: types.API_TEAM_PATCH_FAILED,
  response,
});

// Next Page
export const apiNextPageRequest = token => ({
  type: types.API_NEXT_PAGE_REQUEST,
  token,
});
export const apiNextPageSuccess = response => ({
  type: types.API_NEXT_PAGE_SUCCESS,
  response,
});

export const apiNextPageFailed = response => ({
  type: types.API_NEXT_PAGE_FAILED,
  response,
});

// Previous Page
export const apiPreviousPageRequest = token => ({
  type: types.API_PREVIOUS_PAGE_REQUEST,
  token,
});
export const apiPreviousPageSuccess = response => ({
  type: types.API_PREVIOUS_PAGE_SUCCESS,
  response,
});

export const apiPreviousPageFailed = response => ({
  type: types.API_PREVIOUS_PAGE_FAILED,
  response,
});
