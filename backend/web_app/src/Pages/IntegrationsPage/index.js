import Loader from 'Components/Loader';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetCommsRequest } from 'Redux/actions/channel';
import Main from './Main';

const IntegrationsPage = ({ auth, userInformation }) => {
  const channelState = useSelector(state => state.channel);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGetCommsRequest(null, auth.token, true));
  }, []);
  return channelState?.isLoading ? (
    <Loader />
  ) : (
    <Main state={channelState} auth={auth} userInformation={userInformation} />
  );
};

export default IntegrationsPage;
