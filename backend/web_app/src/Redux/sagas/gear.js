import { put, call, all, spawn, takeEvery, delay } from 'redux-saga/effects';
import { gearServices } from '../services/gear';
import * as types from '../constants/gear';
import * as actions from '../actions/gear';
import * as assetsActions from '../actions/assets';
import * as shootActions from '../actions/shoot';

// List gears
function* apiListGearWorker(action) {
  try {
    const result = yield call(gearServices.apiListGear, action);

    yield put(actions.apiGearListSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGearListFailed(err, action));
  }
}

function* apiListGearWatcher() {
  yield takeEvery(types.API_GEAR_LIST_REQUEST, apiListGearWorker);
}

// List gears
function* apiGearGlobalListWorker(action) {
  try {
    const result = yield call(gearServices.apiGearGlobalList, action);

    yield put(actions.apiGearGlobalListSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGearGlobalListFailed(err, action));
  }
}

function* apiGearGlobalListWatcher() {
  yield takeEvery(types.API_GEAR_GLOBAL_LIST_REQUEST, apiGearGlobalListWorker);
}

// post gears
function* apiGearAssignedListWorker(action) {
  try {
    const result = yield call(gearServices.apiGearAssignedList, action);

    yield put(actions.apiGearAssignedListSuccess(result, action));
    yield put(assetsActions.apiGetAllAssetsRequest(action.token));
  } catch (err) {
    yield put(actions.apiGearAssignedListFailed(err, action));
  }
}

function* apiGearAssignedListWatcher() {
  yield takeEvery(
    types.API_GEAR_ASSIGN_LIST_REQUEST,
    apiGearAssignedListWorker,
  );
}

// post gears
function* apiPostGearAssignWorker(action) {
  try {
    yield call(gearServices.apiGearAssign, action);
    yield put(
      actions.apiGearAssignedListRequest(action.token, action.project_id),
    );
    yield put(assetsActions.apiGetAllAssetsRequest(action.token));
  } catch (err) {
    yield put(actions.apiGearAssignedFailed(err, action));
  }
}

function* apiPostGearAssignWatcher() {
  yield takeEvery(types.API_GEAR_ASSIGN_REQUEST, apiPostGearAssignWorker);
}

// patch Camera
function* apiPatchCameraAssignWorker(action) {
  try {
    const result = yield call(gearServices.apiPatchCamera, action);
    // yield call(gearServices.apiPatchCamera, action);
    yield put(actions.apiCameraPatchSuccess(result, action));
    yield put(actions.apiGearGlobalListRequest(action.token));
    yield put(assetsActions.apiGetAllAssetsRequest(action.token));
  } catch (err) {
    yield put(actions.apiCameraPatchFailed(err, action));
  }
}

function* apiPatchCameraAssignWatcher() {
  yield takeEvery(types.API_CAMERA_PATCH_REQUEST, apiPatchCameraAssignWorker);
}

// patch gears
function* apiPatchInstanceAssignWorker(action) {
  console.log(action);
  try {
    const result = yield call(gearServices.apiPatchInstance, action);
    yield put(actions.apiInstancePatchSuccess(result, action));
    yield put(actions.apiGearGlobalListRequest(action.token));
    yield put(assetsActions.apiGetAllAssetsRequest(action.token));
  } catch (err) {
    yield put(actions.apiInstancePatchFailed(err, action));
  }
}

function* apiPatchInstanceAssignWatcher() {
  yield takeEvery(
    types.API_INSTANCE_PATCH_REQUEST,
    apiPatchInstanceAssignWorker,
  );
}

// post projects
function* apiPostGearWorker(action) {
  try {
    if (action.formType === '1') {
      const result = yield call(gearServices.apiPostCamera, action);
      yield put(actions.apiGearPostSuccess(result, action));
      yield put(assetsActions.apiGetAllAssetsRequest(action.token));
      yield put(actions.apiGearGlobalListRequest(action.token));
    } else {
      const result = yield call(gearServices.apiPostInstance, action);
      yield put(actions.apiGearPostSuccess(result, action));
      yield put(assetsActions.apiGetAllAssetsRequest(action.token));
      yield put(actions.apiGearGlobalListRequest(action.token));
    }
  } catch (err) {
    yield put(actions.apiGearPostFailed(err, action));
  }
}

function* apiPostGearWatcher() {
  yield takeEvery(types.API_GEAR_POST_REQUEST, apiPostGearWorker);
}

// get camera details

function* apiGetCameraDetailsWorker(action) {
  try {
    const result = yield call(gearServices.apiGetCamDetails, action);
    yield put(actions.apiGetCameraDetailSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetCameraDetailFailed(err, action));
  }
}

function* apiGetCameraDetailsWatcher() {
  yield takeEvery(
    types.API_GET_CAMERA_DETAILS_REQUEST,
    apiGetCameraDetailsWorker,
  );
}

// get camera deactivate

function* apiGetCameraDeactivatesWorker(action) {
  try {
    const result = yield call(gearServices.apiGetCamDeactivate, action);
    yield put(actions.apiGetCameraDeactivateSuccess(result, action));
    yield put(actions.apiGearGlobalListRequest(action.token));
    yield put(assetsActions.apiGetAllAssetsRequest(action.token));
    yield put(shootActions.apiShootGetRequest(action.token, action.project_id));
  } catch (err) {
    yield put(actions.apiGetCameraDeactivateFailed(err, action));
  }
}

function* apiGetCameraDeactivatesWatcher() {
  yield takeEvery(
    types.API_POST_CAMERA_DEACTIVATE_REQUEST,
    apiGetCameraDeactivatesWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* gearRootSaga() {
  const sagas = [
    apiListGearWatcher,
    apiPostGearWatcher,
    apiGearGlobalListWatcher,
    apiGearAssignedListWatcher,
    apiPostGearAssignWatcher,
    apiPatchCameraAssignWatcher,
    apiPatchInstanceAssignWatcher,
    apiGetCameraDetailsWatcher,
    apiGetCameraDeactivatesWatcher,
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
