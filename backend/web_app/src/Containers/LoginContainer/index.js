import useQuery from 'hooks/useQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { apiUserConfirmationRequest } from 'Redux/actions/signup';

import LoginPage from '../../Pages/LoginPage';
import { apiLoginRequest, setLoginCallBack } from '../../Redux/actions/login';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const loginCallback = useSelector(state => state.auth.loginCallback);
  const params = useQuery();
  const confirmation_token = params.get('confirmation_token');

  useEffect(() => {
    if (confirmation_token)
      dispatch(apiUserConfirmationRequest(confirmation_token));
  }, [params]);

  useEffect(() => {
    if (auth.token) {
      if (loginCallback) {
        history.push(loginCallback);
        dispatch(setLoginCallBack(null));
      } else {
        // if (auth?.user_information?.first_login) history.push('/');
        // else history.push('/settings/account-details');
        if (auth?.user_information?.first_login) window.location.replace('/');
        else window.location.replace('/settings/account-details');
      }
    }
  }, [auth, history]);

  const onSubmit = data => {
    delete data['remember_me']; // not implemented
    dispatch(apiLoginRequest(data));
  };

  return <LoginPage auth={auth} onSubmit={onSubmit} />;
};

export default LoginContainer;
