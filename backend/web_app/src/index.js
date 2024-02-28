import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bootstrap from 'bootstrap';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import loginApiReducer from './Redux/reducers/login';
import signupApiReducer from './Redux/reducers/signup';
import projectApiReducer from './Redux/reducers/project';
import sidebarReducer from './Redux/reducers/sidebar';

import loginRootSaga from './Redux/sagas/login';
import signupRootSaga from './Redux/sagas/signup';
import userInformationApiReducer from './Redux/reducers/user_information';
import userInformationRootSaga from './Redux/sagas/user_information';
import projectRootSaga from './Redux/sagas/project';
import shootApiReducer from './Redux/reducers/shoot';
import shootRootSaga from './Redux/sagas/shoot';
import inviteApiReducer from './Redux/reducers/invite';
import inviteRootSaga from './Redux/sagas/invite';
import gearApiReducer from './Redux/reducers/gear';
import gearRootSaga from './Redux/sagas/gear';
import tutorialReducer from 'Redux/reducers/tutorial';
import onboardingRootSaga from 'Redux/sagas/onboarding';
import onboardingReducer from 'Redux/reducers/onboarding';
import teamApiReducer from 'Redux/reducers/team';
import teamRootSaga from 'Redux/sagas/team';
import paymentApiReducer from 'Redux/reducers/payment';
import paymentRootSaga from 'Redux/sagas/payment';
import channelRootSaga from 'Redux/sagas/channel';
import channelApiReducer from 'Redux/reducers/channel';
import assetsRootSaga from 'Redux/sagas/assets';
import assetsApiReducer from 'Redux/reducers/assets';
import mediaRootSaga from 'Redux/sagas/media';
import mediaApiReducer from 'Redux/reducers/media';
import onlineStatusApiReducer from 'Redux/reducers/onlineStatus';
import onlineStatusRootSaga from 'Redux/sagas/onlineStatus';

const sagaMiddleware = createSagaMiddleware();

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['token', 'user', 'user_information', 'organisation_permission'],
};

const store = createStore(
  combineReducers({
    auth: persistReducer(authPersistConfig, loginApiReducer),
    signup: signupApiReducer,
    project: projectApiReducer,
    shoot: shootApiReducer,
    sidebar: sidebarReducer,
    userInformation: userInformationApiReducer,
    invite: inviteApiReducer,
    gear: gearApiReducer,
    tutorial: tutorialReducer,
    onboarding: onboardingReducer,
    team: teamApiReducer,
    payment: paymentApiReducer,
    channel: channelApiReducer,
    assets: assetsApiReducer,
    media: mediaApiReducer,
    onlineStatus: onlineStatusApiReducer,
  }),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

let persistor = persistStore(store);

sagaMiddleware.run(loginRootSaga);
sagaMiddleware.run(signupRootSaga);
sagaMiddleware.run(userInformationRootSaga);
sagaMiddleware.run(projectRootSaga);
sagaMiddleware.run(shootRootSaga);
sagaMiddleware.run(inviteRootSaga);
sagaMiddleware.run(gearRootSaga);
sagaMiddleware.run(onboardingRootSaga);
sagaMiddleware.run(teamRootSaga);
sagaMiddleware.run(paymentRootSaga);
sagaMiddleware.run(channelRootSaga);
sagaMiddleware.run(assetsRootSaga);
sagaMiddleware.run(mediaRootSaga);
sagaMiddleware.run(onlineStatusRootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
