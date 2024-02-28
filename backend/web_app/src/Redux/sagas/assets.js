import { put, call, all, spawn, takeEvery, delay } from 'redux-saga/effects';
import { assetsServices } from '../services/assets';
import * as types from '../constants/assets';
import * as actions from '../actions/assets';
import * as actions2 from '../actions/user_information';

// Get Assets
function* apiGetAllAssetsRequestWorker(action) {
  try {
    const result = yield call(assetsServices.apiGetAllAssetsRequest, action);
    yield put(actions.apiGetAllAssetsSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetAllAssetsFailed(err, action));
  }
}

function* apiGetAllAssetsRequestWatcher() {
  yield takeEvery(
    types.API_GET_ALL_ASSETS_REQUEST,
    apiGetAllAssetsRequestWorker,
  );
}

// Get Instance Usage
function* apiGetInstanceUsageRequestWorker(action) {
  try {
    const result = yield call(
      assetsServices.apiGetInstanceUsageRequest,
      action,
    );
    yield put(actions.apiGetInstanceUsageSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetInstanceUsageFailed(err, action));
  }
}

function* apiGeInstanceUsagesRequestWatcher() {
  yield takeEvery(
    types.API_GET_INSTANCE_USAGE_REQUEST,
    apiGetInstanceUsageRequestWorker,
  );
}

// Get Storage
function* apiGetStorageRequestWorker(action) {
  try {
    const result = yield call(
      assetsServices.apiGetStoragePlanServiceRequest,
      action,
    );
    yield put(actions.apiGetStoragePlanSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetStoragePlanFailed(err, action));
  }
}

function* apiGetStorageRequestWatcher() {
  yield takeEvery(
    types.API_GET_STORAGE_PLAN_REQUEST,
    apiGetStorageRequestWorker,
  );
}

// Get Wasabi Used Storage
function* apiGetWasabiUsedStorageWorker(action) {
  try {
    const result = yield call(
      assetsServices.apiWasabiUsedStorageService,
      action,
    );
    yield put(actions.apiGetWasabiUsedStorageSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetWasabiUsedStorageFailed(err, action));
  }
}

function* apiGetWasabiUsedStorageWatcher() {
  yield takeEvery(
    types.API_GET_WASABI_USED_STORAGE_REQUEST,
    apiGetWasabiUsedStorageWorker,
  );
}

// Get Available Packages

function* apiGetAvailablePkgRequestWorker(action) {
  try {
    const result = yield call(
      assetsServices.apiGetAvailablePkgServiceRequest,
      action,
    );
    yield put(actions.apiGetAvailablePkgSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetAvailablePkgFailed(err, action));
  }
}

function* apiGetAvailablePkgRequestWatcher() {
  yield takeEvery(
    types.API_GET_AVAILABLE_PACKAGES_REQUEST,
    apiGetAvailablePkgRequestWorker,
  );
}

// 1st time payment

function* api1stTimePaymentRequestWorker(action) {
  try {
    const result = yield call(
      assetsServices.apiCreatePaymentServiceRequest,
      action,
    );
    yield delay(5000);
    yield put(actions.apiCreatePaymentSuccess(result, action));
    yield put(actions2.apiGetMyStoragePlan(action.token));
  } catch (err) {
    yield put(actions.apiCreatePaymentFailed(err, action));
  }
}

function* api1stTimePaymentRequestWatcher() {
  yield takeEvery(
    types.API_CREATE_PAYMENT_SESSION_REQUEST,
    api1stTimePaymentRequestWorker,
  );
}

// with same package

function* apiSamePkgPaymentRequestWorker(action) {
  try {
    yield call(assetsServices.apiSamePkgServiceRequest, action);
    yield delay(5000);
    yield put(actions.apiContinueSamePkgSuccess(action.token, action.data));
    yield put(actions2.apiGetMyStoragePlan(action.token));
  } catch (err) {
    yield put(actions.apiContinueSamePkgFailed(err, action));
  }
}

function* apiSamePkgPaymentRequestWatcher() {
  yield takeEvery(
    types.API_PAYMENT_SAME_PACKAGE_SESSION_REQUEST,
    apiSamePkgPaymentRequestWorker,
  );
}

// with new package

function* apiNewPkgPaymentRequestWorker(action) {
  try {
    const result = yield call(assetsServices.apiNewPkgServiceRequest, action);
    yield delay(5000);
    yield put(actions.apiContinueNewPkgSuccess(result, action));
    yield put(actions2.apiGetMyStoragePlan(action.token));
  } catch (err) {
    yield put(actions.apiContinueNewPkgFailed(err, action));
  }
}

function* apiNewPkgPaymentRequestWatcher() {
  yield takeEvery(
    types.API_PAYMENT_NEW_PACKAGE_SESSION_REQUEST,
    apiNewPkgPaymentRequestWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* assetsRootSaga() {
  const sagas = [
    apiGetAllAssetsRequestWatcher,
    apiGetStorageRequestWatcher,
    apiGetAvailablePkgRequestWatcher,
    api1stTimePaymentRequestWatcher,
    apiSamePkgPaymentRequestWatcher,
    apiNewPkgPaymentRequestWatcher,
    apiGetWasabiUsedStorageWatcher,
    apiGeInstanceUsagesRequestWatcher,
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
