import React, { useState, useEffect } from 'react';
import {
  Btn2,
  OptionsValueContainer,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  RightNavSecDiv,
  RNCFBtn,
  RNCFBtn2,
  SBMSDiv3,
  SBMSDiv3a,
  SBMSImg,
  SBMSInput2,
  SDMHeading,
  SDMHeadingP,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../styles';
import cross from '../../../Assets/images/cross.png';
import edit from '../../../Assets/images/editWhite.png';
import tick from '../../../Assets/images/tick.png';
import Select, { components } from 'react-select';
import {
  DropDownIconContainer,
  OptionText,
  SelectedValueContainer,
} from '../../../Components/CommonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { apiGearPostRequest } from 'Redux/actions/gear';
import { apiGetAllAssetsRequest } from 'Redux/actions/assets';

const OnboardInstance = ({ onChangeRightNav, editUser }) => {
  const [instance, setInstance] = useState({});
  const [errorTxt, setErrorTxt] = useState('');
  const [error, setError] = useState({
    nick_name: false,
    air_id: false,
    instance_size: false,
    instance_type: false,
  });

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let organisation_id =
    auth.user_information.organisation_data[0].organisation.id;

  const closeSideBar = () => {
    onChangeRightNav('');
  };

  const onConfirm = () => {
    if (!instance.instance_type) {
      setError(prev => ({ ...prev, instance_type: true }));
      setErrorTxt('This field is required');
      return;
    }

    if (!instance.instance_size) {
      setError(prev => ({ ...prev, instance_size: true }));
      setErrorTxt('This field is required');
      return;
    }

    if (!instance.nick_name) {
      setError(prev => ({ ...prev, nick_name: true }));
      setErrorTxt('This field is required');
      return;
    }

    if (!instance.air_id) {
      setError(prev => ({ ...prev, air_id: true }));
      setErrorTxt('This field is required');
      return;
    }
    closeSideBar();
    instance['organisation'] = organisation_id;
    // console.log('instance', instance);
    // console.log('organisation', JSON.stringify(instance));
    dispatch(apiGearPostRequest(instance, auth.token, '2'));
    dispatch(apiGetAllAssetsRequest(auth.token));
  };
  useEffect(() => {
    setError(prev => ({
      ...prev,
      nick_name: false,
      air_id: false,
      instance_size: false,
      instance_type: false,
    }));
    setErrorTxt('');
  }, [
    instance?.nick_name,
    instance?.air_id,
    instance?.instance_size,
    instance?.instance_type,
  ]);

  // let { closeSideBar, editUser } = props;
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
      width: '90%',
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
  const [optionSelect, setoptionSelect] = useState(editUser?.role);
  const [manageProjects, setManageProjects] = useState(false);
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

  const nameChangeHandler = e => {
    const reg = /^([^$%,./<>?;':"`~\_=+(\*&^%$#@!|)]*)$/;
    if (reg.test(e.target.value)) {
      setInstance(prev => ({
        ...prev,
        vmix_licence_number: e.target.value,
      }));
    }
  };

  return (
    <RightNavContainer>
      {/* =========================Header=================================== */}
      <RightNavContainerX onClick={closeSideBar}>
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      <SideBarMainDiv>
        <SDMHeading>Onboard Instance</SDMHeading>
        {/* =========================Body=================================== */}
        <RightNavSecDiv>
          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Instance Type:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={optionSelect}
                // onChange={handleRoleFilter}
                options={typeOptions}
                placeholder={editUser?.role ? editUser?.role : 'Instance Type'}
                styles={customRoleStyles}
                // onChange={e => setoptionSelect(e.label)}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    instance_type: e.value,
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
            {error.instance_type && (
              <div>
                <p style={{ color: 'red', marginTop: 3, fontSize: 14 }}>
                  {errorTxt}
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Vmix License Number</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Enter License"
                maxLength={30}
                defaultValue={editUser?.owner_name}
                value={instance?.vmix_licence_number}
                style={{ color: '#667085' }}
                onChange={nameChangeHandler}
              />
            </SBMSDiv3>
          </div>

          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Instance Region</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={optionSelect}
                // onChange={handleRoleFilter}
                options={regionOptions}
                placeholder={editUser?.role ? editUser?.role : 'Select Region'}
                styles={customRoleStyles}
                // onChange={e => setoptionSelect(e.label)}
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
            <SDMHeadingP>Size:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={optionSelect}
                // onChange={handleRoleFilter}
                options={sizeOptions}
                placeholder={editUser?.role ? editUser?.role : 'Instance Size'}
                styles={customRoleStyles}
                // onChange={e => setoptionSelect(e.label)}
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
            {error.instance_size && (
              <div>
                <p style={{ color: 'red', marginTop: 3, fontSize: 14 }}>
                  {errorTxt}
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Owner</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Owner"
                maxLength={30}
                // defaultValue={editUser?.user_info.first_name}
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
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    nick_name: e.target.value,
                  }))
                }
                // defaultValue={editUser?.user_info.last_name}
              />
            </SBMSDiv3>
            {error.nick_name && (
              <div>
                <p style={{ color: 'red', marginTop: 3, fontSize: 14 }}>
                  {errorTxt}
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Current Project Assigned</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Enter Project"
                maxLength={30}
                // defaultValue={editUser?.user_info.email}
                // onChange={e =>
                //   setInstance(prev => ({
                //     ...prev,
                //     owner_name: e.target.value,
                //   }))
                // }
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>AIR ID</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="ID 0192847502-B"
                maxLength={30}
                // defaultValue={editUser?.user_info.email}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    air_id: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
            {error.air_id && (
              <div>
                <p style={{ color: 'red', marginTop: 3, fontSize: 14 }}>
                  {errorTxt}
                </p>
              </div>
            )}
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>PUBLIC IP</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="-"
                maxLength={30}
                readOnly
                // defaultValue={editUser?.user_info.email}
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
                readOnly
                maxLength={30}
                onChange={e =>
                  setInstance(prev => ({
                    ...prev,
                    lan_ip: e.target.value,
                  }))
                }
                // defaultValue={editUser?.user_info.email}
              />
            </SBMSDiv3>
          </div>
        </RightNavSecDiv>
      </SideBarMainDiv>
      {/* =========================Footer=================================== */}
      <RightNavContainerFoot>
        <RNCFBtn>
          <TeamHeadBtnImgP onClick={closeSideBar}>Cancel</TeamHeadBtnImgP>
        </RNCFBtn>
        <RNCFBtn2>
          <TeamHeadBtnImgPa onClick={onConfirm}>Confirm</TeamHeadBtnImgPa>
        </RNCFBtn2>
      </RightNavContainerFoot>
    </RightNavContainer>
  );
};

export default OnboardInstance;
