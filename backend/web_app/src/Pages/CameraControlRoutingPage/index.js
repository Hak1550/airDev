import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { apiGetRelatedGear, setRelatedGearId } from '../../Redux/actions/shoot';
import { CenterDiv } from '../../Components/CommonStyles';
import DashboardLayout from '../../Layouts/DashboardLayout';
import CameraLayout from '../../Layouts/CameraControlLayout';

export default function CameraControlRoutingPage() {
  const params = queryString.parse(window.location.search);
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const relatedGearId = useSelector(state => state.shoot.relatedGearId);
  useEffect(() => {
    if (!auth.token) {
      history.push('/login');
    }
  }, [auth]);
  useEffect(() => {
    if (params.id) {
      if (!relatedGearId) {
        dispatch(
          apiGetRelatedGear({
            air_id: params.id,
            token: auth.token,
          }),
        );
      } else {
        history.push('/project/' + relatedGearId.id);
        dispatch(setRelatedGearId(null));
      }
    } else {
      history.push('/');
    }
  }, [params, relatedGearId]);

  return (
    <DashboardLayout>
      <CameraLayout links={[]}>
        <CenterDiv></CenterDiv>
      </CameraLayout>
    </DashboardLayout>
  );
}
