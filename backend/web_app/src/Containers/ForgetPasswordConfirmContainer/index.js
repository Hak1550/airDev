import useQuery from 'hooks/useQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ForgetPasswordConfirmPage from '../../Pages/ForgetPasswordConfirmPage';
import { apiPasswordResetConfirmRequest } from '../../Redux/actions/login';

const ForgetPasswordConfirmContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useQuery();
  const auth = useSelector(state => state.auth);
  const token = params.get('token_id');

  useEffect(() => {
    if (auth.token) {
      history.push('/dashboard');
    }
    if (auth.success) {
      history.push('/login');
    }
  }, [auth, history]);

  const onSubmit = data => {
    data['token'] = token;
    dispatch(apiPasswordResetConfirmRequest(data));
  };

  return <ForgetPasswordConfirmPage auth={auth} onSubmit={onSubmit} />;
};

export default ForgetPasswordConfirmContainer;
