import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../Layouts/DashboardLayout';
import errorIcon from '../../Assets/icons/errorIcon.svg';
import { ModalFooter } from '../../Components/CommonStyles';
import * as types from '../../Config/permissionConstant';
import acrynom from '../../Utils/acrynom';
import {
  CompanyName,
  MoreButton,
  NoteHeading,
  NoteText,
  ProjectCover,
  ProjectDetailsContainer,
  ProjectProperty,
  ProjectPropertyValue,
  ProjectSummaryRow,
  ProjectThumbnail,
  ProjectTitle,
  ProjectTitleContainer,
  ProjectTitleRow,
  ViewMapButton,
  ProjectLabel,
  DropdownOption,
  ProjectMembersContainer,
  ProjectMembersProfile,
  Avatar,
} from './styles';
import cover from '../../Assets/images/cover.jpg';
import DocumentCard from '../../Components/DocumentCard';
import linkIcon from '../../Assets/images/linkIcon.svg';
import More from '../../Components/Icons/More';
import {
  addMemberToSelectedProject,
  updateSideBarState,
} from '../../Redux/actions/sidebar';
import SideBarPageType from '../../Enums/SideBarPageType';
import SideBarStatus from '../../Enums/SideBarStatus';
import cameraIcon from '../../Assets/icons/camera.png';
import {
  apiProjectPatchRequest,
  apiProjectDeleteRequest,
  resetProject,
  apiRemoveMemberRequest,
  apiAddMemberRequest,
  apiProjectFilesDeleteRequest,
  apiGetProjectLinksRequest,
  apiGetProjectFilesRequest,
  apiProjectLinksDeleteRequest,
} from '../../Redux/actions/project';
import { useHistory } from 'react-router-dom';
import Modal from '../../Components/Modal';
import { Button } from 'react-bootstrap';
import {
  AddAvatar,
  CommsIcon,
  Duplicate,
  EditSquare,
  ExternalLink,
  TrashCan,
} from 'Components/Icons';
import Archive from 'Components/Icons/Archive';
import CustomCalendar from 'Components/CustomCalendar';
import {
  CloseIcon,
  NavTitle,
  RightNavContainer,
  SearchBarContainer,
  SideBarContent,
} from 'Layouts/ProjectLayout/styles';
import X from 'Components/Icons/X';
import { apiListUserInformation } from 'Redux/actions/user_information';
import RightNavContent from 'Components/RightNavContent';
import SearchBar from 'Components/SearchBar';
import AddCollaboratorContent from 'Components/AddCollaboratorContent';
import validateEmail from 'Utils/validateEmail';
import { apiInviteRequest } from 'Redux/actions/invite';
import { toast } from 'react-toastify';
import AddExternalLinks from 'Components/AddExternalLinks';
import Loader from 'Components/Loader';
import AddCommsContent from 'Components/AddCommsContent';
import moment from 'moment';
import AddProjectFiles from 'Components/AddProjectFiles';
import filename from 'Utils/filename';
import { EachCollabolatorsP2P } from 'Pages/ArchiveProjectsPage/styles';
import { getObjectByLowestValue } from 'Utils/permissions';
import { apiCommsDeleteRequest } from 'Redux/actions/channel';

