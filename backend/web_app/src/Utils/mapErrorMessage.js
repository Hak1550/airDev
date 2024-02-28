import { auth } from './auth';

const messageMap = {
  'Request failed with status code 400': {
    code: 400,
    message: 'Request failed with status code 400',
  },
  'Request failed with status code 401': {
    code: 401,
    message: 'Request failed with status code 401',
  },
  'Request failed with status code 403': {
    code: 403,
    message: 'You do not have access to this resource.',
  },
  'Request failed with status code 500': {
    code: 500,
    message: 'Unexpected Server Error.',
  },
  'Network Error': {
    code: null,
    message: 'Please check your internet connection.',
  },
};

export const mapErrorMessage = action => {
  const message = action.response?.message;
  console.log('mes : ', message);
  if (messageMap[message]) {
    let code = messageMap[message].code;

    if (code === 401) {
      auth.logout();
      window.location.replace('/login');
    }

    if (action.type === 'API_CONTACT_US_REQUEST_FAILED' && code === 400) {
      return {
        code,
        message: 'Error: Unable to submit the inquiry.',
        type: action.type,
      };
    } else if (action.type === 'API_LOGIN_REQUEST_FAILED' && code === 400) {
      return {
        code,
        message: 'Unable to login with the provided credentials',
        type: action.type,
      };
    } else {
      let errors =
        action.response.response.data.email || action.response.response.data;
      let errorsList = [];

      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          const element = errors[key];
          if (typeof element === 'string') {
            errorsList.push(element);
          } else if (typeof element === 'object') {
            Object.keys(element).forEach(k => {
              errorsList.push(element[k]);
            });
          }
        }
      }

      return { code, message: errorsList, type: action.type };
    }
  } else {
    console.log('ascc : ', action);
    return { code: null, message, type: action.type };
  }
};
