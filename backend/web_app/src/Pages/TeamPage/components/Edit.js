import React, { useState, useEffect } from 'react';
import {
  Btn2,
  EditCamTimeImg,
  OptionsValueContainer,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  RNCFBtn,
  RNCFBtn2,
  SBMSDiv3,
  SBMSDiv3a,
  SBMSDiv5,
  SBMSImg,
  SBMSInput2,
  SDMHeadingDiv,
  SDMHeading,
  SDMHeadingP,
  SDMHeadingPWhite,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../styles';
import cross from '../../../Assets/images/cross.png';
import edit from '../../../Assets/images/editWhite.png';
import tick from '../../../Assets/images/tick.png';
import binWhite from '../../../Assets/images/binWhite.png';
import errorIcon from '../../../Assets/icons/errorIcon.svg';
import ManageProjects from './ManageProject';
import Select, { components } from 'react-select';
import Modal from '../../../Components/Modal';
import { ModalFooter } from '../../../Components/CommonStyles';
import { Button } from 'react-bootstrap';
import {
  DropDownIconContainer,
  OptionText,
} from '../../../Components/CommonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { apiTeamMemberPatchRequest } from 'Redux/actions/team';

const EditCollaborator = ({
  closeSideBar,
  editUser,
  projects,
  handleDeleteMember,
  ACTION_TYPES,
  dispatch,
}) => {
  const [optionSelect, setoptionSelect] = useState(editUser.role);
  const [manageProjects, setManageProjects] = useState(false);
  const [allProjectsArr, setAllProjectsArr] = useState([]);
  const [data, setData] = useState({});
  const [id, setId] = useState([]);
  const auth = useSelector(state => state.auth);
  let dispatchRedux = useDispatch();
  useEffect(() => {
    let projectsArr = [];
    if (!projectsArr.length) {
      projects.map((m, i) => {
        let added = m.members.map(f => f.user).includes(editUser.user?.id);
        return projectsArr.push({ ...m, added });
      });
    }
    // console.log(projectsArr);
    setAllProjectsArr(projectsArr);
  }, []);
  const deleteMember = () => {
    handleDeleteMember(editUser);
    closeSideBar();
    setShowModal(false);
  };
  const roleOptions = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Producer' },
    { value: '3', label: 'Crew' },
    { value: '4', label: 'No Role' },
  ];
  const customRoleStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#101828',
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
      color: '#667085',
      fontSize: 16,
      fontFamily: 'Inter',
    }),
    container: base => ({
      ...base,
      flex: 1,
    }),
  };

  const handleChangeRole = role => {
    setoptionSelect(role);
    let id = editUser.collaborator_id;
    const data = {
      organisation: auth.user_information.organisation_data[0].organisation?.id,
      user: editUser.user.id,
      role: parseInt(role),
    };
    setData(data);
    setId(id);
    // console.log(data, id);
  };
  const onConfirm = () => {
    closeSideBar();
    setShowModal(false);
    if (Object.keys(data).length) {
      dispatchRedux(apiTeamMemberPatchRequest(data, auth.token, id));
    }
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
  const [showModal, setShowModal] = useState(false);
  let modalData = {
    title: editUser.user.name,
    message: `Are you sure you want to remove ${editUser.user.name} from all projects?`,
  };
  const modalFooter = (
    <ModalFooter>
      <Button onClick={() => setShowModal(false)} variant="light">
        No, Cancel
      </Button>
      <Button onClick={deleteMember} variant="danger">
        Yes, Delete
      </Button>
    </ModalFooter>
  );
  return (
    <RightNavContainer>
      {/* <RightNavContainerX onClick={closeSideBar}>
      </RightNavContainerX> */}
      {/* =========================Header=================================== */}
      <SideBarMainDiv>
        <SDMHeadingDiv>
          <SDMHeading>Edit Collaborator</SDMHeading>
          <RightNavContainerXPar src={cross} onClick={closeSideBar} />
        </SDMHeadingDiv>
        {/* =========================Body=================================== */}
        <div style={{ marginTop: 15, width: '100%' }}>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>First Name</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Search"
                maxLength={30}
                defaultValue={editUser?.user_info.first_name}
                style={{ color: '#667085' }}
                readOnly
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Last Name</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Search"
                maxLength={30}
                defaultValue={editUser?.user_info.last_name}
                readOnly
              />
            </SBMSDiv3>
          </div>

          <div style={{ marginTop: 15 }}>
            <SDMHeadingP>Email Address</SDMHeadingP>
            <SBMSDiv3>
              <SBMSInput2
                type="text"
                placeholder="Search"
                maxLength={30}
                defaultValue={editUser?.user.email}
                readOnly
              />
            </SBMSDiv3>
          </div>
          <div style={{ marginTop: 15, width: '100%' }}>
            <SDMHeadingP>Role</SDMHeadingP>
            <SBMSDiv3a>
              <Select
                defaultValue={optionSelect}
                // onChange={handleRoleFilter}
                options={roleOptions}
                placeholder={editUser?.role ? editUser?.role : null}
                styles={customRoleStyles}
                onChange={e => handleChangeRole(e.value)}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: DropDownIcon,
                  Option: ValueContainer,
                  // Option: () => (optionSelect ? ValueContainer : null),
                }}
              />
            </SBMSDiv3a>
          </div>
        </div>
        <div style={{ marginBottom: '150px', width: '100%' }}>
          <Btn2
            onClick={() => {
              setManageProjects(true);
            }}
          >
            <SBMSImg src={edit} />
            <p
              style={{
                marginBottom: 0,
                color: '#fff',
                fontSize: 16,
                fontWeight: '500',
                fontfamily: 'Inter',
              }}
            >
              Manage Projects
            </p>
          </Btn2>
          <SBMSDiv5 onClick={() => setShowModal(true)}>
            <EditCamTimeImg src={binWhite} />
            <SDMHeadingPWhite>Delete {editUser?.user.name}</SDMHeadingPWhite>
          </SBMSDiv5>
        </div>
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

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        icon={errorIcon}
        title={modalData?.title}
        body={modalData?.message}
        footer={modalFooter}
      />
      {manageProjects ? (
        <ManageProjects
          closeSideBar={closeSideBar}
          editUser={editUser}
          projects={allProjectsArr}
          setAllProjectsArr={setAllProjectsArr}
          ACTION_TYPES={ACTION_TYPES}
          dispatch={dispatch}
        />
      ) : null}
    </RightNavContainer>
  );
};

export default EditCollaborator;
