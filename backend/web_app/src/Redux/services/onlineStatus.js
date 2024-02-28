import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function apiGetCameraStatus(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(
    `api/v1/gear/get-camera-status/${action.air_ids.toString()}/`,
    { headers },
  );
}

export const onlineStatusServices = {
  apiGetCameraStatus,
};
