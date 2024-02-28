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

function apiAddCollection(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  if (action.isUpdate)
    return authAPI.patch(
      `/api/v1/organisation/collection/${action.data.id}/`,
      action.data,
      {
        headers,
      },
    );
  return authAPI.post(`/api/v1/organisation/collection/`, action.data, {
    headers,
  });
}

function apiAddCollectionItems(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(
    `/api/v1/organisation/add-collection-items/`,
    action.data,
    {
      headers,
    },
  );
}

function apiGetAllCollections(action) {
  const { search, ordering, page, pageSize } = action;
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  let url = `/api/v1/organisation/collection/?${
    search ? 'search=' + encodeURIComponent(search) : ''
  }&ordering=${encodeURIComponent(ordering)}${
    pageSize ? '&page_size=' + pageSize : ''
  }${page ? '&page=' + page : ''}`;
  return authAPI.get(url, {
    headers,
  });
}

function apiGetCollectionById(action) {
  const { search, ordering, created__lte, created__gte, page, page_size, id } =
    action;
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  let url = `/api/v1/organisation/collection/${id}/get-collection-items/?search=${encodeURIComponent(
    search,
  )}&ordering=${encodeURIComponent(ordering)}&page_size=${page_size}${
    created__lte !== null ? '&created__lte=' + created__lte : ''
  }${created__gte !== null ? '&created__gte=' + created__gte : ''}${
    page ? '&page=' + page : ''
  }`;

  return authAPI.get(url, {
    headers,
  });
}

function apiGetMediaDetails(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };

  return authAPI.get(
    `/api/v1/organisation/${action.organizationId}/asset-details/${action.key}/`,
    {
      headers,
    },
  );
}

function apiGetAllMedia(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(
    `/api/v1/organisation/${action.organizationId}/get-bucket-objects/`,
    {
      headers,
    },
  );
}

function apiGetClients(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.get(
    `/api/v1/organisation/${action.organizationId}/get-clients/`,
    {
      headers,
    },
  );
}

function apiDeleteMedia(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(
    `/api/v1/organisation/${action.organizationId}/delete-bucket-objects/`,
    action.keys,
    {
      headers,
    },
  );
}

function apiDeleteCollectionItems(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.post(
    `/api/v1/organisation/delete-collection-items/`,
    action.data,
    {
      headers,
    },
  );
}

function apiDeleteCollection(action) {
  const headers = {
    Accept: 'application/json',
    Authorization: `Token ${action.token}`,
  };
  return authAPI.delete(
    `/api/v1/organisation/collection/${action?.data?.id}/`,
    {
      headers,
    },
  );
}

export const mediaServices = {
  apiDeleteCollection,
  apiAddCollection,
  apiGetAllCollections,
  apiGetCollectionById,
  apiAddCollectionItems,
  apiGetAllMedia,
  apiDeleteMedia,
  apiGetMediaDetails,
  apiGetClients,
  apiDeleteCollectionItems,
};
