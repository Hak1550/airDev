import React from 'react';
import { CenterDiv } from '../../Components/CommonStyles';
import DashboardLayout from '../../Layouts/DashboardLayout';
import niceDCV from '../../Assets/images/niceDCV.png';
import { Link, useParams } from 'react-router-dom';
import CameraLayout from '../../Layouts/CameraControlLayout';

const VirtualWorkstationPage = () => {
  const { project_id } = useParams();
  const links = [
    {
      title: 'Virtual Workstation',
      href: `/project/virtual-workstation/${project_id}`,
    },
  ];
  return (
    <DashboardLayout>
      <CameraLayout links={links}>
        <CenterDiv>
          <Link to={{ pathname: 'dcv://' }} target="_blank">
            <img src={niceDCV} alt="Nice DCV" />
          </Link>
        </CenterDiv>
      </CameraLayout>
    </DashboardLayout>
  );
};

export default VirtualWorkstationPage;
