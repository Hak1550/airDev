import * as types from '../constants/payment';
import { mapErrorMessage } from '../../Utils/mapErrorMessage';
import { toast } from 'react-toastify';
import parseDjangoError from '../../Utils/parseDjangoError';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  defaultSuccess: false,
  postSuccess: false,
  error: null,
  data: null,
  paymentMethods: null,
  customerDetails: null,
  invoiceData: null,
};
let toastId = null;
export default function paymentApiReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // Add Payment Method
    case types.API_ADD_PAYMENT_METHOD_REQUEST:
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        postSuccess: false,
      };

    case types.API_ADD_PAYMENT_METHOD_SUCCESS:
      toast.update(toastId, {
        render: 'Payment Method Added Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      return {
        ...newState,
        isLoading: false,
        postSuccess: true,
        error: null,
        data: action.response.data,
      };

    case types.API_ADD_PAYMENT_METHOD_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data),
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      return {
        ...newState,
        isLoading: false,
        postSuccess: false,
        error: mapErrorMessage(action),
      };

    // Patch Payment Method
    case types.API_PATCH_PAYMENT_METHOD_REQUEST:
      toastId = toast.loading('Please wait...');
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_PATCH_PAYMENT_METHOD_SUCCESS:
      toast.update(toastId, {
        render: 'Payment Method Updated Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      return {
        ...newState,
        isLoading: false,
        postSuccess: true,
        error: null,
        data: action.response.data,
      };

    case types.API_PATCH_PAYMENT_METHOD_FAILED:
      toast.update(toastId, {
        render: parseDjangoError(action.response.response.data),
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      return {
        ...newState,
        isLoading: false,
        postSuccess: false,
        error: mapErrorMessage(action),
      };

    // Get ALL Payment Method
    case types.API_GET_ALL_PAYMENT_METHOD_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_GET_ALL_PAYMENT_METHOD_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        paymentMethods: action.response.data?.payment_methods,
        customerDetails: action.response.data?.customer,
      };

    case types.API_GET_ALL_PAYMENT_METHOD_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Get ALL Invoices
    case types.API_GET_ALL_INVOICES_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
      };

    case types.API_GET_ALL_INVOICES_SUCCESS:
      return {
        ...newState,
        isLoading: false,
        success: true,
        error: null,
        invoiceData: action.response.data,
      };

    case types.API_GET_ALL_INVOICES_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        isLoading: false,
        success: false,
        error: mapErrorMessage(action),
      };

    // Change Default Payment Method
    case types.API_CHANGE_DEFAULT_PAYMENT_METHOD_REQUEST:
      return {
        ...newState,
        isLoading: true,
        success: false,
        defaultSuccess: false,
      };

    case types.API_CHANGE_DEFAULT_PAYMENT_METHOD_SUCCESS:
      // toast.success('Payment Method Changes Successfully');
      return {
        ...newState,
        isLoading: false,
        error: null,
        defaultSuccess: true,
      };

    case types.API_CHANGE_DEFAULT_PAYMENT_METHOD_FAILED:
      toast.error(parseDjangoError(action.response.response.data));
      return {
        ...newState,
        isLoading: false,
        defaultSuccess: false,
        error: mapErrorMessage(action),
      };

    case types.RESET_PAYMENT:
      return {
        ...newState,
        isLoading: false,
        success: false,
        defaultSuccess: false,
        postSuccess: false,
        error: null,
        data: null,
      };

    default:
      return newState;
  }
}
