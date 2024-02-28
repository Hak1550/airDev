import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import * as types from '../constants/onboarding';
import * as actions from '../actions/onboarding';
import { onboardingServices } from 'Redux/services/onboarding';

// Get user information
function* apiVerifyAirIdWorker(action) {
  try {
    const result = yield call(onboardingServices.apiVerifyAirId, action);

    yield put(actions.apiVerifyAirIdSuccess(result, action));
  } catch (err) {
    yield put(actions.apiVerifyAirIdFailed(err, action));
  }
}

function* apiVerifyAirIdWatcher() {
  yield takeEvery(types.API_IS_AIR_VALID, apiVerifyAirIdWorker);
}

// create organization
function* apiCreateOrganizationWorker(action) {
  try {
    const result = yield call(onboardingServices.apiCreateOrganization, action);

    yield put(actions.createOrganizationSuccess(result, action));
  } catch (err) {
    yield put(actions.createOrganizationFailed(err, action));
  }
}

function* apiCreateOrganizationWatcher() {
  yield takeEvery(types.API_CREATE_ORG, apiCreateOrganizationWorker);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* onboardingRootSaga() {
  const sagas = [apiVerifyAirIdWatcher, apiCreateOrganizationWatcher];

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
