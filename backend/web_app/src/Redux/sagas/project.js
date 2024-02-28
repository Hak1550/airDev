import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { projectServices } from '../services/project';
import * as types from '../constants/project';
import * as actions from '../actions/project';

// Get projects
function* apiGetProjectWorker(action) {
  try {
    const result = yield call(projectServices.apiGetProject, action);

    yield put(actions.apiProjectGetSuccess(result, action));
  } catch (err) {
    yield put(actions.apiProjectGetFailed(err, action));
  }
}

function* apiGetProjectWatcher() {
  yield takeEvery(types.API_PROJECT_GET_REQUEST, apiGetProjectWorker);
}

// Get archive projects
function* apiGetArchiveProjectWorker(action) {
  try {
    const result = yield call(projectServices.apiGetProject, action);

    yield put(actions.apiArchiveProjectGetSuccess(result, action));
  } catch (err) {
    yield put(actions.apiArchiveProjectGetFailed(err, action));
  }
}

function* apiGetArchiveProjectWatcher() {
  yield takeEvery(
    types.API_ARCHIVE_PROJECT_GET_REQUEST,
    apiGetArchiveProjectWorker,
  );
}

// post projects
function* apiPostProjectWorker(action) {
  try {
    const result = yield call(projectServices.apiPostProject, action);

    yield put(actions.apiProjectPostSuccess(result, action));
  } catch (err) {
    yield put(actions.apiProjectPostFailed(err, action));
  }
}

function* apiPostProjectWatcher() {
  yield takeEvery(types.API_PROJECT_POST_REQUEST, apiPostProjectWorker);
}

function* apiPostDuplicateProjectWorker(action) {
  try {
    const result = yield call(projectServices.apiPostDuplicateProject, action);

    yield put(actions.apiProjectPostSuccess(result, action));
  } catch (err) {
    yield put(actions.apiProjectPostFailed(err, action));
  }
}

function* apiPostDuplicateProjectWatcher() {
  yield takeEvery(
    types.API_DUPLICATE_PROJECT_POST_REQUEST,
    apiPostDuplicateProjectWorker,
  );
}

// patch project
function* apiPatchProjectWorker(action) {
  try {
    const result = yield call(projectServices.apiPatchProject, action);
    yield put(actions.apiProjectPatchSuccess(result, action));
  } catch (err) {
    yield put(actions.apiProjectPatchFailed(err, action));
  }
}

function* apiPatchProjectWatcher() {
  yield takeEvery(types.API_PROJECT_PATCH_REQUEST, apiPatchProjectWorker);
}

// delete project
function* apiDeleteProjectWorker(action) {
  try {
    yield call(projectServices.apiDeleteProject, action);
    yield put(actions.apiProjectDeleteSuccess(action.project_id));
  } catch (err) {
    yield put(actions.apiProjectDeleteFailed(err, action));
  }
}

function* apiDeleteProjectWatcher() {
  yield takeEvery(types.API_PROJECT_DELETE_REQUEST, apiDeleteProjectWorker);
}

// add member to project
function* apiAddMemberWorker(action) {
  try {
    const result = yield call(projectServices.apiAddMember, action);
    yield put(actions.apiProjectGetRequest(action.token));
    yield put(actions.apiAddMemberSuccess(result, action));
  } catch (err) {
    yield put(actions.apiAddMemberFailed(err, action));
  }
}

function* apiAddMemberWatcher() {
  yield takeEvery(types.API_ADD_MEMBER_REQUEST, apiAddMemberWorker);
}

// remove member from project
function* apiRemoveMemberWorker(action) {
  try {
    const result = yield call(projectServices.apiRemoveMember, action);
    yield put(actions.apiProjectGetRequest(action.token));
    yield put(actions.apiRemoveMemberSuccess(result, action));
  } catch (err) {
    yield put(actions.apiRemoveMemberFailed(err, action));
  }
}

