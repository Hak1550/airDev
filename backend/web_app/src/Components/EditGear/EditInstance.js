import React, { useState } from 'react';
import {
  Btn2,
  EditCamTimeImg,
  OptionsValueContainer,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  RightNavLine,
  RightNavSecDiv,
  RNCFBtn,
  RNCFBtn2,
  SBMSDiv3,
  SBMSDiv3a,
  SBMSDiv5,
  SBMSInput2,
  SDMHeading,
  SDMHeadingP,
  SDMHeadingPWhite,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from './styles';
import cross from '../../Assets/images/cross.png';
import binWhite from '../../Assets/images/binWhite.png';
import tick from '../../Assets/images/tick.png';
import Select, { components } from 'react-select';
import {
  DropDownIconContainer,
  OptionText,
  SelectedValueContainer,
} from '../../Components/CommonStyles';

const EditInstance = ({
  editInstance,
  setSideNavPage,
  onGearEditApi,
  closeSideBar,
  ...props
}) => {
  const [instance, setInstance] = useState(editInstance);
  const [optionSelect, setoptionSelect] = useState(editInstance?.role);
  const regionOptions = [
    { value: 'us-east-2', label: 'US East (Ohio)' },
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-1', label: 'US West (N. CA)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'ca-central-1', label: 'Canada (Central)' },
    { value: 'eu-central-1', label: 'Europe (Frankfurt)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'eu-west-2', label: 'Europe (London)' },
    { value: 'eu-west-3', label: 'Europe (Paris)' },
    { value: 'eu-south-1', label: 'Europe (Milan)' },
    { value: 'eu-north-1', label: 'Europe (Stockholm)' },
  ];

  // console.log(
  //   'instance',
  //   instance,
  //   regionOptions.filter(f => f.value === instance.instance_regioin)[0]?.label,
  // );

  const typeOptions = [
    { value: 'VIMIX_MAIN', label: 'vMix Main' },
    { value: 'VIMIX_REPLY', label: 'vMix Replay' },
    { value: 'SRT_GATEWAY', label: 'SRT Gateway' },
  ];

  const sizeOptions = [
    { value: 'SMALL', label: 'Small' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LARGE', label: 'Large' },
    { value: 'XL', label: 'X-Large' },
  ];
  const customRoleStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#344054',
      width: '100%',
      backgroundColor: '#fff',
    }),
    control: () => ({
      width: '100%',
      display: 'flex',
      border: '1px solid #D0D5DD',
      borderRadius: 8,
      height: 44,
      fontWeight: 400,
      color: '#344054',
      fontSize: 16,
      fontFamily: 'Inter',
    }),
    container: base => ({
      ...base,
      flex: 1,
    }),
  };

  const ValueContainer = props => {
    return (
      <components.Option {...props}>
        <OptionsValueContainer>
          <OptionText>{props.data.label}</OptionText>
          {props.data.label === optionSelect || props.isSelected ? (
            <img src={tick} style={{ width: 13.33, height: 9.17 }} />
          ) : null}
        </OptionsValueContainer>
      </components.Option>
    );
  };

  const DropDownIcon = props => (
    <DropDownIconContainer>
      <svg width={12} height={8} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m1 1.5 5 5 5-5"
          stroke="#667085"
          strokeWidth={1.667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </DropDownIconContainer>
  );
  // console.log('editInstance', editInstance);

  return (
    <RightNavContainer>
      {/* =========================Header=================================== */}
      <RightNavContainerX onClick={closeSideBar}>
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      <SideBarMainDiv>
        <SDMHeading>Edit Instance</SDMHeading>
        {/* =========================Body=================================== */}
        <RightNavSecDiv>
          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Instance Type:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={{
                  label: instance?.instance_type
                    ? typeOptions.filter(
                        f => f.value === instance?.instance_type,
                      )[0]?.label
                    : '',
                  value: instance?.instance_type ? instance?.instance_type : '',
                }}
                // onChange={handleRoleFilter}
                options={typeOptions}
                placeholder={'Instance Type'}
                styles={customRoleStyles}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    instance_type: e.value,
                  }))
                }
                // onChange={e => setoptionSelect(e.label)}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
            </SBMSDiv3a>
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Vmix License Number</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Enter License"
                maxLength={30}
                defaultValue={instance?.vmix_licence_number}
                style={{ color: '#667085' }}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    vmix_licence_number: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Instance Region</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={{
                  label: instance?.instance_regioin
                    ? regionOptions.filter(
                        f => f.value === instance?.instance_regioin,
                      )[0]?.label
                    : '',
                  value: instance?.instance_regioin
                    ? instance?.instance_regioin
                    : '',
                }}
                // onChange={handleRoleFilter}
                // onChange={e => setoptionSelect(e.label)}
                options={regionOptions}
                placeholder={'Select Region'}
                styles={customRoleStyles}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    instance_regioin: e.value,
                  }))
                }
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
            </SBMSDiv3a>
          </div>

          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Size</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={{
                  label: instance?.instance_size
                    ? sizeOptions.filter(
                        f => f.value === instance?.instance_size,
                      )[0]?.label
                    : '',
                  value: instance?.instance_size ? instance?.instance_size : '',
                }}
                // onChange={handleRoleFilter}
                options={sizeOptions}
                placeholder={'Size'}
                styles={customRoleStyles}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    instance_size: e.value,
                  }))
                }
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
            </SBMSDiv3a>
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Owner</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Owner"
                maxLength={30}
                defaultValue={instance?.owner_name}
                style={{ color: '#667085' }}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    owner_name: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Nickname</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Enter Nickname"
                maxLength={30}
                defaultValue={instance?.nick_name}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    nick_name: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Current Project Assigned</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Enter Project"
                maxLength={30}
                // defaultValue={editInstance?.user_info.email}
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>AIR ID</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="ID 0000000-B"
                maxLength={30}
                readOnly
                defaultValue={instance?.air_id}
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>PUBLIC IP</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="-"
                maxLength={30}
                readOnly
                defaultValue={instance?.public_ip}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    public_ip: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>LAN IP</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="-"
                maxLength={30}
                readOnly
                defaultValue={instance?.lan_ip}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    lan_ip: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>
          {/* -------------------- For Edit Component ----------------- */}
          <RightNavLine />
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Expiration Date</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="12/01/2022"
                maxLength={30}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    public_ip: e.target.value,
                  }))
                }
                // defaultValue={editInstance?.user_info.email}
              />
            </SBMSDiv3>
          </div>

          <SBMSDiv5>
            <EditCamTimeImg src={binWhite} />
            <SDMHeadingPWhite>Deactivate Instance</SDMHeadingPWhite>
          </SBMSDiv5>
        </RightNavSecDiv>
      </SideBarMainDiv>
      {/* =========================Footer=================================== */}
      <RightNavContainerFoot>
        <RNCFBtn>
          <TeamHeadBtnImgP onClick={closeSideBar}>Cancel</TeamHeadBtnImgP>
        </RNCFBtn>
        <RNCFBtn2>
          <TeamHeadBtnImgPa
            onClick={() => {
              onGearEditApi(instance);
              closeSideBar();
            }}
          >
            Confirm
          </TeamHeadBtnImgPa>
        </RNCFBtn2>
      </RightNavContainerFoot>
    </RightNavContainer>
  );
};

export default EditInstance;
