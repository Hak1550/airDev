import DocumentCard from '../../../Components/DocumentCard';
import CameraLayout from '../../../Layouts/CameraControlLayout';
import { Header, MainContainer, SubHeader } from './styles';
import multiview from '../../../Assets/images/multiview.png';
import programFeed from '../../../Assets/images/program_feed.png';
import { getObjectByLowestValue } from 'Utils/permissions';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../Config/permissionConstant';
import errorIcon from '../../../Assets/icons/errorIcon.svg';
import {
  CloseIcon,
  NavTitle,
  RightNavContainer,
  SideBarContent,
} from 'Layouts/ProjectLayout/styles';
import X from 'Components/Icons/X';
import { useState } from 'react';
import Loader from 'Components/Loader';
import { OutlinedButton } from 'Components/IconButton/styles';
import Plus from 'Components/Icons/Plus';
import AddViewersContent from 'Components/AddViewersContent';
import { EachCollabolatorsP2P } from 'Pages/ArchiveProjectsPage/styles';
import Modal from 'Components/Modal';
import { ModalFooter } from 'Components/CommonStyles';
import { Button } from 'react-bootstrap';
import { apiCommsDeleteRequest } from 'Redux/actions/channel';

const Main = ({ state, project_id }) => {
  const dispatch = useDispatch();
  const links = [
    {
      title: 'Viewers',
      href: `/project/multiview/${project_id}`,
    },
  ];
  const CommsType = {
    multi_view: {
      name: 'Multiview',
      icon: multiview,
      btnTitle: 'Open',
      description: 'View multiple cameras, program and preview',
    },
    program_feed: {
      name: 'Program Feed',
      icon: programFeed,
      btnTitle: 'Open',
      description: 'View program feed fullscreen.',
    },
  };
  const ModalTypes = {
    DELETE_MULTIVIEW: {
      type: 'DELETE_MULTIVIEW',
      title: 'Delete Multiview?',
      body: `Are you sure you want to delete this multiview link?`,
    },
    DELETE_PROGRAM_FEED: {
      type: 'DELETE_PROGRAM_FEED',
      title: 'Delete Program Feed?',
      body: `Are you sure you want to delete this program feed link?`,
    },
  };
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
  const [showRightNav, setShowRightNav] = useState(false);
  const [sideNavPage, setSideNavPage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState(
    ModalTypes['DELETE_MULTIVIEW'],
  );
  const [selectedDeleteItemId, setSelectedDeleteItemId] = useState(null);
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
            <Header>Program feed and multiview</Header>
            <br />
            <SubHeader>
              View multiple cameras, program, preview and view program feed
              fullscreen.
            </SubHeader>
          </div>
          {allowedPermissions?.includes(types.EDIT_COMMS) && (
            <OutlinedButton
              className="btn btn-sm fw-semibold"
              style={{ minWidth: '145px', color: '#344054' }}
              onClick={() => {
                setCommsId(null);
                setShowRightNav(true);
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
                                  setModalDetails(
                                    link.type === 'multi_view'
                                      ? ModalTypes['DELETE_MULTIVIEW']
                                      : ModalTypes['DELETE_PROGRAM_FEED'],
                                  );
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
              {/* {SideNavPageType[sideNavPage]?.title}
              <br />
              <span>{SideNavPageType[sideNavPage]?.subTitle}</span> */}
              Manage Viewers
            </NavTitle>
            <SideBarContent>
              <AddViewersContent
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
