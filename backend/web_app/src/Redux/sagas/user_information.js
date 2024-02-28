import { put, call, all, spawn, takeEvery, delay } from 'redux-saga/effects';
import { userInformationServices } from '../services/user_information';
import * as types from '../constants/user_information';
import * as actions from '../actions/user_information';

// Get user information
function* apiGetUserInformationWorker(action) {
  try {
    const result = yield call(
      userInformationServices.apiGetUserInformation,
      action,
    );

    yield put(actions.apiGetUserInformationSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetUserInformationFailed(err, action));
  }
}

function* apiGetUserInformationWatcher() {
  yield takeEvery(types.API_GET_USER_INFORMATION, apiGetUserInformationWorker);
}

// Get MyStoragePlan
function* apiGetMyStoragePlanWorker(action) {
  try {
    const result = yield call(
      userInformationServices.apiGetMyStoragePlan,
      action,
    );

    yield put(actions.apiGetMyStoragePlanSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetMyStoragePlanFailed(err, action));
  }
}

function* apiGetMyStoragePlanWatcher() {
  yield takeEvery(types.API_GET_MY_STORAGE_PLAN, apiGetMyStoragePlanWorker);
}

// Get MyAssets
function* apiGetMyAssetsWorker(action) {
  try {
    const result = yield call(userInformationServices.apiGetMyAssets, action);

    yield put(actions.apiGetMyAssetsSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetMyAssetsFailed(err, action));
  }
}

function* apiGetMyAssetsWatcher() {
  yield takeEvery(types.API_GET_MY_ASSETS, apiGetMyAssetsWorker);
}

// Get Online Member
function* apiGetOnlineMembersWorker(action) {
  try {
    const result = yield call(
      userInformationServices.apiGetOnlineMembers,
      action,
    );
    yield put(actions.apiGetOnlineMembersSuccess(result, action));
    yield delay(4 * 60 * 1000);
    yield put(actions.apiGetOnlineMembers(action.project_id, action.token));
  } catch (err) {
    yield put(actions.apiGetOnlineMembersFailed(err, action));
  }
}

function* apiGetOnlineMembersWatcher() {
  yield takeEvery(types.API_GET_ONLINE_MEMBERS, apiGetOnlineMembersWorker);
}

// List user information
function* apiListUserInformationWorker(action) {
  try {
    const result = yield call(
      userInformationServices.apiListUserInformation,
      action,
    );

    yield put(actions.apiListUserInformationSuccess(result, action));
  } catch (err) {
    yield put(actions.apiListUserInformationFailed(err, action));
  }
}

function* apiListUserInformationWatcher() {
  yield takeEvery(
    types.API_LIST_USER_INFORMATION,
    apiListUserInformationWorker,
  );
}

// post user information
function* apiPostUserInformationWorker(action) {
  try {
    const result = yield call(
      userInformationServices.apiPostUserInformation,
      action,
    );

    yield put(actions.apiPostUserInformationSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPostUserInformationFailed(err, action));
  }
}

function* apiPostUserInformationWatcher() {
  yield takeEvery(
    types.API_POST_USER_INFORMATION,
    apiPostUserInformationWorker,
  );
}

// put user information
function* apiPutUserInformationWorker(action) {
  try {
    const result = yield call(
      userInformationServices.apiPutUserInformation,
      action,
    );

    yield put(actions.apiPutUserInformationSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPutUserInformationFailed(err, action));
  }
}

function* apiPutUserInformationWatcher() {
  yield takeEvery(types.API_PUT_USER_INFORMATION, apiPutUserInformationWorker);
}

// patch user information
function* apiPatchUserInformationWorker(action) {
  try {
    const result = yield call(
      userInformationServices.apiPatchUserInformation,
      action,
    );

    yield put(actions.apiPatchUserInformationSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPatchUserInformationFailed(err, action));
  }
}

function* apiPatchUserInformationWatcher() {
  yield takeEvery(
    types.API_PATCH_USER_INFORMATION,
    apiPatchUserInformationWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* userInformationRootSaga() {
  const sagas = [
    apiListUserInformationWatcher,
    apiGetUserInformationWatcher,
    apiPostUserInformationWatcher,
    apiPutUserInformationWatcher,
    apiPatchUserInformationWatcher,
    apiGetMyStoragePlanWatcher,
    apiGetMyAssetsWatcher,
    apiGetOnlineMembersWatcher,
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
