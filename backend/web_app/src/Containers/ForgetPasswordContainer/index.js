import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ForgetPasswordPage from '../../Pages/ForgetPasswordPage';
import { apiPasswordResetRequest } from '../../Redux/actions/login';

const ForgetPasswordContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.token) {
      history.push('/dashboard');
    }
  }, [auth, history]);

  const onSubmit = data => {
    dispatch(apiPasswordResetRequest(data.email));
  };

  return <ForgetPasswordPage auth={auth} onSubmit={onSubmit} />;
};

export default ForgetPasswordContainer;
