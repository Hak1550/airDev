import * as types from '../constants/shoot';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  isPageLoading: false, // TODO: refactor
  payloadKeys: [],
  success: false,
  error: null,
  shoot: null,
  relatedGearId: {},
  toggle_sidePan: false,
  toggle_crew_view: true,
  toggle_gear_view: true,
  toggle_site_view: true,
  toggle_image_bg_size: false,
  toggle_right_nav_on_cell: false,
};

let toastId = null;
export default function shootApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // list shoot
    case types.API_SHOOT_GET_REQUEST:
      return {
        ...newState,
        isLoading: true,
        isPageLoading: true,
        success: false,
        error: null,
      };

    case types.API_SHOOT_GET_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        isPageLoading: false,
        success: true,
        error: null,
        shoot: action.response.data.data,
      };

    case types.API_SHOOT_GET_FAILED:
      return {
        ...newState,
        isLoading: false,
        isPageLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // edit shoot
    case types.API_SHOOT_PATCH_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
        payloadKeys: Object.keys(action.data),
      };

    case types.API_SHOOT_PATCH_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        shoot: action.response.data.data,
      };

    case types.API_SHOOT_PATCH_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data.error),
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    case types.API_REMOVE_PERMISSION:
      // console.log('permissions', action, newState);
      // if (action.action) {
      //   toast.success('Permission Updated.');
      // } else {
      //   toast.error('Permission Update Failed.');
      // }
      return newState;

    case types.SET_UPDATE_PERMISSION_STATUS:
      // console.log('permissions', action, newState);
      // if (action.action) {
      //   toast.success('Permission Updated.');
      // } else {
      //   toast.error('Permission Update Failed.');
      // }
      return newState;

    case types.API_RELATED_GEAR_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        error: null,
      };

    case types.SET_RELATED_GEAR_ID:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        relatedGearId: action.response,
      };
    case types.API_RELATED_GEAR_FAILED:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // reset state
    case types.RESET_SHOOT:
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: null,
      };
    // toggle side pan
    case types.TOGGLE_SIDEPAN:
      return {
        ...newState,
        toggle_sidePan: !newState.toggle_sidePan,
      };

    // toggle crew
    case types.TOGGLE_CREW_VIEW:
      return {
        ...newState,
        toggle_crew_view: !newState.toggle_crew_view,
      };

    // toggle gear
    case types.TOGGLE_GEAR_VIEW:
      return {
        ...newState,
        toggle_gear_view: !newState.toggle_gear_view,
      };

    // toggle Site
    case types.TOGGLE_SITE_VIEW:
      return {
        ...newState,
        toggle_site_view: !newState.toggle_site_view,
      };
    // toggle Site
    case types.TOGGLE_BACKGROUND_IMAGE_SIZE:
      return {
        ...newState,
        toggle_image_bg_size: !newState.toggle_image_bg_size,
      };
    // toggle Right Nav on Mobile
    case types.TOGGLE_RIGHT_NAV_ON_MOBILE:
      return {
        ...newState,
        toggle_right_nav_on_cell: !newState.toggle_right_nav_on_cell,
      };

    default:
      return state;
  }
}
