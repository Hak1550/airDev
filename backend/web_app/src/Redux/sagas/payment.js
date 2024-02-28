import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import * as types from '../constants/payment';
import * as actions from '../actions/payment';
import { paymentServices } from 'Redux/services/payment';

// Add Payment Method
function* apiAddPaymentMethodWorker(action) {
  try {
    const result = yield call(paymentServices.apiAddPaymentMethod, action);
    yield put(actions.apiAddPaymentMethodSuccess(result, action));
  } catch (err) {
    yield put(actions.apiAddPaymentMethodFailed(err, action));
  }
}

function* apiAddPaymentMethodWatcher() {
  yield takeEvery(
    types.API_ADD_PAYMENT_METHOD_REQUEST,
    apiAddPaymentMethodWorker,
  );
}

// Patch Payment Method
function* apiPatchPaymentMethodWorker(action) {
  try {
    const result = yield call(paymentServices.apiPatchPaymentMethod, action);
    yield put(actions.apiPatchPaymentMethodSuccess(result, action));
  } catch (err) {
    yield put(actions.apiPatchPaymentMethodFailed(err, action));
  }
}

function* apiPatchPaymentMethodWatcher() {
  yield takeEvery(
    types.API_PATCH_PAYMENT_METHOD_REQUEST,
    apiPatchPaymentMethodWorker,
  );
}

// Get All Payment Method
function* apiGetAllPaymentMethodWorker(action) {
  try {
    const result = yield call(paymentServices.apiGetAllPaymentMethod, action);
    yield put(actions.apiGetAllPaymentMethodSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetAllPaymentMethodFailed(err, action));
  }
}

function* apiGetAllPaymentMethodWatcher() {
  yield takeEvery(
    types.API_GET_ALL_PAYMENT_METHOD_REQUEST,
    apiGetAllPaymentMethodWorker,
  );
}

// Get All invoice
function* apiGetAllInvoicesWorker(action) {
  try {
    const result = yield call(paymentServices.apiGetAllInvoices, action);
    yield put(actions.apiGetAllInvoicesSuccess(result, action));
  } catch (err) {
    yield put(actions.apiGetAllInvoicesFailed(err, action));
  }
}

function* apiGetAllInvoicesWatcher() {
  yield takeEvery(types.API_GET_ALL_INVOICES_REQUEST, apiGetAllInvoicesWorker);
}

// Change Default Payment Method
function* apiChangeDefaultPaymentMethodWorker(action) {
  try {
    const result = yield call(
      paymentServices.apiChangeDefaultPaymentMethod,
      action,
    );
    yield put(actions.apiChangeDefaultPaymentMethodSuccess(result, action));
  } catch (err) {
    yield put(actions.apiChangeDefaultPaymentMethodFailed(err, action));
  }
}

function* apiChangeDefaultPaymentMethodWatcher() {
  yield takeEvery(
    types.API_CHANGE_DEFAULT_PAYMENT_METHOD_REQUEST,
    apiChangeDefaultPaymentMethodWorker,
  );
}

// Read more information about root sagas in the documentation
// https://redux-saga.js.org/docs/advanced/RootSaga.html
export default function* paymentRootSaga() {
  const sagas = [
    apiAddPaymentMethodWatcher,
    apiGetAllPaymentMethodWatcher,
    apiChangeDefaultPaymentMethodWatcher,
    apiPatchPaymentMethodWatcher,
    apiGetAllInvoicesWatcher,
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
