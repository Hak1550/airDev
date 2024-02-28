import React, { useState } from 'react';
import {
  RNCFBtn,
  RNCFBtn2,
  SBMSDiv3,
  SBMSDiv3a,
  SBMSInput2,
  SDMHeading,
  SDMHeadingP,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  RightNavSecDiv,
  TeamHeadBtnImgPa,
  OptionsValueContainer,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  SBMSDiv4,
  SBMSDiv5,
  SDMHeadingPWhite,
  RightNavLine,
  EditCamTimeImg,
} from './styles';
import cross from '../../Assets/images/cross.png';
import binWhite from '../../Assets/images/binWhite.png';
import time from '../../Assets/images/time.png';
import tick from '../../Assets/images/tick.png';
import errorIcon from '../../Assets/icons/errorIcon.svg';
import Select, { components } from 'react-select';
import {
  DropDownIconContainer,
  OptionText,
  SelectedValueContainer,
} from '../CommonStyles';
import moment from 'moment';
import { useEffect } from 'react';
import Modal from '../../Components/Modal';
import { ModalFooter } from '../../Components/CommonStyles';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGetCameraDeactivateRequest,
  apiGetCameraDetailRequest,
} from 'Redux/actions/gear';
import { toast } from 'react-toastify';

const EditCamera = ({
  editCamera,
  setSideNavPage,
  onGearEditApi,
  closeSideRightNav,
  closeSideBar,
  ...props
}) => {
  const cameraOptions = [{ value: 'air_one', label: 'AIR One' }];
  const dispatch = useDispatch();
  let internal_rec_format = '';
  let external_rec_format = '';
  const auth = useSelector(state => state.auth);
  const gear = useSelector(state => state.gear);
  const cameraDetails = useSelector(state => state.cameraDetails);
  const [camera, setCamera] = useState(editCamera);
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

  const customRoleStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#344054',
      width: '25%',
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
  const typeStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#344054',
      width: '25%',
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
  // ================ Owner  Name ===========================
  // useEffect(() => {
  //   if (gear?.cameraDetails) {
  //     editCamera.owner_name = cameraDetails;
  //   }
  // }, [gear?.cameraDetails]);

  useEffect(() => {
    const air_id_here = editCamera.air_id
      ? editCamera.air_id
      : editCamera.camera.air_id;
    if (editCamera?.camera?.air_id && auth) {
      dispatch(apiGetCameraDetailRequest(air_id_here, auth.token));
    } else if (!editCamera?.owner_name && auth) {
      dispatch(apiGetCameraDetailRequest(air_id_here, auth.token));
    }
  }, []);

  useEffect(() => {
    if (gear?.cameraDetails) {
      setCamera(prev => ({
        ...prev,
        owner_name: gear?.cameraDetails.owner,
        lan_ip: gear?.cameraDetails.lan_ip,
        public_ip: gear?.cameraDetails.public_ip,
      }));
    }
  }, [gear?.cameraDetails]);
  // =================================================

  useEffect(() => {
    internal_rec_format = `${internal_record.part1}/${internal_record.part2}/${internal_record.part3}`;
    if (
      internal_record.part1 ||
      internal_record.part2 ||
      internal_record.part3
    ) {
      setCamera(prev => ({
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
      setCamera(prev => ({
        ...prev,
        external_stream_format: external_rec_format,
      }));
    }
  }, [external_record]);

  useEffect(() => {
    if (
      camera?.organisation_owned_camera?.internal_record_format !== '' ||
      camera?.camera?.internal_record_format !== ''
    ) {
      set_internal_record({
        part1: editCamera?.camera
          ? editCamera?.internal_record_format.split('/')[0]
          : editCamera?.organisation_owned_camera?.internal_record_format.split(
              '/',
            )[0],
        part2: editCamera?.camera
          ? editCamera?.internal_record_format.split('/')[1]
          : editCamera?.organisation_owned_camera?.internal_record_format.split(
              '/',
            )[1],
        part3: editCamera?.camera
          ? editCamera?.internal_record_format.split('/')[2]
          : editCamera?.organisation_owned_camera?.internal_record_format.split(
              '/',
            )[2],
      });
    }
    if (
      editCamera?.external_stream_format !== '' ||
      editCamera?.camera?.external_stream_format !== ''
    ) {
      set_external_record({
        part1: editCamera?.camera
          ? editCamera?.external_stream_format.split('/')[0]
          : editCamera?.organisation_owned_camera?.external_stream_format.split(
              '/',
            )[0],
        part2: editCamera?.camera
          ? editCamera?.external_stream_format.split('/')[1]
          : editCamera?.organisation_owned_camera?.external_stream_format.split(
              '/',
            )[1],
        part3: editCamera?.camera
          ? editCamera?.external_stream_format.split('/')[2]
          : editCamera?.organisation_owned_camera?.external_stream_format.split(
              '/',
            )[2],
      });
    }
  }, []);

  const ValueContainer = props => {
    return (
      <components.Option {...props}>
        <OptionsValueContainer>
          <OptionText>{props.data.label}</OptionText>
          {props.data.label === props.isSelected ? (
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
  // ================== De-Activate Modal ===============
  const deactivateCamera = () => {
    let isPaid = editCamera.organisation_owned_camera
      ? editCamera.organisation_owned_camera.is_paid
      : editCamera.is_paid;
    let isActive = editCamera.organisation_owned_camera
      ? editCamera.organisation_owned_camera.is_active
      : editCamera.is_active;
    if (!isActive && !isPaid) {
      setShowModal(false);
      closeSideBar();
      let toastId = null;
      toastId = toast.loading('Please wait...');

      toast.update(toastId, {
        render: 'Camera is neither active nor payment flow is completed ',
        type: 'error',
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      return;
    }
    if (!isActive) {
      setShowModal(false);
      closeSideBar();
      let toastId = null;
      toastId = toast.loading('Please wait...');

      toast.update(toastId, {
        render: 'Camera is not yet activate',
        type: 'error',
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      return;
    }
    if (!isPaid) {
      setShowModal(false);
      closeSideBar();
      let toastId = null;
      toastId = toast.loading('Please wait...');

      toast.update(toastId, {
        render: 'Payment flow is not yet completed ',
        type: 'error',
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      return;
    }
    let air_id = editCamera.camera
      ? editCamera.camera.air_id
      : editCamera.air_id;
    let project_id = props.project_id ? props?.project_id : null;
    dispatch(apiGetCameraDeactivateRequest(air_id, auth.token, project_id));
    setShowModal(false);
    closeSideBar();
  };

  const [showModal, setShowModal] = useState(false);
  let modalData = {
    title: editCamera?.camera
      ? editCamera?.camera.nick_name
      : editCamera.nick_name,
    message: `Are you sure you want to deactivate "${
      editCamera?.camera ? editCamera.camera.nick_name : editCamera.nick_name
    }" now?`,
  };
  const modalFooter = (
    <ModalFooter>
      <Button onClick={() => setShowModal(false)} variant="primary">
        No, on{' '}
        {editCamera?.organisation_owned_camera?.end_date
          ? moment(editCamera?.organisation_owned_camera?.end_date).format(
              'MMMM DD YYYY',
            )
          : editCamera?.end_date
          ? moment(editCamera?.end_date).format('MMMM DD YYYY')
          : 'its expiry '}
      </Button>
      <Button onClick={deactivateCamera} variant="danger">
        Deactivate now
      </Button>
    </ModalFooter>
  );
  // console.log('editcamera', editCamera);
  return (
    <RightNavContainer>
      {/* =========================Header=================================== */}
      <RightNavContainerX onClick={closeSideBar}>
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      <SideBarMainDiv>
        <SDMHeading>Edit Camera </SDMHeading>
        {/* =========================Body=================================== */}
        <RightNavSecDiv>
          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Camera Type:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={camera?.type ? camera?.type : ''}
                // onChange={handleRoleFilter}
                options={cameraOptions}
                placeholder={'Air One'}
                styles={typeStyles}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
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
                defaultValue={camera.owner_name}
                readOnly
                style={{ color: '#667085' }}
                onChange={e =>
                  setCamera(prev => ({
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
                defaultValue={
                  camera?.camera ? camera?.camera.nick_name : camera?.nick_name
                }
                onChange={e =>
                  setCamera(prev => ({
                    ...prev,
                    nick_name: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Lan IP</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="-"
                readOnly
                maxLength={30}
                defaultValue={
                  camera?.camera ? camera?.camera.lan_ip : camera?.lan_ip
                }
                onChange={e =>
                  setCamera(prev => ({
                    ...prev,
                    lan_ip: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Public IP</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="-"
                readOnly
                maxLength={30}
                defaultValue={
                  camera?.camera ? camera?.camera.public_ip : camera?.public_ip
                }
                onChange={e =>
                  setCamera(prev => ({
                    ...prev,
                    public_ip: e.target.value,
                  }))
                }
              />
            </SBMSDiv3>
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>AIR ID</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="0000-0000-0000"
                // onChange={checkCameraValidity}
                maxLength={14}
                defaultValue={
                  camera?.camera ? camera?.camera.air_id : camera?.air_id
                }
                readOnly
              />
            </SBMSDiv3>
          </div>

          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Internal Record Format:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultInputValue={
                  editCamera?.camera
                    ? editCamera?.camera.internal_record_format.split('/')[0]
                    : editCamera?.internal_record_format.split('/')[0]
                }
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
                defaultInputValue={
                  editCamera?.camera
                    ? editCamera?.camera.internal_record_format.split('/')[1]
                    : editCamera?.internal_record_format.split('/')[1]
                }
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
                defaultInputValue={
                  editCamera?.camera
                    ? editCamera?.camera.internal_record_format.split('/')[2]
                    : editCamera?.internal_record_format.split('/')[2]
                }
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
          </div>

          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>External Stream Format:</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultInputValue={
                  editCamera?.camera
                    ? editCamera?.camera.external_stream_format.split('/')[0]
                    : editCamera?.external_stream_format.split('/')[0]
                }
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
                defaultInputValue={
                  editCamera?.camera
                    ? editCamera?.camera.external_stream_format.split('/')[1]
                    : editCamera?.external_stream_format.split('/')[1]
                }
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
                defaultInputValue={
                  editCamera?.camera
                    ? editCamera?.camera.external_stream_format.split('/')[2]
                    : editCamera?.external_stream_format.split('/')[2]
                }
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
          </div>
          {/* -------------------- For Edit Component ----------------- */}
          <RightNavLine />
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Expiration Date</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="MM/DD/YYYY"
                maxLength={30}
                readOnly
                defaultValue={
                  editCamera?.organisation_owned_camera
                    ? moment(
                        editCamera?.organisation_owned_camera?.end_date,
                      ).format('MMMM DD YYYY')
                    : moment(editCamera?.end_date).format('MMMM DD YYYY')
                }
              />
            </SBMSDiv3>
          </div>
          <SBMSDiv4>
            <EditCamTimeImg src={time} />
            <SDMHeadingP>Extend Subscription</SDMHeadingP>
          </SBMSDiv4>
          <RightNavLine />
          <SBMSDiv5
            onClick={
              editCamera?.organisation_owned_camera
                ? editCamera?.organisation_owned_camera?.stripe_subscription_id
                  ? () => setShowModal(true)
                  : null
                : editCamera?.stripe_subscription_id
                ? () => setShowModal(true)
                : null
            }
            stripe_subscription_id={
              editCamera?.organisation_owned_camera
                ? editCamera?.organisation_owned_camera?.stripe_subscription_id
                : editCamera?.stripe_subscription_id
            }
          >
            <EditCamTimeImg src={binWhite} />
            <SDMHeadingPWhite>Deactivate Camera</SDMHeadingPWhite>
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
              closeSideBar();
              setTimeout(() => {
                onGearEditApi(camera);
              }, 1000);
            }}
          >
            Confirm
          </TeamHeadBtnImgPa>
        </RNCFBtn2>
      </RightNavContainerFoot>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        icon={errorIcon}
        title={modalData?.title}
        body={modalData?.message}
        footer={modalFooter}
      />
    </RightNavContainer>
  );
};

export default EditCamera;
