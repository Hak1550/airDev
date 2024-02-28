import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { loginServices } from '../services/login';
import * as types from '../constants/login';
import * as actions from '../actions/login';
import request from '../../Utils/request';
import { auth } from 'Utils/auth';

// Login
function* apiLoginRequestWorker(action) {
  const url = `/api/v1/login/`;
  const options = {
    method: 'POST',
    data: action.data,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const result = yield call(loginServices.apiLoginRequest, action);
    // const result = yield call(request, url, options);
    yield put(actions.apiLoginRequestSuccess(result, action));
  } catch (err) {
    yield put(actions.apiLoginRequestFailed(err, action));
  }
}

function* apiLoginRequestWatcher() {
  yield takeEvery(types.API_LOGIN_REQUEST, apiLoginRequestWorker);
}

// Login
function* apiLogOutRequestWorker(action) {
  try {
    yield call(loginServices.apiLogOutRequest, action);
    auth.logout();
  } catch (err) {
    // yield put(actions.apiLoginRequestFailed(err, action));
    console.log(err);
  }
}

function* apiLogOutRequestWatcher() {
  yield takeEvery(types.CLEAR_TOKEN, apiLogOutRequestWorker);
}

// Password reset
function* apiPasswordResetRequestWorker(action) {
  try {
    const result = yield call(loginServices.apiPasswordResetRequest, action);
    yield put(actions.apiPasswordResetSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPasswordResetFailed(err, action));
  }
}

function* apiPasswordResetRequestWatcher() {
  yield takeEvery(
    types.API_PASSWORD_RESET_REQUEST,
    apiPasswordResetRequestWorker,
  );
}

// Password reset confirm
function* apiPasswordResetConfirmRequestWorker(action) {
  try {
    const result = yield call(
      loginServices.apiPasswordResetConfirmRequest,
      action,
    );
    yield put(actions.apiPasswordResetConfirmSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPasswordResetConfirmFailed(err, action));
  }
}

function* apiPasswordResetConfirmRequestWatcher() {
  yield takeEvery(
    types.API_PASSWORD_RESET_CONFIRM_REQUEST,
    apiPasswordResetConfirmRequestWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* loginRootSaga() {
  const sagas = [
    apiLoginRequestWatcher,
    apiPasswordResetRequestWatcher,
    apiPasswordResetConfirmRequestWatcher,
    apiLogOutRequestWatcher,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log('error', e);
          }
        }
      }),
    ),
  );
}
