import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { shootServices } from '../services/shoot';
import * as types from '../constants/shoot';
import * as actions from '../actions/shoot';

// Get shoot
function* apiGetShootWorker(action) {
  try {
    const result = yield call(shootServices.apiGetShoot, action);
    yield put(actions.apiShootGetSuccess(result, action));
  } catch (err) {
    yield put(actions.apiShootGetFailed(err, action));
  }
}

function* apiGetShootWatcher() {
  yield takeEvery(types.API_SHOOT_GET_REQUEST, apiGetShootWorker);
}

// patch project
function* apiPatchShootWorker(action) {
  try {
    const result = yield call(shootServices.apiPatchShoot, action);
    yield put(actions.apiShootGetRequest(action.token, result.data.project_id));
  } catch (err) {
    yield put(actions.apiShootPatchFailed(err, action));
  }
}

function* apiPatchShootWatcher() {
  yield takeEvery(types.API_SHOOT_PATCH_REQUEST, apiPatchShootWorker);
}

// patch project
function* apiDeleteBackgroundWorker(action) {
  try {
    yield call(shootServices.apiDeleteBackground, action);
    yield put(actions.apiShootGetRequest(action.token, action.project_id));
  } catch (err) {
    yield put(actions.apiShootPatchFailed(err, action));
  }
}

function* apiDeleteBackgroundWatcher() {
  yield takeEvery(
    types.API_BACKGROUND_DELETE_REQUEST,
    apiDeleteBackgroundWorker,
  );
}

function* apiUpdateUserPermission({ action }) {
  try {
    yield call(shootServices.apiUpdatePermission, action);
    yield put(actions.setUpdateUserPermissionSuccess(true));
    yield put(actions.apiShootGetRequest(action.token, action.project_id));
  } catch (err) {
    console.log(err);
    yield put(actions.setUpdateUserPermissionSuccess(false));
  }
}

function* apiPermissionWatcher() {
  yield takeEvery(types.API_UPDATE_PERMISSION, apiUpdateUserPermission);
}

function* apiRemoveUserPermissions({ action }) {
  try {
    yield call(shootServices.apiRemovePermission, action);
    yield put(actions.apiRemoveUserPermissionsSuccess(true));
    yield put(actions.apiShootGetRequest(action.token, action.project_id));
  } catch (err) {
    console.log(err);
    // consol;
    yield put(actions.apiRemoveUserPermissionsSuccess(false));
  }
}

function* apiRemovePermissionWatcher() {
  yield takeEvery(types.API_REMOVE_PERMISSION, apiRemoveUserPermissions);
}

function* apiRelatedGear(action) {
  console.log('action in saga', action);

  try {
    const response = yield call(shootServices.apiRelatedProject, action);
    console.log('response here is ', response.data.data);
    yield put(actions.setRelatedGearId(response.data.data));
  } catch (err) {
    console.log('err in saga', err);
    yield put(actions.apiRelatedGearFailed(err));
  }
}

function* apiRelatedGearWatcher() {
  yield takeEvery(types.API_RELATED_GEAR_REQUEST, apiRelatedGear);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* shootRootSaga() {
  const sagas = [
    apiGetShootWatcher,
    apiPatchShootWatcher,
    apiRemovePermissionWatcher,
    apiPermissionWatcher,
    apiRelatedGearWatcher,
    apiDeleteBackgroundWatcher,
  ];

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
