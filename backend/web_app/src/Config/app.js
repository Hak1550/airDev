export const appConfig = {
  API_BASE_URL: window.location.hostname.includes('staging')
    ? 'https://advanced-image-robo-32-staging.botics.co'
    : !window.location.hostname.includes('localhost')
    ? 'http://localhost:8000'
    : 'https://advanced-image-robo-32516.botics.co', // uncomment before deploy
  // : 'https://advanced-image-robo-32-staging.botics.co', // remove  before deploy

  defaultTimeout: 5000,
};

// export const appConfig = {
//   API_BASE_URL:
//     process.env.REACT_APP_ENV === 'staging'
//       ? 'https://advanced-image-robo-32-staging.botics.co'
//       : process.env.REACT_APP_ENV === 'production'
//       ? 'https://advanced-image-robo-32516.botics.co'
//       : 'http://localhost:8000',

//   defaultTimeout: 5000,
// };
