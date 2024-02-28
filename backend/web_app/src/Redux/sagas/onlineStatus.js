import { put, call, all, spawn, takeEvery, delay } from 'redux-saga/effects';
import { onlineStatusServices } from '../services/onlineStatus';
import * as types from '../constants/onlineStatus';
import * as actions from '../actions/onlineStatus';

// Get Camera Status
function* apiGetCameraStatusWorker(action) {
  try {
    const result = yield call(onlineStatusServices.apiGetCameraStatus, action);
    yield put(actions.apiGetCameraStatusSuccess(result, action));
    // yield delay(1 * 60 * 1000);
    yield delay(4 * 60 * 1000);
    yield put(actions.apiGetCameraStatusRequest(action.air_ids, action.token));
  } catch (err) {
    yield put(actions.apiGetCameraStatusFailed(err, action));
  }
}

function* apiGetCameraStatusWatcher() {
  yield takeEvery(
    types.API_GET_CAMERA_STATUS_REQUEST,
    apiGetCameraStatusWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* onlineStatusRootSaga() {
  const sagas = [apiGetCameraStatusWatcher];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}
