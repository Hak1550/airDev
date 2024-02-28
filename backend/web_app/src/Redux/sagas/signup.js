import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { signupServices } from '../services/signup';
import * as types from '../constants/signup';
import * as actions from '../actions/signup';

// Sign up
function* apiSignupRequestWorker(action) {
  try {
    const result = yield call(signupServices.apiSignupRequest, action);

    yield put(actions.apiSignupRequestSuccess(result, action));
  } catch (err) {
    yield put(actions.apiSignupRequestFailed(err, action));
  }
}

function* apiSignupRequestWatcher() {
  yield takeEvery(types.API_SIGNUP_REQUEST, apiSignupRequestWorker);
}

function* apiChangePasswordRequestWorker(action) {
  try {
    const result = yield call(signupServices.apiChangePasswordRequest, action);

    yield put(actions.apiChangePasswordSuccess(result, action));
  } catch (err) {
    yield put(actions.apiChangePasswordFailed(err, action));
  }
}

function* apiChangePasswordRequestWatcher() {
  yield takeEvery(
    types.API_CHANGE_PASSWORD_REQUEST,
    apiChangePasswordRequestWorker,
  );
}
function* apiUserConfirmationRequestWorker(action) {
  try {
    const result = yield call(
      signupServices.apiUserConfirmationRequest,
      action,
    );

    yield put(actions.apiUserConfirmationSuccess(result, action));
  } catch (err) {
    yield put(actions.apiUserConfirmationFailed(err, action));
  }
}

function* apiUserConfirmationRequestWatcher() {
  yield takeEvery(
    types.API_USER_CONFIRMATION_REQUEST,
    apiUserConfirmationRequestWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* signupRootSaga() {
  const sagas = [
    apiSignupRequestWatcher,
    apiChangePasswordRequestWatcher,
    apiUserConfirmationRequestWatcher,
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
