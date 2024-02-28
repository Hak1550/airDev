import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { inviteServices } from '../services/invite';
import * as types from '../constants/invite';
import * as actions from '../actions/invite';

// invite
function* apiInviteRequestWorker(action) {
  try {
    const result = yield call(inviteServices.apiInviteRequest, action);
    yield put(actions.apiInviteRequestSuccess(result, action));
  } catch (err) {
    yield put(actions.apiInviteRequestFailed(err, action));
  }
}

function* apiInviteRequestWatcher() {
  yield takeEvery(types.API_INVITE_REQUEST, apiInviteRequestWorker);
}

function* apiCheckInvitationRequestWorker(action) {
  try {
    const result = yield call(inviteServices.apiCheckInvitation, action);
    yield put(actions.apiCheckInvitationSuccess(result, action));
  } catch (err) {
    yield put(actions.apiCheckInvitationFailed(err, action));
  }
}

function* apiCheckInvitationRequestWatcher() {
  yield takeEvery(
    types.API_CHECK_INVITATION_REQUEST,
    apiCheckInvitationRequestWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* inviteRootSaga() {
  const sagas = [apiInviteRequestWatcher, apiCheckInvitationRequestWatcher];

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
