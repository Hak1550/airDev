import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiGetCommsRequest } from 'Redux/actions/channel';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Main from './Main';

const MultiviewPage = () => {
  const channelState = useSelector(state => state.channel);
  const auth = useSelector(state => state.auth);
  const { project_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGetCommsRequest(project_id, auth.token));
  }, []);

  return (
    <DashboardLayout>
      <Main state={channelState} project_id={project_id} />
    </DashboardLayout>
  );
};

export default MultiviewPage;
