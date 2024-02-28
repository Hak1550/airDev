import React, { useState, useEffect } from 'react';
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
  SBMSDiv4,
  SBMSDiv5,
  SBMSImg,
  SBMSInput2,
  SDMHeading,
  SDMHeadingP,
  SDMHeadingPWhite,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../styles';
import cross from '../../../Assets/images/cross.png';
import time from '../../../Assets/images/time.png';
import binWhite from '../../../Assets/images/binWhite.png';
import tick from '../../../Assets/images/tick.png';
import Select, { components } from 'react-select';
import {
  DropDownIconContainer,
  OptionText,
  SelectedValueContainer,
} from '../../../Components/CommonStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGearPostRequest,
  apiGetCameraDetailRequest,
  clearcameraDetails,
} from 'Redux/actions/gear';
import { apiGetAllAssetsRequest } from 'Redux/actions/assets';

const OnboardCamera = ({ onChangeRightNav, editUser, setOnboardForm }) => {
  const auth = useSelector(state => state.auth);
  const gears = useSelector(state => state.gear);
  const dispatch = useDispatch();
  const [airID, setAirId] = useState('');
  let organisation = auth.user_information.organisation_data[0].organisation.id;

  const [optionSelect, setoptionSelect] = useState(editUser?.role);
  const [internal_record, set_internal_record] = useState({
    part1: '',
    part2: '',
    part3: '',
  });
  const [external_record, set_external_record] = useState({
    part1: '',
    part2: '',
    part3: '',
  });
  let internal_rec_format = '';
  let external_rec_format = '';
  const [formObj, setFormObj] = useState({
    owner_name: '',
  });
  const [errorTxt, setErrorTxt] = useState('');
  const [error, setError] = useState({
    air_id: false,
    nick_name: false,
    internal_record: false,
    external_record: false,
  });
  const checkCameraValidity = e => {
    const val = e.target.value
      .replace(/^([A-Za-z0-9]{4})$/g, '$1-')
      .replace(/^([A-Za-z0-9]{4}-[A-Za-z0-9]{4})$/g, '$1-');
    setAirId(val);
    setFormObj(prev => ({ ...prev, air_id: val }));
  };

  const onConfirm = () => {
    if (!formObj.nick_name) {
      setError(prev => ({ ...prev, nick_name: true }));
      setErrorTxt('This field is required');
      return;
    }
    if (!formObj.air_id) {
      setError(prev => ({ ...prev, air_id: true }));
      setErrorTxt('This field is required');
      return;
    }
    if (formObj.air_id.length !== 14) {
      setError(prev => ({ ...prev, air_id: true }));
      setErrorTxt('Please Pass valid Air Id');
      return;
    }
    if (gears?.cameraDetailsErr) {
      setError(prev => ({ ...prev, air_id: true }));
      setErrorTxt('Please Pass valid Air Id');
      return;
    }
    if (formObj?.internal_record_format) {
      if (
        !internal_record.part1 ||
        !internal_record.part2 ||
        !internal_record.part3
      ) {
        setError(prev => ({ ...prev, internal_record: true }));
        setErrorTxt('Internal record format is not valid');
        return;
      }
    }
    if (formObj?.external_stream_format) {
      if (
        !external_record.part1 ||
        !external_record.part2 ||
        !external_record.part3
      ) {
        setError(prev => ({ ...prev, external_record: true }));
        setErrorTxt('External record format is not valid');
        return;
      }
    }

    // closeSideBar();
    onChangeRightNav('cameraPackages');
    formObj['organisation'] = organisation;
    setOnboardForm(formObj);
    dispatch(clearcameraDetails());

    // console.log('organisation ONB', formObj);
  };

  const closeSideBar = () => {
    onChangeRightNav('');
    dispatch(clearcameraDetails());
  };

  useEffect(() => {
    if (formObj?.air_id?.length < 14) {
      error.air_id = false;
      setErrorTxt('');
    } else if (formObj?.nick_name) {
      error.nick_name = false;
      setErrorTxt('');
    }
  }, [formObj?.air_id, formObj?.nick_name]);

  useEffect(() => {
    if (
      internal_record.part1 ||
      internal_record.part2 ||
      internal_record.part3
    ) {
      setError(prev => ({ ...prev, internal_record: false }));
      error.internal_record = false;
      setErrorTxt('');
    }
    if (external_record) {
      error.external_record = false;
      setErrorTxt('');
    }
  }, [internal_record, external_record]);

  useEffect(() => {
    if (gears?.cameraDetails) {
      setFormObj(prev => ({
        ...prev,
        owner_name: gears?.cameraDetails?.owner_name,
        lan_ip: gears?.cameraDetails?.lan_ip,
        public_ip: gears?.cameraDetails?.public_ip,
      }));
      console.log('gears?.cameraDetails', gears?.cameraDetails);
    } else if (gears?.cameraDetailsErr) {
      // console.log('gears?.cameraDetailsErr', gears?.cameraDetailsErr, error);
      error.air_id = true;
      setErrorTxt(gears?.cameraDetailsErr);
      setFormObj(prev => ({
        ...prev,
        owner_name: '',
        lan_ip: '',
        public_ip: '',
      }));
    }
  }, [gears?.cameraDetails, gears?.cameraDetailsErr]);

  useEffect(() => {
    if (formObj?.air_id?.length >= 14) {
      dispatch(apiGetCameraDetailRequest(formObj?.air_id, auth.token));
    }
  }, [formObj?.air_id]);

  const cameraOptions = [{ value: 'air_one', label: 'AIR One' }];
  const Rec_Format_Options1 = [
    { value: '1080', label: '1080' },
    { value: '4k', label: '4k' },
  ];
  const Rec_Format_Options2 = [
    { value: 'p25', label: 'p25' },
    { value: 'p30', label: 'p30' },
    { value: 'p50', label: 'p50' },
    { value: 'p60', label: 'p60' },
    { value: '25', label: '25' },
    { value: '30', label: '30' },
    { value: '50', label: '50' },
    { value: '60', label: '60' },
  ];

  const int_Rec_Format_Options3 = [
    { value: 'ProRes', label: 'ProRes' },
    { value: 'ProResHQ', label: 'ProResHQ' },
  ];

  const ext_Rec_Format_Options3 = [
    { value: 'h.264', label: 'h.264' },
    { value: 'h.265', label: 'h.265' },
  ];

  useEffect(() => {
    internal_rec_format = `${internal_record.part1}/${internal_record.part2}/${internal_record.part3}`;
    if (
      internal_record.part1 ||
      internal_record.part2 ||
      internal_record.part3
    ) {
      setFormObj(prev => ({
        ...prev,
        internal_record_format: internal_rec_format,
      }));
    }
  }, [internal_record]);

  useEffect(() => {
    external_rec_format = `${external_record.part1}/${external_record.part2}/${external_record.part3}`;
    if (
      external_record.part1 ||
      external_record.part2 ||
      external_record.part3
    ) {
      setFormObj(prev => ({
        ...prev,
        external_stream_format: external_rec_format,
      }));
    }
  }, [external_record]);

  const customRoleStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#344054',
      width: '100%',
      backgroundColor: '#fff',
    }),
    control: () => ({
      width: '90%',
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

  const airTypeStyles = {
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
  return (
    <RightNavContainer>
      {/* =========================Header=================================== */}
      <RightNavContainerX onClick={closeSideBar}>
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      <SideBarMainDiv>
        <SDMHeading>Onboard Camera</SDMHeading>
        {/* =========================Body=================================== */}
        <RightNavSecDiv>
          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Camera Type:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={optionSelect}
                // onChange={handleRoleFilter}
                options={cameraOptions}
                placeholder={editUser?.role ? editUser?.role : 'Air One'}
                styles={airTypeStyles}
                // onChange={e => setoptionSelect(e.label)}
                // onChange={e => setFormObj(prev=> ({...prev,type: e.label}))}
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
                readOnly
                value={formObj.owner_name}
                // onChange={e =>
                //   setFormObj(prev => ({ ...prev, owner_name: e.target.value }))
                // }
                // defaultValue={editUser?.user_info.first_name}
                style={{ color: '#667085' }}
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
                  setFormObj(prev => ({ ...prev, nick_name: e.target.value }))
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
            <SDMHeadingP>Lan IP</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="-"
                readOnly
                maxLength={30}
                value={formObj.lan_ip}
                onChange={e =>
                  setFormObj(prev => ({ ...prev, lan_ip: e.target.value }))
                }

                // defaultValue={editUser?.user_info.email}
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Public IP</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                readOnly
                placeholder="-"
                maxLength={30}
                value={formObj.public_ip}
                onChange={e =>
                  setFormObj(prev => ({ ...prev, public_ip: e.target.value }))
                }

                // defaultValue={editUser?.user_info.email}
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>AIR ID</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="0000-0000-0000"
                maxLength={14}
                // onChange={() => set}
                value={airID}
                onChange={checkCameraValidity}

                // defaultValue={editUser?.user_info.email}
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

          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Internal Record Format:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                onChange={e => {
                  set_internal_record(prev => ({
                    ...prev,
                    part1: e.label,
                  }));
                }}
                options={Rec_Format_Options1}
                placeholder={'Format'}
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
              <Select
                onChange={e => {
                  set_internal_record(prev => ({
                    ...prev,
                    part2: e.label,
                  }));
                }}
                options={Rec_Format_Options2}
                placeholder={'Format'}
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
              <Select
                onChange={e => {
                  set_internal_record(prev => ({
                    ...prev,
                    part3: e.label,
                  }));
                }}
                options={int_Rec_Format_Options3}
                placeholder={'Format'}
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
            </SBMSDiv3a>
            {error.internal_record && (
              <div>
                <p style={{ color: 'red', marginTop: 3, fontSize: 14 }}>
                  {errorTxt}
                </p>
              </div>
            )}
          </div>
          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>External Stream Format:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                onChange={e => {
                  set_external_record(prev => ({
                    ...prev,
                    part1: e.label,
                  }));
                }}
                options={Rec_Format_Options1}
                placeholder={'Format'}
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
              <Select
                onChange={e => {
                  set_external_record(prev => ({
                    ...prev,
                    part2: e.label,
                  }));
                }}
                options={Rec_Format_Options2}
                placeholder={'Format'}
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
              <Select
                onChange={e => {
                  set_external_record(prev => ({
                    ...prev,
                    part3: e.label,
                  }));
                }}
                options={ext_Rec_Format_Options3}
                placeholder={'Format'}
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
            </SBMSDiv3a>
            {error.external_record && (
              <div>
                <p style={{ color: 'red', marginTop: 3, fontSize: 14 }}>
                  {errorTxt}
                </p>
              </div>
            )}
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

export default OnboardCamera;
