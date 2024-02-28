import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { channelServices } from '../services/channel';
import * as types from '../constants/channel';
import * as actions from '../actions/channel';

// add comms to project
function* apiAddCommsWorker(action) {
  try {
    const result = yield call(channelServices.apiAddComms, action);
    if (action.isOrg) {
      yield put(actions.apiGetCommsRequest(null, action.token, true));
      yield put(
        actions.apiGetCommsRequest(action.data?.project_id, action.token),
      );
    } else {
      yield put(
        actions.apiGetCommsRequest(action.data?.project_id, action.token),
      );
      yield put(actions.apiAddCommsSuccess(result, action));
      if (
        action.data?.comms[0]?.type !== 'multi_view' &&
        action.data?.comms[0]?.type !== 'program_feed'
      )
        window.location.href = '/project/comms/' + action.data?.project_id;
    }
  } catch (err) {
    yield put(actions.apiAddCommsFailed(err, action));
  }
}

function* apiAddCommsWatcher() {
  yield takeEvery(types.API_ADD_COMMS_REQUEST, apiAddCommsWorker);
}
// patch comms to project
function* apiPatchCommsWorker(action) {
  try {
    const result = yield call(channelServices.apiPatchComms, action);
    if (action.isOrg)
      yield put(actions.apiGetCommsRequest(null, action.token, true));
    else yield put(actions.apiGetCommsRequest(action.project_id, action.token));
    yield put(actions.apiPatchCommsSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPatchCommsFailed(err, action));
  }
}

function* apiPatchCommsWatcher() {
  yield takeEvery(types.API_PATCH_COMMS_REQUEST, apiPatchCommsWorker);
}

// get comms to project
function* apiGetCommsWorker(action) {
  try {
    const result = yield call(channelServices.apiGetComms, action);
    yield put(actions.apiGetCommsSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetCommsFailed(err, action));
  }
}

function* apiGetCommsWatcher() {
  yield takeEvery(types.API_GET_COMMS_REQUEST, apiGetCommsWorker);
}
// get comms by id to project
function* apiGetCommsByIdWorker(action) {
  try {
    const result = yield call(channelServices.apiGetCommsById, action);
    yield put(actions.apiGetCommsByIdSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetCommsByIdFailed(err, action));
  }
}

function* apiGetCommsByIdWatcher() {
  yield takeEvery(types.API_GET_COMMS_BY_ID_REQUEST, apiGetCommsByIdWorker);
}

// delete project Comms
function* apiDeleteCommsWorker(action) {
  try {
    yield call(channelServices.apiDeleteComms, action);
    yield put(actions.apiCommsDeleteSuccess(action.project_id));
    yield put(actions.apiGetCommsRequest(action.project_id, action.token));
  } catch (err) {
    yield put(actions.apiCommsDeleteFailed(err, action));
  }
}

function* apiDeleteCommsWatcher() {
  yield takeEvery(types.API_DELETE_COMMS_REQUEST, apiDeleteCommsWorker);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* channelRootSaga() {
  const sagas = [
    apiAddCommsWatcher,
    apiGetCommsWatcher,
    apiDeleteCommsWatcher,
    apiGetCommsByIdWatcher,
    apiPatchCommsWatcher,
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
