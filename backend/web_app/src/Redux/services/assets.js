import axios from 'axios';
import { appConfig } from '../../Config/app';

const authAPI = axios.create({
  baseURL: appConfig.API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const dataToFormData = data => {
  const formData = new FormData();
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      formData.append(key, element);
    }
  }

  return formData;
};

function apiGetAllAssetsRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  // console.log('all services', action);
  // let type = parseInt(type);

  // let url = `/api/v1/user/my-assets${`?user=${encodeURIComponent(search)}`}${
  //   type === null || type === NaN || type === ''
  //     ? ''
  //     : `&type=${encodeURIComponent(type)}`
  // }${page ? '&page=' + page : ''}${selectAll ? '&all=' + 1 : ''}`;

  return authAPI.get(
    `/api/v1/user/my-assets/${
      action.organisation_id ? '?organisation_id=' + action.organisation_id : ''
    }`,
    { headers },
  );
}

function apiGetInstanceUsageRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(`/api/v1/user/instance-usage/`, { headers });
}

function apiGetStoragePlanServiceRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(`/api/v1/user/my-storage-plan/`, { headers });
}

function apiWasabiUsedStorageService(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(
    `/api/v1/organisation/${action.id}/wasabi-bucket-storage-size/`,
    { headers },
  );
}

function apiGetAvailablePkgServiceRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  // data==> stripe_price_id
  // data==> mode
  // data==> quantity

  return authAPI.get(`/api/v1/payment/package/`, { headers });
}

function apiCreatePaymentServiceRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(`/api/v1/payment/create-payment-session/`, action.data, {
    headers,
  });
}

function apiSamePkgServiceRequest(action) {
  const headers = {
    // Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  // data==> subscription_item_id
  const formData = dataToFormData(action.data);

  console.log('service', action);
  return authAPI.post(`/api/v1/payment/update-subscription-item/`, formData, {
    headers,
  });
}

function apiNewPkgServiceRequest(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  // data==> subscription_id
  // data==> stripe_price_id
  const formData = dataToFormData(action.data);

  return authAPI.post(`/api/v1/payment/add-new-subscription-item/`, formData, {
    headers,
  });
}

export const assetsServices = {
  apiGetAllAssetsRequest,
  apiGetStoragePlanServiceRequest,
  apiWasabiUsedStorageService,
  apiCreatePaymentServiceRequest,
  apiSamePkgServiceRequest,
  apiNewPkgServiceRequest,
  apiGetAvailablePkgServiceRequest,
  apiGetInstanceUsageRequest,
};
