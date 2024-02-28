import * as types from '../constants/sidebar';

export const showSideBarPage = () => ({
  type: types.SHOW_SIDEBAR_PAGE,
});

export const hideSideBarPage = () => ({
  type: types.HIDE_SIDEBAR_PAGE,
});

export const updateSideBarState = data => ({
  type: types.UPDATE_SIDEBAR_STATE,
  data,
});

export const addMemberToSelectedProject = data => ({
  type: types.ADD_MEMBER_SELECTED_PROJECT,
  data,
});