const ProjectOverviewPage = () => {
  const SideNavPageType = {
    COLLABORATORS: {
      title: 'Project Collaborators',
      subTitle: '',
    },
    ADD_COLLABORATORS: { title: 'Add Project Collaborator', subTitle: '' },
    ADD_EXTERNAL_LINKS: {
      title: 'External Links',
      subTitle: 'Attach external links for this project.',
    },
    ADD_COMMS: {
      title: 'Manage Comms',
      subTitle: 'Select a Comm channel for this project.',
    },
    ADD_PROJECT_FILES: {
      title: 'Project Files',
      subTitle: 'Upload and attach files to this project.',
    },
  };

  const dispatch = useDispatch();
  const sidebarState = useSelector(state => state.sidebar);
  const projectState = useSelector(state => state.project);
  const auth = useSelector(state => state.auth);
  const history = useHistory();
  const selectProjectDetails = sidebarState?.selectedProject;
  const organisation_role = auth?.user_information?.organisation_data[0]?.role;

  const [modalShow, setModalShow] = useState(false);
  const [isAuthorized, setAuthorized] = useState(false);
  const [sideNavPage, setSideNavPage] = useState(null);
  const [rightNavTitle, setRightNavTitle] = useState('');
  const [rightNavSubTitle, setRightNavSubTitle] = useState('');
  const [search, setSearch] = useState('');
  const [showRightNav, setShowRightNav] = useState(false);
  const [members, setMembers] = useState([]);
  const inputFile = useRef(null);

  const allowedPermissions =
    selectProjectDetails &&
    getObjectByLowestValue(selectProjectDetails?.permission_obj, 'role')
      ?.allowed_permissions;

  const currentRole =
    selectProjectDetails &&
    getObjectByLowestValue(selectProjectDetails?.permission_obj, 'role')?.role;
  // console.log('Role : ', currentRole);

  var dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const ModalTypes = {
    DELETE_PROJECT: {
      type: 'DELETE_PROJECT',
      title: 'Permanently Delete Project?',
      body: `Are you sure you want to delete ${sidebarState.selectedProject?.name}? This will delete all information associated with this project and cannot be undone.`,
    },
    DELETE_PROJECT_FILE: {
      type: 'DELETE_PROJECT_FILE',
      title: 'Delete Project File',
      body: `Are you sure you want to delete this file?`,
    },
    DELETE_PROJECT_LINK: {
      type: 'DELETE_PROJECT_LINK',
      title: 'Delete External Link',
      body: `Are you sure you want to delete this link?`,
    },
    DELETE_PROJECT_COMMS: {
      type: 'DELETE_PROJECT_COMMS',
      title: 'Delete Comms',
      body: `Are you sure you want to delete this comm?`,
    },
  };

  const [projectDates, setProjectDates] = useState(null);
  const [modalDetails, setModalDetails] = useState(
    ModalTypes['DELETE_PROJECT'],
  );
  const [selectedDeleteItemId, setSelectedDeleteItemId] = useState(null);

  useEffect(() => {
    if (sidebarState.selectedProject) {
      // onChange(moment(sidebarState.selectedProject?.shoot_date).toDate());
      setProjectDates([
        {
          startDate: sidebarState.selectedProject.shoot_date
            ? new Date(sidebarState.selectedProject.shoot_date)
            : new Date(),
          endDate: sidebarState.selectedProject.shoot_end_date
            ? new Date(sidebarState.selectedProject.shoot_end_date)
            : new Date(),
          key: 'selection',
        },
      ]);
      setMembers(sidebarState.selectedProject.members);
      setAuthorized(
        selectProjectDetails?.permission_obj
          .map(obj => obj?.role?.name)
          .includes('ADMIN') ||
          selectProjectDetails?.permission_obj
            .map(obj => obj?.role?.name)
            .includes('PRODUCER') ||
          false,
      );
    }
  }, [sidebarState.selectedProject]);

  useEffect(() => {
    if (projectState.deleteSuccess) {
      history.push('/');
      dispatch(resetProject());
    }
  }, [projectState.deleteSuccess]);

  useEffect(() => {
    const project_id = sidebarState.selectedProject?.id;
    if (project_id && project_id !== 'undefined' && project_id !== '0') {
      dispatch(apiGetProjectLinksRequest(project_id, auth.token));
      dispatch(apiGetProjectFilesRequest(project_id, auth.token));
      dispatch(resetProject());
    }
  }, [projectState.deleteItemSuccess]);

  useEffect(() => {
    if (sideNavPage === SideNavPageType.ADD_COLLABORATORS.title)
      dispatch(apiListUserInformation(search, auth.token));
    else {
      const filteredMember = selectProjectDetails?.members.filter(
        member =>
          member.first_name.toLowerCase().match(search.toLowerCase()) ||
          member.last_name.toLowerCase().match(search.toLowerCase()),
      );
      setMembers(filteredMember);
    }
  }, [search]);
  useEffect(() => {
    if (sidebarState.newMember) {
      dispatch(
        apiAddMemberRequest(
          sidebarState.newMember,
          sidebarState.selectedProject.id,
          auth.token,
        ),
      );
    }
  }, [sidebarState.newMember]);

  const onDateChange = (startDate, endDate) => {
    const shootStartDate = new Date(startDate).toLocaleDateString('sv');
    const shootEndDate = new Date(endDate).toLocaleDateString('sv');
    dispatch(
      apiProjectPatchRequest(
        {
          shoot_date: shootStartDate,
          shoot_end_date: shootEndDate,
        },
        sidebarState.selectedProject?.id,
        auth.token,
      ),
    );
  };
  const onEditClicked = e => {
    e.preventDefault();
    dispatch(
      updateSideBarState({
        ...JSON.parse(JSON.stringify(sidebarState)),
        pageType: SideBarPageType.EDIT_PROJECT,
        status: SideBarStatus.OPEN,
      }),
    );
  };

  const onDuplicateClicked = e => {
    e.preventDefault();
    dispatch(
      updateSideBarState({
        ...JSON.parse(JSON.stringify(sidebarState)),
        pageType: SideBarPageType.DUPLICATE_PROJECT,
        status: SideBarStatus.OPEN,
      }),
    );
  };

  const onEditClick = () => {
    inputFile.current.click();
  };

  const deleteClicked = () => {
    // console.log("clicked...");
    if (modalDetails.type === 'DELETE_PROJECT')
      dispatch(
        apiProjectDeleteRequest(sidebarState.selectedProject?.id, auth.token),
      );
    if (modalDetails.type === 'DELETE_PROJECT_FILE')
      dispatch(apiProjectFilesDeleteRequest(selectedDeleteItemId, auth.token));
    if (modalDetails.type === 'DELETE_PROJECT_LINK')
      dispatch(apiProjectLinksDeleteRequest(selectedDeleteItemId, auth.token));
    if (modalDetails.type === 'DELETE_PROJECT_COMMS')
      dispatch(apiCommsDeleteRequest(selectedDeleteItemId, auth.token));
    setModalShow(false);
  };

  const uploadLogoImage = e => {
    const imageFile = e.target.files[0];
    dispatch(
      apiProjectPatchRequest(
        {
          logo: imageFile,
        },
        sidebarState.selectedProject?.id,
        auth.token,
      ),
    );
  };

  function getFirstLetters(str = '') {
    const firstLetters = str
      .split(' ')
      .map(word => word[0])
      .join('');

    return firstLetters.toUpperCase().substr(0, 2);
  }
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

  const onSearchChange = e => setSearch(e.target.value);
  const onRemoveMember = user_id => {
    // setSideNavPage("Shoot Setup");
    dispatch(
      apiRemoveMemberRequest(user_id, selectProjectDetails?.id, auth.token),
    );
  };
  const handleSideNavPage = type => {
    if (type.title === SideNavPageType.ADD_COLLABORATORS.title)
      dispatch(apiListUserInformation('', auth.token));
    setShowRightNav(true);
    setSideNavPage(type.title);
    setRightNavTitle(type.title);
    setRightNavSubTitle(type.subTitle);
    setSearch('');
  };
  const onRightNavClose = () => {
    setShowRightNav(false);
    setSearch('');
  };
  const onAddMember = member => {
    dispatch(addMemberToSelectedProject(member));
    setSideNavPage(SideNavPageType.COLLABORATORS.title);
    dispatch(apiListUserInformation(search, auth.token));
  };
  const onInviteClicked = type => {
    const project_id = sidebarState.selectedProject?.id;
    if (validateEmail(search)) {
      dispatch(apiInviteRequest(search, type, project_id));
      setSearch('');
    } else {
      toast.error('Invalid email address!');
    }
  };
  const handleArchiveProject = () => {
    const status = sidebarState.selectedProject?.status === 1 ? 0 : 1;
    const project_id = sidebarState.selectedProject?.id;
    dispatch(apiProjectPatchRequest({ status }, project_id, auth.token));
  };

  const RightSideNavPage = ({ sideNavPage }) => {
    // const members = selectProjectDetails?.members;
    if (sideNavPage === SideNavPageType.COLLABORATORS.title) {
      return (
        <RightNavContent
          handleMemberUnAssign={onRemoveMember}
          members={members}
          membersTitle={`${members.length} Collaborators`}
          onCrewAdd={() => handleSideNavPage(SideNavPageType.ADD_COLLABORATORS)}
          myPermission={allowedPermissions}
        />
      );
    } else if (sideNavPage === SideNavPageType.ADD_COLLABORATORS.title) {
      return (
        <AddCollaboratorContent
          search={search}
          members={members}
          onAddMember={onAddMember}
          onInviteClicked={onInviteClicked}
          onRightNavClose={onRightNavClose}
        />
      );
    } else if (sideNavPage === SideNavPageType.ADD_EXTERNAL_LINKS.title) {
      const project_id = sidebarState.selectedProject?.id;
      return (
        <AddExternalLinks
          onRightNavClose={onRightNavClose}
          auth={auth}
          projectId={project_id}
        />
      );
    } else if (sideNavPage === SideNavPageType.ADD_COMMS.title) {
      const project_id = sidebarState.selectedProject?.id;
      return (
        <AddCommsContent
          onRightNavClose={onRightNavClose}
          auth={auth}
          projectId={project_id}
        />
      );
    } else if (sideNavPage === SideNavPageType.ADD_PROJECT_FILES.title) {
      const project_id = sidebarState.selectedProject?.id;
      return (
        <AddProjectFiles
          onRightNavClose={onRightNavClose}
          auth={auth}
          projectId={project_id}
        />
      );
    }
  };

  const moreDropdownOptions = {};
  moreDropdownOptions[types.EDIT_PROJECT_DETAILS] = (
    <DropdownOption onClick={onEditClicked}>
      <EditSquare />
      <span>Edit Project</span>
    </DropdownOption>
  );
  moreDropdownOptions[types.DUPLICATE_PROJECT] = (
    <DropdownOption onClick={onDuplicateClicked}>
      <Duplicate />
      <span>Duplicate</span>
    </DropdownOption>
  );
  moreDropdownOptions[types.ADD_COMMS] = (
    <DropdownOption
      onClick={() => handleSideNavPage(SideNavPageType.ADD_COMMS)}
    >
      <CommsIcon />
      <span>Manage Comms</span>
    </DropdownOption>
  );
  moreDropdownOptions[types.UPLOAD_FILE] = (
    <>
      <DropdownOption
        onClick={() => handleSideNavPage(SideNavPageType.ADD_EXTERNAL_LINKS)}
      >
        <ExternalLink />
        <span>Add External Links</span>
      </DropdownOption>
      <DropdownOption
        onClick={() => handleSideNavPage(SideNavPageType.ADD_PROJECT_FILES)}
      >
        <ExternalLink />
        <span>Attach Files</span>
      </DropdownOption>
    </>
  );
  // moreDropdownOptions[types.UPLOAD_FILE] = (
  //   <DropdownOption
  //     onClick={() => handleSideNavPage(SideNavPageType.ADD_PROJECT_FILES)}
  //   >
  //     <ExternalLink />
  //     <span>Attach Files</span>
  //   </DropdownOption>
  // );
  moreDropdownOptions[types.ARCHIVE_PROJECT] = (
    <DropdownOption onClick={handleArchiveProject}>
      <Archive width="20" height="20" />
      <span>
        {selectProjectDetails?.status === 1
          ? 'Archive Project'
          : 'Unarchive Project'}
      </span>
    </DropdownOption>
  );
  moreDropdownOptions[types.DELETE_PROJECT] = (
    <DropdownOption>
      <TrashCan />
      <span
        onClick={() => {
          setModalShow(true);
          setModalDetails(ModalTypes['DELETE_PROJECT']);
        }}
      >
        Delete Project
      </span>
    </DropdownOption>
  );
  return (
    <DashboardLayout>
      {sidebarState.selectedProject && projectState?.isLoading === false ? (
        <>
          <ProjectCover bgImage={cover}></ProjectCover>
          <ProjectDetailsContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '48px',
                borderBottom: '1px solid #E4E7EC',
              }}
            >
              <ProjectTitleRow>
                <ProjectThumbnail
                  bgImage={sidebarState.selectedProject?.logo}
                  onClick={onEditClick}
                >
                  {sidebarState.selectedProject?.logo ? null : (
                    <span className="alpha-logo">
                      {getFirstLetters(sidebarState.selectedProject?.name)}
                    </span>
                  )}
                  <span className="edit-icon">
                    <img
                      src={cameraIcon}
                      className="d-block w-100"
                      alt="Edit"
                    />
                  </span>
                  <input
                    type="file"
                    onChange={uploadLogoImage}
                    ref={inputFile}
                    className="d-none"
                  />
                </ProjectThumbnail>
                <ProjectTitleContainer>
                  <ProjectTitle>
                    {sidebarState.selectedProject?.name}
                    <ProjectLabel status={sidebarState.selectedProject?.status}>
                      {sidebarState.selectedProject?.status
                        ? 'Active'
                        : 'Archived'}{' '}
                    </ProjectLabel>
                  </ProjectTitle>
                  <CompanyName>
                    {sidebarState.selectedProject?.client}
                  </CompanyName>
                </ProjectTitleContainer>
              </ProjectTitleRow>

              <ProjectTitleRow>
                <ProjectMembersContainer>
                  <span>Project Collaborators</span>
                  <ProjectMembersProfile>
                    {selectProjectDetails?.members?.slice(0, 5).map(member => (
                      <Avatar
                        bgImage={member.profile_image}
                        key={member.user}
                        onClick={() =>
                          handleSideNavPage(SideNavPageType.COLLABORATORS)
                        }
                      >
                        {member.profile_image
                          ? null
                          : acrynom(`${member.first_name}`)}
                      </Avatar>
                    ))}
                    {selectProjectDetails?.members?.length > 5 ? (
                      <Avatar
                        key={'more'}
                        onClick={() =>
                          handleSideNavPage(SideNavPageType.COLLABORATORS)
                        }
                      >{`+${
                        selectProjectDetails?.members?.length - 5
                      }`}</Avatar>
                    ) : null}
                    {allowedPermissions?.includes(types.ADD_COLLABORATORS) ? (
                      <AddAvatar
                        key="plus"
                        onClick={() =>
                          handleSideNavPage(SideNavPageType.ADD_COLLABORATORS)
                        }
                      />
                    ) : null}
                  </ProjectMembersProfile>
                </ProjectMembersContainer>
                {allowedPermissions &&
                  allowedPermissions[0] !== types.NO_PERMISSION && (
                    <div className="dropdown me-1">
                      <MoreButton
                        className="btn"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <More stroke="#344054" />
                      </MoreButton>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuOffset"
                        style={{ paddingTop: '4px', paddingBottom: '4px' }}
                      >
                        {allowedPermissions &&
                          allowedPermissions?.map(
                            option => moreDropdownOptions[option],
                          )}
                        <>
                          {' '}
                          {/* <DropdownOption
                            onClick={() =>
                              handleSideNavPage(SideNavPageType.ADD_COMMS)
                            }
                          >
                            <CommsIcon />
                            <span>Manage Comms</span>
                          </DropdownOption>
                          <DropdownOption
                            onClick={() =>
                              handleSideNavPage(
                                SideNavPageType.ADD_EXTERNAL_LINKS,
                              )
                            }
                          >
                            <ExternalLink />
                            <span>Add External Links</span>
                          </DropdownOption>
                          <DropdownOption
                            onClick={() =>
                              handleSideNavPage(
                                SideNavPageType.ADD_PROJECT_FILES,
                              )
                            }
                          >
                            <ExternalLink />
                            <span>Attach Files</span>
                          </DropdownOption> */}
                        </>
                      </ul>
                    </div>
                  )}
              </ProjectTitleRow>
            </div>
            <ProjectSummaryRow className="row">
              <div className="col-lg-7">
                <NoteHeading>Description</NoteHeading>
                <NoteText>{sidebarState.selectedProject?.description}</NoteText>
              </div>
              <div className="col-lg-5">
                <div className="row">
                  <div className="col-sm-12">
                    <ProjectProperty>Project Dates</ProjectProperty>

                    {projectDates ? (
                      <CustomCalendar
                        isAuthorized={
                          allowedPermissions?.includes(types.PROJECT_DATES) ||
                          false
                        }
                        dateOptions={dateOptions}
                        onDateChange={onDateChange}
                        state={projectDates}
                        setState={setProjectDates}
                      />
                    ) : null}
                  </div>
                  {selectProjectDetails?.location && (
                    <div className="col-sm-12" style={{ marginTop: '32px' }}>
                      <ProjectProperty>Location</ProjectProperty>
                      <ProjectPropertyValue>
                        {sidebarState.selectedProject?.location}
                      </ProjectPropertyValue>

                      <ViewMapButton
                        href={`http://maps.google.com/maps?q=${selectProjectDetails?.location}`}
                        target="_blank"
                      >
                        View Map
                      </ViewMapButton>
                    </div>
                  )}
                </div>
              </div>
            </ProjectSummaryRow>

            <div
              className="row gy-3"
              style={{ marginTop: '48px', marginBottom: '75px' }}
            >
              {allowedPermissions &&
              allowedPermissions[0] !== types.NO_PERMISSION &&
              projectState.projectFiles?.length
                ? projectState.projectFiles.map(link => (
                    <div className="col-lg-6 col-xl-4" key={link.id}>
                      <DocumentCard
                        btnTitle="View"
                        url={link.file}
                        title={filename(link?.file?.split('/')?.pop())}
                        key={link.id}
                        subTitle={link?.file?.split('.')?.pop()?.toUpperCase()}
                        description={`Modified: ${moment(
                          link.updated_at,
                        ).format('MMM DD, YYYY')} at ${moment(
                          link.updated_at,
                        ).format('LT')}`}
                        deleteAction={
                          <EachCollabolatorsP2P
                            onClick={() => {
                              setModalShow(true);
                              setModalDetails(
                                ModalTypes['DELETE_PROJECT_FILE'],
                              );
                              setSelectedDeleteItemId(link.id);
                            }}
                            role="button"
                          >
                            Delete
                          </EachCollabolatorsP2P>
                        }
                      />
                    </div>
                  ))
                : null}

              {allowedPermissions &&
              allowedPermissions[0] !== types.NO_PERMISSION &&
              projectState.projectLinks?.length
                ? projectState.projectLinks.map(link => (
                    <div className="col-lg-6 col-xl-4" key={link.id}>
                      <DocumentCard
                        btnTitle="Open"
                        image={linkIcon}
                        url={link.url}
                        title={link.title}
                        subTitle="External Link"
                        key={link.id}
                        description={`Modified: ${moment(
                          link.updated_at,
                        ).format('MMM DD, YYYY')} at ${moment(
                          link.updated_at,
                        ).format('LT')}`}
                        deleteAction={
                          <EachCollabolatorsP2P
                            onClick={() => {
                              setModalShow(true);
                              setModalDetails(
                                ModalTypes['DELETE_PROJECT_LINK'],
                              );
                              setSelectedDeleteItemId(link.id);
                            }}
                            role="button"
                          >
                            Delete
                          </EachCollabolatorsP2P>
                        }
                      />
                    </div>
                  ))
                : null}
            </div>
          </ProjectDetailsContainer>
        </>
      ) : (
        <Loader />
      )}

      {showRightNav && (
        <RightNavContainer style={{ position: 'fixed', top: '0', right: '0' }}>
          <CloseIcon onClick={onRightNavClose}>
            <X />
          </CloseIcon>

          <NavTitle>
            {rightNavTitle}
            <br />
            <span>{rightNavSubTitle}</span>
          </NavTitle>

          {sideNavPage !== SideNavPageType.ADD_EXTERNAL_LINKS.title &&
          sideNavPage !== SideNavPageType.ADD_PROJECT_FILES.title &&
          sideNavPage !== SideNavPageType.ADD_COMMS.title ? (
            <SearchBarContainer>
              <SearchBar onChange={onSearchChange} value={search} />
            </SearchBarContainer>
          ) : null}

          <SideBarContent>
            <RightSideNavPage sideNavPage={sideNavPage} />
          </SideBarContent>
        </RightNavContainer>
      )}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        icon={errorIcon}
        title={modalDetails.title}
        body={modalDetails.body}
        footer={modalFooter}
      />
    </DashboardLayout>
  );
};

export default ProjectOverviewPage;
