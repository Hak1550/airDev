import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { mediaServices } from '../services/media';
import * as types from '../constants/media';
import * as actions from '../actions/media';
import { handleCopyObjectToWasabi } from 'Utils/mediaUtils';

// add collection
function* apiAddCollectionWorker(action) {
  try {
    const result = yield call(mediaServices.apiAddCollection, action);
    yield put(actions.apiAddCollectionSuccess(result, action));
    if (action.isUpdate)
      yield put(
        actions.apiGetCollectionByIdRequest(action.data.id, action.token),
      );
  } catch (err) {
    yield put(actions.apiAddCollectionFailed(err, action));
  }
}

function* apiAddCollectionWatcher() {
  yield takeEvery(types.API_ADD_COLLECTION_REQUEST, apiAddCollectionWorker);
}

// add collection Items
function* apiAddCollectionItemsWorker(action) {
  try {
    const result = yield call(mediaServices.apiAddCollectionItems, action);
    yield put(actions.apiAddCollectionItemsSuccess(result, action));
    yield put(
      actions.apiGetAllMediaRequest(action.token, action.organizationId),
    );
  } catch (err) {
    yield put(actions.apiAddCollectionItemsFailed(err, action));
  }
}

function* apiAddCollectionItemsWatcher() {
  yield takeEvery(
    types.API_ADD_COLLECTION_ITEMS_REQUEST,
    apiAddCollectionItemsWorker,
  );
}

// get all collections
function* apiGetAllCollectionsWorker(action) {
  try {
    const result = yield call(mediaServices.apiGetAllCollections, action);
    yield put(actions.apiGetAllCollectionsSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetAllCollectionsFailed(err, action));
  }
}

function* apiGetAllCollectionsWatcher() {
  yield takeEvery(
    types.API_GET_ALL_COLLECTIONS_REQUEST,
    apiGetAllCollectionsWorker,
  );
}

// delete collection items
function* apiDeleteCollectionItemsWorker(action) {
  const collectionId = action.data.collection;
  try {
    const result = yield call(mediaServices.apiDeleteCollectionItems, action);
    result.data.metadata.forEach(async element => {
      const collections = JSON.parse(element.metadata.collections);
      const updatedMetadata = {
        ...element.metadata,
        collections: JSON.stringify(
          collections.filter(item => item.id.toString() !== collectionId),
        ),
      };
      const s3Params = {
        Bucket: element.bucket,
        CopySource: `/${element.bucket}/${element.key}`,
        Key: element.key,
      };
      s3Params['Metadata'] = updatedMetadata;
      s3Params['MetadataDirective'] = 'REPLACE';
      await handleCopyObjectToWasabi(s3Params);
    });

    yield put(actions.apiDeleteCollectionItemsSuccess(result, action));
    yield put(
      actions.apiGetCollectionByIdRequest(action.data.collection, action.token),
    );
  } catch (err) {
    yield put(actions.apiDeleteCollectionItemsFailed(err, action));
  }
}

function* apiDeleteCollectionItemsWatcher() {
  yield takeEvery(
    types.API_DELETE_COLLECTION_ITEMS_REQUEST,
    apiDeleteCollectionItemsWorker,
  );
}

// delete collection
function* apiDeleteCollectionWorker(action) {
  try {
    const result = yield call(mediaServices.apiDeleteCollection, action);
    yield put(actions.apiDeleteCollectionSuccess(result, action));
    yield put(
      actions.apiGetAllCollectionsRequest(action.token, '', 1, 10, 'created'),
    );
  } catch (err) {
    yield put(actions.apiDeleteCollectionFailed(err, action));
  }
}

function* apiDeleteCollectionWatcher() {
  yield takeEvery(
    types.API_DELETE_COLLECTION_REQUEST,
    apiDeleteCollectionWorker,
  );
}

// get all media
function* apiGetAllMediaWorker(action) {
  try {
    const result = yield call(mediaServices.apiGetAllMedia, action);
    yield put(actions.apiGetAllMediaSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetAllMediaFailed(err, action));
  }
}

function* apiGetAllMediaWatcher() {
  yield takeEvery(types.API_GET_ALL_MEDIA_REQUEST, apiGetAllMediaWorker);
}

// delete media
function* apiDeleteMediaWorker(action) {
  try {
    const result = yield call(mediaServices.apiDeleteMedia, action);
    yield put(actions.apiDeleteMediaSuccess(result, action));
    yield put(
      actions.apiGetAllMediaRequest(action.token, action.organizationId),
    );
  } catch (err) {
    yield put(actions.apiDeleteMediaFailed(err, action));
  }
}

function* apiDeleteMediaWatcher() {
  yield takeEvery(types.API_DELETE_MEDIA_REQUEST, apiDeleteMediaWorker);
}

// get collections by id to project
function* apiGetCollectionByIdWorker(action) {
  try {
    const result = yield call(mediaServices.apiGetCollectionById, action);
    yield put(actions.apiGetCollectionByIdSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetCollectionByIdFailed(err, action));
  }
}

function* apiGetCollectionByIdWatcher() {
  yield takeEvery(
    types.API_GET_COLLECTION_BY_ID_REQUEST,
    apiGetCollectionByIdWorker,
  );
}

// get media by id to project
function* apiGetMediaDetailsWorker(action) {
  try {
    const result = yield call(mediaServices.apiGetMediaDetails, action);
    yield put(actions.apiGetMediaDetailsSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetMediaDetailsFailed(err, action));
  }
}

function* apiGetMediaDetailsWatcher() {
  yield takeEvery(
    types.API_GET_MEDIA_DETAILS_REQUEST,
    apiGetMediaDetailsWorker,
  );
}

// get media by id to project
function* apiGetClientsWorker(action) {
  try {
    const result = yield call(mediaServices.apiGetClients, action);
    yield put(actions.apiGetClientsSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetClientsFailed(err, action));
  }
}

function* apiGetClientsWatcher() {
  yield takeEvery(types.API_GET_CLIENTS_REQUEST, apiGetClientsWorker);
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* mediaRootSaga() {
  const sagas = [
    apiAddCollectionWatcher,
    apiGetAllCollectionsWatcher,
    apiGetCollectionByIdWatcher,
    apiAddCollectionItemsWatcher,
    apiGetAllMediaWatcher,
    apiDeleteMediaWatcher,
    apiGetMediaDetailsWatcher,
    apiGetClientsWatcher,
    apiDeleteCollectionItemsWatcher,
    apiDeleteCollectionWatcher,
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
