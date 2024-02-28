import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { teamServices } from '../services/team';
import * as types from '../constants/team';
import * as actions from '../actions/team';

// List team
function* apiListTeam(action) {
  try {
    const result = yield call(teamServices.apiListTeam, action);

    yield put(actions.apiTeamListSuccess(result, action));
  } catch (err) {
    yield put(actions.apiTeamListFailed(err, action));
  }
}

function* apiTeamListWatcher() {
  yield takeEvery(types.API_TEAM_LIST_REQUEST, apiListTeam);
}
// List Other Members

function* apiListOtherMember(action) {
  try {
    const result = yield call(teamServices.apiListOtherMembers, action);
    yield put(actions.apiMembersListSuccess(result, action));
    yield put(actions.apiTeamListRequest(action.token));
  } catch (error) {
    yield put(actions.apiMembersListFailed(error, action));
  }
}
function* apiListOtherMembersWatcher() {
  yield takeEvery(types.API_MEMBERS_LIST_REQUEST, apiListOtherMember);
}

// post gears
// function* apiGearAssignedListWorker(action) {
//   try {
//     const result = yield call(gearServices.apiGearAssignedList, action);

//     yield put(actions.apiGearAssignedListSuccess(result, action));
//   } catch (err) {
//     yield put(actions.apiGearAssignedListFailed(err, action));
//   }
// }

// function* apiGearAssignedListWatcher() {
//   yield takeEvery(
//     types.API_GEAR_ASSIGN_LIST_REQUEST,
//     apiGearAssignedListWorker,
//   );
// }

// post Team Member
function* apiPostMemberAssign(action) {
  try {
    yield call(teamServices.apiMemberAssign, action);
    yield put(actions.apiTeamPostSuccess(action.token, action.id));
    yield put(actions.apiTeamListRequest(action.token));
  } catch (err) {
    yield put(actions.apiTeamPostFailed(err, action));
  }
}

function* apiPostMemberWatcher() {
  yield takeEvery(types.API_TEAM_POST_REQUEST, apiPostMemberAssign);
}

// Delete Team Member
function* apiDeleteMember(action) {
  try {
    yield call(teamServices.apiTeamDeleteMember, action);
    yield put(actions.apiTeamDeleteRequest(action.id, action.token));
    yield put(actions.apiTeamListRequest(action.token));
  } catch (err) {
    yield put(actions.apiTeamDeleteFailed(err, action));
  }
}

function* apiDeleteMemberWatcher() {
  yield takeEvery(types.API_TEAM_DELETE_REQUEST, apiDeleteMember);
}

// patch Team Member
function* apiPatchMemberAssign(action) {
  try {
    yield call(teamServices.apiPatchMember, action);
    yield put(actions.apiTeamMemberPatchSuccess(action.token, action.id));
    yield put(actions.apiTeamListRequest(action.token));
  } catch (err) {
    yield put(actions.apiTeamMemberPatchFailed(err, action));
  }
}

function* apiPatchMemberWatcher() {
  yield takeEvery(types.API_TEAM_PATCH_REQUEST, apiPatchMemberAssign);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* teamRootSaga() {
  const sagas = [
    apiTeamListWatcher,
    apiListOtherMembersWatcher,
    apiPostMemberWatcher,
    apiPatchMemberWatcher,
    apiDeleteMemberWatcher,
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
