import React from 'react';
import { CenterDiv } from '../../Components/CommonStyles';
import DashboardLayout from '../../Layouts/DashboardLayout';
import airTrafficControl from '../../Assets/images/airTrafficControl.png';
import { Link, useParams } from 'react-router-dom';
import CameraLayout from '../../Layouts/CameraControlLayout';

const RoutingPage = () => {
  const { project_id } = useParams();
  const links = [
    {
      title: 'Routing',
      href: `/project/routing/${project_id}`,
    },
  ];
  return (
    <DashboardLayout>
      <CameraLayout links={links}>
        <CenterDiv>
          <Link
            to={{ pathname: 'http://54.193.180.58/routes' }}
            target="_blank"
          >
            <img
              src={airTrafficControl}
              alt="AIR traffic control"
              height={700}
            />
          </Link>
        </CenterDiv>
      </CameraLayout>
    </DashboardLayout>
  );
};

export default RoutingPage;