function* apiRemoveMemberWatcher() {
  yield takeEvery(types.API_REMOVE_MEMBER_REQUEST, apiRemoveMemberWorker);
}

// add external links to project
function* apiAddExternalLinksWorker(action) {
  try {
    const result = yield call(projectServices.apiAddExternalLinks, action);
    yield put(
      actions.apiGetProjectLinksRequest(action.data?.project_id, action.token),
    );
    yield put(actions.apiAddProjectLinksSuccess(result, action));
  } catch (err) {
    yield put(actions.apiAddProjectLinksFailed(err, action));
  }
}

function* apiAddExternalLinksWatcher() {
  yield takeEvery(
    types.API_ADD_PROJECT_LINKS_REQUEST,
    apiAddExternalLinksWorker,
  );
}

// get external links to project
function* apiGetExternalLinksWorker(action) {
  try {
    const result = yield call(projectServices.apiGetExternalLinks, action);
    yield put(actions.apiGetProjectLinksSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetProjectLinksFailed(err, action));
  }
}

function* apiGetExternalLinksWatcher() {
  yield takeEvery(
    types.API_GET_PROJECT_LINKS_REQUEST,
    apiGetExternalLinksWorker,
  );
}

// delete project Liks
function* apiDeleteProjectLinksWorker(action) {
  try {
    yield call(projectServices.apiDeleteExternalLinks, action);
    yield put(actions.apiProjectLinksDeleteSuccess(action.project_id));
  } catch (err) {
    yield put(actions.apiProjectLinksDeleteFailed(err, action));
  }
}

function* apiDeleteProjectLinksWatcher() {
  yield takeEvery(
    types.API_DELETE_PROJECT_LINKS_REQUEST,
    apiDeleteProjectLinksWorker,
  );
}

// add project files to project
function* apiAddProjectFilesWorker(action) {
  try {
    const result = yield call(projectServices.apiAddProjectFiles, action);
    yield put(
      actions.apiGetProjectFilesRequest(action.data?.project_id, action.token),
    );
    yield put(actions.apiAddProjectFilesSuccess(result, action));
  } catch (err) {
    yield put(actions.apiAddProjectLinksFailed(err, action));
  }
}

function* apiAddProjectFilesWatcher() {
  yield takeEvery(
    types.API_ADD_PROJECT_FILES_REQUEST,
    apiAddProjectFilesWorker,
  );
}

// get project files to project
function* apiGetProjectFilesWorker(action) {
  try {
    const result = yield call(projectServices.apiGetProjectFiles, action);
    yield put(actions.apiGetProjectFilesSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetProjectFilesFailed(err, action));
  }
}

function* apiGetProjectFilesWatcher() {
  yield takeEvery(
    types.API_GET_PROJECT_FILES_REQUEST,
    apiGetProjectFilesWorker,
  );
}

// delete project Files
function* apiDeleteProjectFilesWorker(action) {
  try {
    yield call(projectServices.apiDeleteProjectFiles, action);
    yield put(actions.apiProjectFilesDeleteSuccess(action.project_id));
  } catch (err) {
    yield put(actions.apiProjectFilesDeleteFailed(err, action));
  }
}

function* apiDeleteProjectFilesWatcher() {
  yield takeEvery(
    types.API_DELETE_PROJECT_FILES_REQUEST,
    apiDeleteProjectFilesWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* projectRootSaga() {
  const sagas = [
    apiGetProjectWatcher,
    apiPostProjectWatcher,
    apiPostDuplicateProjectWatcher,
    apiPatchProjectWatcher,
    apiDeleteProjectWatcher,
    apiAddMemberWatcher,
    apiRemoveMemberWatcher,
    apiAddExternalLinksWatcher,
    apiGetExternalLinksWatcher,
    apiGetArchiveProjectWatcher,
    apiAddProjectFilesWatcher,
    apiGetProjectFilesWatcher,
    apiDeleteProjectFilesWatcher,
    apiDeleteProjectLinksWatcher,
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
