import axios from 'axios';
import { auth } from './auth';
import _ from 'lodash';
import { appConfig } from '../Config/app';

class ResponseError extends Error {
  constructor(message, data) {
    super(message);
    this.name = '';
    this.data = data;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response, getResponseHeaders = false) {
  console.log('Response : ', response);
  if (response.status === 200 || response.status === 204) {
    if (getResponseHeaders) return [response.data, response.headers];
    else return response?.data;
  } else {
    throw new ResponseError(
      response?.data?.detail ? response?.data?.detail : 'Something went wrong.',
      response?.data,
    );
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function handleError(response) {
  const error = response;
  throw new ResponseError('', {
    status: error,
    message: 'apiErrorMessage',
  });
}
/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */

const customRequest = axios.create({
  baseURL: appConfig.API_BASE_URL,
  validateStatus: function (status) {
    return !!(
      (status >= 200 && status < 300) ||
      status === 422 ||
      status === 403 ||
      status === 500 ||
      status === 400
    );
  },
});

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(
  url,
  requestConfig = {},
  getResponseHeaders = false,
) {
  const token = auth.getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers['Authorization'] = 'Token ' + token;
  }

  requestConfig.headers = _.omitBy(
    {
      ...requestConfig.headers,
      ...headers,
    },
    _.isNil,
  );

  return customRequest(url, requestConfig)
    .then(response => parseJSON(response, getResponseHeaders))
    .catch(handleError);
}
