import React from 'react';
import {
  ComponentDiv,
  ComponentMainHeading,
  ComponentMainValue,
  ComponentPara,
  ComponentRightNavLink,
  ComponentSeparator,
  GearDiv1,
  GearDiv2,
  GearHeaderDiv,
} from '../styles';
const Cameras = ({ onChangeRightNav, cameraCount }) => {
  return (
    <GearHeaderDiv>
      <GearDiv1>
        <ComponentDiv>
          <ComponentMainHeading>Cameras</ComponentMainHeading>
        </ComponentDiv>
        <ComponentDiv>
          <ComponentPara>Total cameras active on your plan.</ComponentPara>
        </ComponentDiv>
        <ComponentMainValue>{cameraCount ? cameraCount : 0}</ComponentMainValue>
      </GearDiv1>
      <GearDiv2>
        <ComponentSeparator>
          <ComponentRightNavLink
            onClick={() => onChangeRightNav('onboardCamera')}
          >
            + Onboard Camera
          </ComponentRightNavLink>
        </ComponentSeparator>
      </GearDiv2>
    </GearHeaderDiv>
  );
};

export default Cameras;
