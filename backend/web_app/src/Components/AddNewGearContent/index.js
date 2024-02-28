import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddCrewContentContainer,
  AddGearFormContainer,
  NavFooter,
  DoneButton,
} from './styles';
import {
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
  SBMSDiv4,
  SBMSDiv5,
  SBMSImg,
  SBMSInput2,
  SDMHeading,
  SDMHeadingP,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../../Pages/AssetsPage/styles';
import {
  apiGetCameraDetailRequest,
  clearcameraDetails,
} from '../../Redux/actions/gear';
// import { FormErrorText } from '../CommonStyles';
import { OutlinedButton } from '../IconButton/styles';
import { apiGetAllAssetsRequest } from 'Redux/actions/assets';
import { verifyAirId } from 'Redux/actions/onboarding';
import cross from '../../Assets/images/cross.png';
import tick from '../../Assets/images/tick.png';
import Select, { components } from 'react-select';
import {
  DropDownIconContainer,
  OptionText,
} from '../../Components/CommonStyles';

const AddNewGearContent = ({
  auth,
  onAddGearEnd,
  setOnBoardCameraForm,
  setOnBoardCameraFormObj,
  onBoardCameraFormObj,
  setSideNavPage,
  onChangeRightNav,
  setOnboardForm,
  set_onboard_air_id,
  formObj,
  setFormObj,
}) => {
  const editUser = {};
  // const gear = useSelector(state => state.gear);
  // const [formType, setFormType] = useState('1');
  // const dispatch = useDispatch();
  // let organisation = auth.user_information.organisation_data[0].organisation.id;
  // const {
  //   control,
  //   handleSubmit,
  //   getValues,
  //   setError,
  //   formState: { errors },
  // } = useForm();

  // const onAddGearFormSubmit = async () => {
  //   handleSubmit(data => {
  //     let air_id = getValues('air_id');
  //     let formData = getValues();

  //     dispatch(apiGetCameraDetailRequest(air_id, auth.token));
  //     dispatch(onboardCameraDetails(formData));
  //   })();
  // };
  // useEffect(() => {
  //   if (gear?.cameraDetails) {
  //     // console.log(
  //     //   'cameraDetails Inn',
  //     //   gear?.cameraDetails.owner_name,
  //     //   gear?.onboardCameraDetails,
  //     // );
  //     // setSideNavPage('Camera Packages');
  //     // setOnBoardCameraFormObj(e);
  //     let obj = gear?.onboardCameraDetails;
  //     obj['organisation'] = organisation;
  //     obj['owner_name'] = gear?.cameraDetails.owner_name;

  //     dispatch(clearcameraDetails());
  //     dispatch(apiGearPostRequest(obj, auth.token, '1'));
  //     dispatch(apiGetAllAssetsRequest(auth.token));
  //     onAddGearEnd();
  //   } else if (gear?.cameraDetailsErr) {
  //     let err = gear?.cameraDetailsErr;
  //     setError('air_id', { type: 'custom', message: err });
  //     setTimeout(() => {
  //       dispatch(clearcameraDetails());
  //     }, 5000);
  //   }
  // }, [gear?.cameraDetails, gear?.cameraDetailsErr]);

  const gears = useSelector(state => state.gear);
  const dispatch = useDispatch();
  const [airID, setAirId] = useState('');
  const [airIDBool, setAirIdBool] = useState(false);
  const [optionSelect, setoptionSelect] = useState(editUser?.role);
  const [errorTxt, setErrorTxt] = useState('');
  const [error, setError] = useState({
    air_id: false,
    nick_name: false,
    internal_record: false,
    external_record: false,
  });
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
  let organisation = auth.user_information.organisation_data[0].organisation.id;
  let internal_rec_format = '';
  let external_rec_format = '';

  const closeSideBar = () => {
    onAddGearEnd();
    dispatch(clearcameraDetails());
    setFormObj({ owner_name: '' });

    // setOnboardForm(false);
  };

  const checkCameraValidity = e => {
    const val = e.target.value
      .replace(/^([A-Za-z0-9]{4})$/g, '$1-')
      .replace(/^([A-Za-z0-9]{4}-[A-Za-z0-9]{4})$/g, '$1-');
    setAirId(val);
    formObj.air_id = val;
    // setFormObj(prev => ({ ...prev, air_id: val }));
    if (val.length === 14) {
      setOnBoardCameraFoo(val);
    }
  };
  const setOnBoardCameraFoo = e => {
    // console.log(e, 'airID');
    set_onboard_air_id(e);
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
    } // closeSideBar();
    setSideNavPage('Camera Packages');
    formObj['organisation'] = organisation;
    setOnBoardCameraFormObj(formObj);
    dispatch(clearcameraDetails());
    setFormObj({ owner_name: '' });

    // onAddGearEnd();
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

  // useEffect(() => {
  //   if (formObj?.air_id?.length < 14) {
  //     dispatch(clearcameraDetails());
  //   }
  // }, [formObj?.air_id]);

  useEffect(() => {
    if (gears?.cameraDetails) {
      formObj.owner_name = gears?.cameraDetails?.owner_name;
      // setFormObj(prev => ({
      //   ...prev,
      //   owner_name: gears?.cameraDetails?.owner_name,
      // }));
    }
  }, [gears?.cameraDetails]);

  useEffect(() => {
    if (gears?.cameraDetailsErr) {
      setError(prev => ({ ...prev, air_id: true }));
      setErrorTxt(gears?.cameraDetailsErr);
      formObj.owner_name = '';
      // setFormObj(prev => ({ ...prev, owner_name: '' }));
    }
  }, [gears?.cameraDetailsErr]);

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
      formObj.internal_record_format = internal_rec_format;
    }
  }, [internal_record]);

  useEffect(() => {
    external_rec_format = `${external_record.part1}/${external_record.part2}/${external_record.part3}`;
    if (
      external_record.part1 ||
      external_record.part2 ||
      external_record.part3
    ) {
      formObj.external_stream_format = external_rec_format;
      // setFormObj(prev => ({
      //   ...prev,
      //   external_stream_format: external_rec_format,
      // }));
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
                value={formObj?.nick_name}
                onChange={
                  e => (formObj.nick_name = e.target.value)
                  // setFormObj(prev => ({ ...prev, nick_name: e.target.value }))
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
                // onChange={e =>
                //   setFormObj(prev => ({ ...prev, lan_ip: e.target.value }))
                // }

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
                // onChange={e =>

                //   setFormObj(prev => ({ ...prev, public_ip: e.target.value }))
                // }

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
                // value={airID}
                value={formObj?.air_id}
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
                // value={internal_record.part1}

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

    // <AddCrewContentContainer>
    //   <AddGearFormContainer>
    //     <form>
    //       <div className="mb-3">
    //         <label htmlFor="_type" className="form-label">
    //           Device Type
    //         </label>
    //         <select
    //           className="form-select"
    //           onChange={e => {
    //             setFormType(e.target.value);
    //           }}
    //         >
    //           <option value={1}>Camera</option>
    //           <option value={2}>Instance</option>
    //         </select>
    //       </div>
    //       {formType === '2' ? (
    //         <>
    //           <div className="mb-3">
    //             <label htmlFor="owner_name" className="form-label">
    //               Instance Type
    //             </label>
    //             <Controller
    //               name="instance_type"
    //               control={control}
    //               // defaultValue={'VIMIX_MAIN'}
    //               placeholder="Select Instance Type"
    //               render={({ field }) => (
    //                 <select {...field} className="form-select">
    //                   <option value={'VIMIX_MAIN'}>VMIX Main</option>
    //                   <option value={'VIMIX_REPLY'}>VMIX Reply</option>
    //                   <option value={'SRT_GATEWAY'}>SRT Gateway</option>
    //                 </select>
    //               )}
    //             />
    //             {errors.instance_type && (
    //               <FormErrorText className="form-text">
    //                 {errors.instance_type.message}
    //               </FormErrorText>
    //             )}
    //           </div>

    //           <div className="mb-3">
    //             <label htmlFor="owner_name" className="form-label">
    //               Vmix License Number
    //             </label>
    //             <Controller
    //               name="license_number"
    //               control={control}
    //               defaultValue=""
    //               render={({ field }) => (
    //                 <input
    //                   {...field}
    //                   type="text"
    //                   className="form-control"
    //                   placeholder="License number"
    //                 />
    //               )}
    //             />
    //             {errors.license_number && (
    //               <FormErrorText className="form-text">
    //                 {errors.license_number.message}
    //               </FormErrorText>
    //             )}
    //           </div>

    //           <div className="mb-3">
    //             <label htmlFor="owner_name" className="form-label">
    //               Instance Region
    //             </label>
    //             <Controller
    //               name="instance_regioin"
    //               control={control}
    //               defaultValue={'us-east-2'}
    //               render={({ field }) => (
    //                 <select {...field} className="form-select">
    //                   <option value={'us-east-2'}>US East (Ohio)</option>
    //                   <option value={'us-east-1'}>US East (N. Virginia)</option>
    //                   <option value={'us-west-1'}>US West (N. CA)</option>
    //                   <option value={'us-west-2'}>US West (Oregon)</option>
    //                   <option value={'ca-central-1'}>Canada (Central)</option>
    //                   <option value={'eu-central-1'}>Europe (Frankfurt)</option>
    //                   <option value={'eu-west-1'}>Europe (Ireland)</option>
    //                   <option value={'eu-west-2'}>Europe (London)</option>
    //                   <option value={'eu-west-3'}>Europe (Paris)</option>
    //                   <option value={'eu-south-1'}>Europe (Milan)</option>
    //                   <option value={'eu-north-1'}>Europe (Stockholm)</option>
    //                 </select>
    //               )}
    //             />
    //             {errors.instance_region && (
    //               <FormErrorText className="form-text">
    //                 {errors.instance_region.message}
    //               </FormErrorText>
    //             )}
    //           </div>

    //           <div className="mb-3">
    //             <label htmlFor="owner_name" className="form-label">
    //               Size
    //             </label>
    //             <Controller
    //               name="instance_size"
    //               control={control}
    //               defaultValue={'SMALL'}
    //               render={({ field }) => (
    //                 <select {...field} className="form-select">
    //                   <option value={'SMALL'}>Small</option>
    //                   <option value={'MEDIUM'}>Medium</option>
    //                   <option value={'LARGE'}>Large</option>
    //                   <option value={'XL'}>XL</option>
    //                 </select>
    //               )}
    //             />
    //             {errors.instance_size && (
    //               <FormErrorText className="form-text">
    //                 {errors.instance_size.message}
    //               </FormErrorText>
    //             )}
    //           </div>
    //         </>
    //       ) : null}
    //       <div className="mb-3">
    //         <label htmlFor="owner_name" className="form-label">
    //           Owner
    //         </label>
    //         <Controller
    //           name="owner_name"
    //           control={control}
    //           defaultValue=""
    //           render={({ field }) => (
    //             <input
    //               {...field}
    //               type="text"
    //               readOnly
    //               className="form-control"
    //               placeholder="Owner"
    //             />
    //           )}
    //         />
    //         {errors.owner_name && (
    //           <FormErrorText className="form-text">
    //             {errors.owner_name.message}
    //           </FormErrorText>
    //         )}
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="nick_name" className="form-label">
    //           Nickname
    //         </label>
    //         <Controller
    //           name="nick_name"
    //           control={control}
    //           defaultValue=""
    //           rules={{
    //             required: 'This field is required.',
    //           }}
    //           render={({ field }) => (
    //             <input
    //               {...field}
    //               type="text"
    //               className="form-control"
    //               placeholder="Nickname"
    //             />
    //           )}
    //         />
    //         {errors.nick_name && (
    //           <FormErrorText className="form-text">
    //             {errors.nick_name.message}
    //           </FormErrorText>
    //         )}
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="lan_ip" className="form-label">
    //           LAN IP
    //         </label>
    //         <Controller
    //           name="lan_ip"
    //           control={control}
    //           defaultValue=""
    //           render={({ field }) => (
    //             <input
    //               {...field}
    //               type="text"
    //               className="form-control"
    //               placeholder="IP Address"
    //               readOnly
    //             />
    //           )}
    //         />
    //         {errors.lan_ip && (
    //           <FormErrorText className="form-text">
    //             {errors.lan_ip.message}
    //           </FormErrorText>
    //         )}
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="public_ip" className="form-label">
    //           Public IP
    //         </label>
    //         <Controller
    //           name="public_ip"
    //           control={control}
    //           defaultValue=""
    //           render={({ field }) => (
    //             <input
    //               {...field}
    //               type="text"
    //               className="form-control"
    //               placeholder="Public IP Address"
    //               readOnly
    //             />
    //           )}
    //         />
    //         {errors.public_ip && (
    //           <FormErrorText className="form-text">
    //             {errors.public_ip.message}
    //           </FormErrorText>
    //         )}
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="air_id" className="form-label">
    //           AIR ID
    //         </label>
    //         <Controller
    //           name="air_id"
    //           control={control}
    //           defaultValue=""
    //           rules={{
    //             required: 'This field is required.',
    //             pattern: {
    //               value: /^([A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4})$/g,
    //               message: 'Invalid AIR ID',
    //             },
    //             minLength: {
    //               value: 14,
    //               message: 'Invalid AIR ID',
    //             },
    //           }}
    //           render={({ field }) => (
    //             <input
    //               // {...register('airId')}
    //               {...field}
    //               type="text"
    //               className="form-control"
    //               placeholder="0000-0000-0000"
    //               maxLength={14}
    //               // onChange={e => console.log(e.target.value)}
    //             />
    //           )}
    //         />
    //         {errors.air_id && (
    //           <FormErrorText className="form-text">
    //             {errors.air_id?.message}
    //           </FormErrorText>
    //         )}
    //       </div>
    //       {formType === '1' ? (
    //         <>
    //           <div className="mb-3">
    //             <label htmlFor="internal_record_format" className="form-label">
    //               Internal Record Format
    //             </label>
    //             <div className="d-flex fd-row">
    //               <div className="w-28">
    //                 <Controller
    //                   name="internal_record_format"
    //                   control={control}
    //                   defaultValue={1}
    //                   render={({ field }) => (
    //                     <select {...field} className="form-select">
    //                       <option value={'1'}>1080</option>
    //                       <option value={'2'}>4k</option>
    //                     </select>
    //                   )}
    //                 />
    //               </div>
    //               <div className="w-26 " style={{ marginLeft: 5 }}>
    //                 <Controller
    //                   name="internal_record_format"
    //                   control={control}
    //                   defaultValue={1}
    //                   render={({ field }) => (
    //                     <select {...field} className="form-select">
    //                       <option value={'1'}>p25</option>
    //                       <option value={'7'}>p30</option>
    //                       <option value={'7'}>p50</option>
    //                       <option value={'8'}>p60</option>
    //                       <option value={'8'}>25</option>
    //                       <option value={'8'}>30</option>
    //                       <option value={'8'}>50</option>
    //                       <option value={'8'}>60</option>
    //                     </select>
    //                   )}
    //                 />
    //               </div>
    //               <div className="w-44 " style={{ marginLeft: 5 }}>
    //                 <Controller
    //                   name="internal_record_format"
    //                   control={control}
    //                   defaultValue={1}
    //                   render={({ field }) => (
    //                     <select {...field} className="form-select">
    //                       <option value={'1'}>ProRes</option>
    //                       <option value={'7'}>ProResHQ</option>
    //                     </select>
    //                   )}
    //                 />
    //               </div>
    //             </div>
    //             {errors.internal_record_format && (
    //               <FormErrorText className="form-text">
    //                 {errors.internal_record_format.message}
    //               </FormErrorText>
    //             )}
    //           </div>

    //           <div className="mb-3">
    //             <label htmlFor="external_stream_format" className="form-label">
    //               External Stream Format
    //             </label>
    //             <div className="d-flex fd-row">
    //               <div className="w-35">
    //                 <Controller
    //                   name="external_stream_format"
    //                   control={control}
    //                   defaultValue={1}
    //                   render={({ field }) => (
    //                     <select {...field} className="form-select">
    //                       <option value={'1'}>1080</option>
    //                       <option value={'2'}>4k</option>
    //                     </select>
    //                   )}
    //                 />
    //               </div>
    //               <div className="w-35 " style={{ marginLeft: 5 }}>
    //                 <Controller
    //                   name="external_stream_format"
    //                   control={control}
    //                   defaultValue={1}
    //                   render={({ field }) => (
    //                     <select {...field} className="form-select">
    //                       <option value={'1'}>p25</option>
    //                       <option value={'7'}>p30</option>
    //                       <option value={'7'}>p50</option>
    //                       <option value={'8'}>p60</option>
    //                       <option value={'8'}>25</option>
    //                       <option value={'8'}>30</option>
    //                       <option value={'8'}>50</option>
    //                       <option value={'8'}>60</option>
    //                     </select>
    //                   )}
    //                 />
    //               </div>
    //               <div className="w-44" style={{ marginLeft: 5 }}>
    //                 <Controller
    //                   name="external_stream_format"
    //                   control={control}
    //                   defaultValue={1}
    //                   render={({ field }) => (
    //                     <select {...field} className="form-select">
    //                       <option value={'1'}>h.264</option>
    //                       <option value={'7'}>h.265</option>
    //                     </select>
    //                   )}
    //                 />
    //               </div>
    //             </div>
    //             {errors.external_stream_format && (
    //               <FormErrorText className="form-text">
    //                 {errors.external_stream_format.message}
    //               </FormErrorText>
    //             )}
    //           </div>
    //         </>
    //       ) : null}
    //     </form>
    //   </AddGearFormContainer>
    //   <NavFooter>
    //     <OutlinedButton
    //       className="btn btn-sm"
    //       disabled={gear.isLoading}
    //       onClick={onAddGearEnd}
    //     >
    //       Cancel
    //     </OutlinedButton>
    //     <DoneButton
    //       disabled={gear.isLoading}
    //       className="btn btn-primary btn-sm"
    //       onClick={onAddGearFormSubmit}
    //     >
    //       Done
    //     </DoneButton>
    //   </NavFooter>
    // </AddCrewContentContainer>
  );
};

export default AddNewGearContent;
