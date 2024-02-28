import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiGetAllAssetsRequest } from 'Redux/actions/assets';
import { apiGetMyAssets } from 'Redux/actions/user_information';
import { getObjectByLowestValue } from 'Utils/permissions';
import Loader from '../../Components/Loader';
import DashboardLayout from '../../Layouts/DashboardLayout';
import {
  apiDeleteBackground,
  apiRemoveUserPermissions,
  apiShootGetRequest,
  apiShootPatchRequest,
} from '../../Redux/actions/shoot';
import { hideSideBarPage } from '../../Redux/actions/sidebar';
import GetStarted from './GetStarted';
import Main from './Main';
import Resizer from 'react-image-file-resizer';
import { LoaderDiv } from './Main/styles';

const ShootSetupPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const shootState = useSelector(state => state.shoot);
  const sidebarState = useSelector(state => state.sidebar);
  const [isGetStartedSkipped, setIsGetStartedSkipped] = useState(false);
  const [myRole, setMyRole] = useState(null);
  const [editShoot, setEditShoot] = useState(false);
  const { project_id } = useParams();
  const assets = useSelector(state => state.assets);
  const allGears = assets?.allGears;

  useEffect(() => {
    dispatch(
      apiGetAllAssetsRequest(
        auth.token,
        sidebarState?.selectedProject?.organisation?.id,
      ),
    );
  }, []);

  const onSkip = () => {
    setIsGetStartedSkipped(true);
  };

  const selectProjectDetails = sidebarState?.selectedProject;
  // console.log('selectProjectDetails', selectProjectDetails);
  const allowedPermissions =
    selectProjectDetails &&
    getObjectByLowestValue(selectProjectDetails?.permission_obj, 'role')
      ?.allowed_permissions;

  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri);
        },
        'base64',
      );
    });

  const onImageSelected = async (e, id) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);

      const data = {
        background_image_base64: image,
        background_image_name: file.name,
      };
      if (id) {
        data['shoot_image_id'] = id;
      }
      dispatch(apiShootPatchRequest(data, shootState.shoot?.id, auth.token));
    } catch (err) {
      console.log('err', err);
    }
  };

  const onImageDelete = (shoot_image_id, project_id) => {
    dispatch(apiDeleteBackground(shoot_image_id, project_id, auth.token));
  };

  useEffect(() => {
    dispatch(apiShootGetRequest(auth.token, project_id));
  }, [project_id, editShoot]);
  return (
    <DashboardLayout>
      {shootState.isPageLoading || shootState.isLoading ? (
        <LoaderDiv style={{}}>
          <Loader />
          <p>
            Please wait... <br />
            It may take a few seconds for everything to load.
          </p>
        </LoaderDiv>
      ) : shootState.shoot?.background_image || isGetStartedSkipped ? (
        <Main
          state={shootState}
          project_id={project_id}
          onImageSelected={onImageSelected}
          onImageDelete={onImageDelete}
          myRole={myRole}
          myPermission={allowedPermissions}
          editShoot={editShoot}
          setEditShoot={setEditShoot}
          allGears={allGears}
          selectProjectDetails={selectProjectDetails}
        />
      ) : (
        <GetStarted
          onImageSelected={onImageSelected}
          onSkip={onSkip}
          myPermission={allowedPermissions}
        />
      )}
    </DashboardLayout>
  );
};

export default ShootSetupPage;
