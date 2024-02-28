import * as types from '../constants/onlineStatus';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';

const INITIAL_STATE = {
  cameraStatusList: [],
};

export default function onlineStatusApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    // Get Camera Status
    case types.API_GET_CAMERA_STATUS_REQUEST:
      return {
        ...newState,
      };
    case types.API_GET_CAMERA_STATUS_SUCCESS:
      return {
        ...newState,
        cameraStatusList: action.response.data.result,
      };
    case types.API_GET_CAMERA_STATUS_FAILED:
      return {
        ...newState,
        error: mapErrorMessage(action),
      };
    default:
      return state;
  }
}
