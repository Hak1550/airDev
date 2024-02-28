import * as types from '../constants/sidebar';
import SideBarStatus from '../../Enums/SideBarStatus';
import SideBarPageType from '../../Enums/SideBarPageType';

const INITIAL_STATE = {
  status: SideBarStatus.CLOSED,
  pageType: SideBarPageType.PROJECT,
  selectedProject: null,
  newMember: null,
  mediaContentDetails: null,
};

export default function sidebarReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case types.UPDATE_SIDEBAR_STATE:
      return {
        ...action.data,
      };

    case types.SHOW_SIDEBAR_PAGE:
      return {
        ...newState,
        status: SideBarStatus.OPEN,
      };

    case types.HIDE_SIDEBAR_PAGE:
      return {
        ...newState,
        status: SideBarStatus.CLOSED,
      };
    case types.ADD_MEMBER_SELECTED_PROJECT:
      const haveMember = newState.selectedProject?.members.filter(
        m => m.user === action.data.user,
      ).length;
      if (!haveMember) {
        newState.selectedProject?.members.push({ ...action.data });
      }
      return {
        ...newState,
        status: SideBarStatus.CLOSED,
        newMember: action.data.user,
      };
    default:
      return state;
  }
}
