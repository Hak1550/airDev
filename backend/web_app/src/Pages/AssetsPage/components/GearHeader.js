import React, { useState } from 'react';
import { GearHeaderMain } from '../styles';
import Cameras from './Cameras';
import Storage from './Storage';
import CloudInstances from './CloudInstances';
const GearHeader = ({
  onChangeRightNav,
  cameraCount,
  instanceCount,
  assets,
  storage,
}) => {
  const [inviteView, setInviteView] = useState(false);
  return (
    <GearHeaderMain>
      <Storage
        onChangeRightNav={onChangeRightNav}
        assets={assets}
        storage={storage}
      />
      <Cameras
        onChangeRightNav={onChangeRightNav}
        cameraCount={cameraCount}
        assets={assets}
      />
      <CloudInstances
        onChangeRightNav={onChangeRightNav}
        instanceCount={instanceCount}
        assets={assets}
      />
    </GearHeaderMain>
  );
};

export default GearHeader;
