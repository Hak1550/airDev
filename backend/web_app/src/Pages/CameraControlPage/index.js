import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { apiShootGetRequest } from '../../Redux/actions/shoot';
import { hideSideBarPage } from '../../Redux/actions/sidebar';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Main from './Main';

const CameraControlPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const shootState = useSelector(state => state.shoot);
  const { project_id } = useParams();

  // useEffect(() => {
  //   if (shootState.shoot?.background_image) {
  //     dispatch(hideSideBarPage());
  //   }
  // }, [shootState.shoot]);

  useEffect(() => {
    dispatch(apiShootGetRequest(auth.token, project_id));
  }, [project_id]);

  return (
    <DashboardLayout>
      <Main state={shootState} project_id={project_id} />
    </DashboardLayout>
  );
};

export default CameraControlPage;
