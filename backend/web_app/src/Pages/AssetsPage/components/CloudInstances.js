import React from 'react';
import {
  ComponentBorderDiv,
  ComponentBorderPara,
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
const CloudInstances = ({ onChangeRightNav, instanceCount, assets }) => {
  return (
    <GearHeaderDiv>
      <GearDiv1>
        <ComponentDiv>
          <ComponentMainHeading>Cloud Compute Instances</ComponentMainHeading>
        </ComponentDiv>
        <ComponentDiv>
          <ComponentPara>
            Total Cloud Compute Instances on your plan.
          </ComponentPara>
        </ComponentDiv>
        <ComponentMainValue>
          {instanceCount ? instanceCount : 0}
        </ComponentMainValue>
        {assets?.allGears?.instance.length > 0 && (
          <>
            <ComponentBorderDiv>
              <ComponentBorderPara>
                Currently used {assets?.instanceUsageDetails?.usage_this_month}{' '}
                hours this month
              </ComponentBorderPara>
            </ComponentBorderDiv>
            <ComponentBorderDiv>
              <ComponentBorderPara>
                Currently used {assets?.instanceUsageDetails?.usage_this_year}{' '}
                hours this year
              </ComponentBorderPara>
            </ComponentBorderDiv>
          </>
        )}
      </GearDiv1>
      <GearDiv2>
        <ComponentSeparator>
          <ComponentRightNavLink
            onClick={() => onChangeRightNav('onboardInstance')}
          >
            + Onboard Instance
          </ComponentRightNavLink>
        </ComponentSeparator>
      </GearDiv2>
    </GearHeaderDiv>
  );
};

export default CloudInstances;
