import useQuery from 'hooks/useQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { apiCheckInvitationRequest, resetInvite } from 'Redux/actions/invite';
import { apiAddMemberRequest } from 'Redux/actions/project';
import { apiUpdateUserPermission } from 'Redux/actions/shoot';

import SignupPage from '../../Pages/SignupPage';
import { apiSignupRequest, setSuccess } from '../../Redux/actions/signup';

const SignupContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state.signup);
  const auth = useSelector(state => state.auth);
  const invite = useSelector(state => state.invite);
  const params = useQuery();
  const token_id = params.get('token_id');

  useEffect(() => {
    if (auth.token) {
      history.push('/');
    }

    if (state.success) {
      dispatch(setSuccess(false));
      history.push('/login');
    }
  }, [auth, state, history]);

  useEffect(() => {
    if (token_id) dispatch(apiCheckInvitationRequest(token_id));
    else dispatch(resetInvite());
  }, [params]);

  useEffect(() => {
    if (invite.isValidInvitations === false) {
      history.push('/signup');
      dispatch(resetInvite());
    }
  }, [invite.isValidInvitations]);

  const onSubmit = data => {
    delete data['check_visibility'];
    if (token_id && invite?.isValidInvitations)
      data['invitation_token'] = token_id;
    dispatch(apiSignupRequest(data));
  };
  return (
    <SignupPage
      state={state}
      onSubmit={onSubmit}
      email={invite?.invitedData?.email}
    />
  );
};

export default SignupContainer;
