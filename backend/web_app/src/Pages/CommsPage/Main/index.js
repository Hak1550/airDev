import DocumentCard from '../../../Components/DocumentCard';
import CameraLayout from '../../../Layouts/CameraControlLayout';
import { Header, MainContainer, SubHeader } from './styles';
import discord from '../../../Assets/images/discord.svg';
import slack from '../../../Assets/images/slack.svg';
import unityIntercom from '../../../Assets/images/unityIntercom.svg';
import { getObjectByLowestValue } from 'Utils/permissions';
import { useDispatch, useSelector } from 'react-redux';
import errorIcon from '../../../Assets/icons/errorIcon.svg';
import * as types from '../../../Config/permissionConstant';
import {
  CloseIcon,
  NavTitle,
  RightNavContainer,
  SideBarContent,
} from 'Layouts/ProjectLayout/styles';
import X from 'Components/Icons/X';
import { useState } from 'react';
import AddCommsContent from 'Components/AddCommsContent';
import Loader from 'Components/Loader';
import { OutlinedButton } from 'Components/IconButton/styles';
import Plus from 'Components/Icons/Plus';
import { EachCollabolatorsP2P } from 'Pages/ArchiveProjectsPage/styles';
import { apiCommsDeleteRequest } from 'Redux/actions/channel';
import { ModalFooter } from 'Components/CommonStyles';
import { Button } from 'react-bootstrap';
import Modal from 'Components/Modal';

const Main = ({ state, project_id }) => {
  const links = [
    {
      title: 'Comms',
      href: `/project/comms/${project_id}`,
    },
  ];
  const CommsType = {
    slack: {
      name: 'Slack',
      icon: slack,
      btnTitle: 'Open Slack',
      description: 'Send notifications to channels and create projects.',
    },
    discord: {
      name: 'Discord',
      icon: discord,
      btnTitle: 'Open Discord',
      description: 'Everything you need for work, all in one place.',
    },
    unity_intercom: {
      name: 'Unity Intercom',
      icon: unityIntercom,
      btnTitle: 'Open Unity',
      description: 'Plan, track, and release great software.',
    },
  };

  const SideNavPageType = {
    discord: {
      title: 'Edit Discord',
      subTitle: 'Select a default Discord Server for this organization.',
    },
    unity_intercom: {
      title: 'Edit Unity',
      subTitle: 'Select a default unity server for this organization.',
    },
    slack: {
      title: 'Edit Slack',
      subTitle: 'Select a default slack channel for this organization.',
    },
    ADD_COMMS: {
      title: 'Manage Comms',
      subTitle: 'Select a Comm channel for this project.',
    },
  };

  const ModalTypes = {
    discord: {
      type: 'discord',
      title: 'Delete Discord?',
      body: `Are you sure you want to delete this discord channel?`,
    },
    slack: {
      type: 'slack',
      title: 'Delete Slack?',
      body: `Are you sure you want to delete this slack channel?`,
    },
    unity_intercom: {
      type: 'unity_intercom',
      title: 'Delete Unity Intercom?',
      body: `Are you sure you want to delete this unity intercom channel?`,
    },
  };
  const dispatch = useDispatch();
  const deleteClicked = () => {
    dispatch(
      apiCommsDeleteRequest(selectedDeleteItemId, auth.token, project_id),
    );
    setModalShow(false);
  };
  const modalFooter = (
    <ModalFooter>
      <Button onClick={() => setModalShow(false)} variant="light">
        Cancel
      </Button>
      <Button onClick={deleteClicked} variant="danger">
        Delete
      </Button>
    </ModalFooter>
  );
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState(ModalTypes['discord']);
  const [selectedDeleteItemId, setSelectedDeleteItemId] = useState(null);
  const [showRightNav, setShowRightNav] = useState(false);
  const [sideNavPage, setSideNavPage] = useState(null);
  const [commsId, setCommsId] = useState(null);
  const onRightNavClose = () => {
    setShowRightNav(false);
  };
  const sidebarState = useSelector(state => state.sidebar);
  const auth = useSelector(state => state.auth);
  const selectProjectDetails = sidebarState?.selectedProject;
  const allowedPermissions =
    selectProjectDetails &&
    getObjectByLowestValue(selectProjectDetails?.permission_obj, 'role')
      ?.allowed_permissions;

  return (
    <CameraLayout links={links}>
      <MainContainer>
        <div className="d-flex justify-content-between">
          <div>
            <Header>Integrations and connected apps</Header>
            <br />
            <SubHeader>
              Supercharge your workflow and connect the tool you use every day.
            </SubHeader>
          </div>
          {allowedPermissions?.includes(types.ADD_COMMS) && (
            <OutlinedButton
              className="btn btn-sm fw-semibold"
              style={{ minWidth: '145px', color: '#344054' }}
              onClick={() => {
                setCommsId(null);
                setShowRightNav(true);
                setSideNavPage('ADD_COMMS');
              }}
            >
              <Plus stroke="#344054" /> Add New
            </OutlinedButton>
          )}
        </div>
        {state?.isLoading ? (
          <Loader />
        ) : (
          <div
            className="row gy-3"
            style={{ marginTop: '48px', marginBottom: '75px' }}
          >
            {allowedPermissions &&
            allowedPermissions[0] !== types.NO_PERMISSION &&
            state.projectComms?.length
              ? state.projectComms.map(
                  link =>
                    CommsType[link.type] !== undefined && (
                      <div className="col-lg-6 col-xl-4" key={link.id}>
                        <DocumentCard
                          btnTitle={CommsType[link.type]?.btnTitle}
                          image={CommsType[link.type]?.icon}
                          url={link.url}
                          title={CommsType[link.type]?.name}
                          subTitle={link.title}
                          key={link.id}
                          description={CommsType[link.type]?.description}
                          deleteAction={
                            allowedPermissions.includes(types.EDIT_COMMS) && (
                              <button
                                className="btn btn-link text-decoration-none"
                                onClick={() => {
                                  setSideNavPage(link.type);
                                  setShowRightNav(true);
                                  setCommsId(link.id);
                                }}
                                rel="noopener noreferrer"
                              >
                                Edit
                              </button>
                            )
                          }
                          editAction={
                            allowedPermissions.includes(types.DELETE_COMMS) && (
                              <EachCollabolatorsP2P
                                onClick={() => {
                                  setModalShow(true);
                                  setModalDetails(ModalTypes[link.type]);
                                  setSelectedDeleteItemId(link.id);
                                }}
                                role="button"
                              >
                                Delete
                              </EachCollabolatorsP2P>
                            )
                          }
                        />
                      </div>
                    ),
                )
              : null}
          </div>
        )}

        {showRightNav && (
          <RightNavContainer
            style={{ position: 'fixed', top: '0', right: '0' }}
          >
            <CloseIcon onClick={onRightNavClose}>
              <X />
            </CloseIcon>
            <NavTitle>
              {SideNavPageType[sideNavPage]?.title}
              <br />
              <span>{SideNavPageType[sideNavPage]?.subTitle}</span>
            </NavTitle>
            <SideBarContent>
              <AddCommsContent
                onRightNavClose={onRightNavClose}
                auth={auth}
                projectId={project_id}
                commsId={commsId}
              />
            </SideBarContent>
          </RightNavContainer>
        )}
      </MainContainer>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        icon={errorIcon}
        title={modalDetails.title}
        body={modalDetails.body}
        footer={modalFooter}
      />
    </CameraLayout>
  );
};
export default Main;
