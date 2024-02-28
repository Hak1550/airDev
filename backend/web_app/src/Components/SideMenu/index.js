import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoMark from '../LogoMark';
import * as types from '../../Config/permissionConstant';
import {
  SideMenuContainer,
  LogoContainer,
  NavIconsContainer,
  NavIconList,
  IconListItem,
  NavItemLink,
  IconListFullWidth,
  Avatar,
  MinMaxButton,
  AvatarButton,
  AlphaLogo,
} from './styles';
import Divider from '../Divider';
import LifeBouy from '../Icons/LifeBouy';
import Settings from '../Icons/Settings';
import Maximize from '../Icons/Maximize';
import Plus from '../Icons/Plus';
import avatar from '../../Assets/images/avatar.png';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AddNewButton } from '../../Layouts/DashboardLayout/styles';
import Minimize from '../Icons/Minimize';
import SideBarStatus from '../../Enums/SideBarStatus';
import {
  hideSideBarPage,
  showSideBarPage,
  updateSideBarState,
} from '../../Redux/actions/sidebar';
import SideBarPageType from '../../Enums/SideBarPageType';
import { clearToken, setLoginCallBack } from '../../Redux/actions/login';
import {
  apiProjectGetRequest,
  apiProjectGetSuccess,
  resetProject,
  resetProjectState,
} from '../../Redux/actions/project';
import Archive from 'Components/Icons/Archive';
import Media from 'Components/Icons/Media';
import Film from 'Components/Icons/Film';
import sampleProject from 'Assets/images/sampleProject.svg';
import { showWelcomeModal, updateTutorialState } from 'Redux/actions/tutorial';
import {
  apiGetUserInformation,
  apiPatchUserInformation,
} from 'Redux/actions/user_information';
import PlusNaked from 'Components/Icons/PlusNaked';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getObjectByLowestValue } from '../../Utils/permissions';
import { toggleSidePan } from 'Redux/actions/shoot';

const SideMenu = () => {
  const [logoutClicked, setLogoutClicked] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const { project_id } = useParams();

  const projectState = useSelector(state => state.project);
  const sidebarState = useSelector(state => state.sidebar);
  const auth = useSelector(state => state.auth);
  const tutorialState = useSelector(state => state.tutorial);
  const userInformation = useSelector(state => state.userInformation);
  const showModal = userInformation?.data?.tutorial;
  const role = auth?.organisation_permission?.role;
  // const allowedPermission = auth?.organisation_permission?.allowed_permissions;
  const allowedPermission = getObjectByLowestValue(
    userInformation?.data?.organisation_data,
    'role',
  )?.allowed_permissions;

  const onLogoutClicked = e => {
    if (
      userInformation?.data?.organisation_data &&
      userInformation?.data?.organisation_data?.length > 0 &&
      userInformation?.data?.first_login === true
    )
      dispatch(
        apiPatchUserInformation(
          { first_login: false },
          auth.user_information?.id,
          auth?.token,
          null,
          false,
        ),
      );
    e.preventDefault();
    const tutorialPayload = {
      ...tutorialState,
      isTour: false,
    };
    dispatch(updateTutorialState(tutorialPayload));
    setLogoutClicked(true);
    dispatch(showWelcomeModal(true));
    dispatch(clearToken(auth.token));
    dispatch(resetProjectState());
  };

  useEffect(() => {
    if (auth.token) {
      dispatch(apiProjectGetRequest(auth.token));
      dispatch(apiGetUserInformation(auth.user_information?.id, auth.token));
    }
  }, []);

  useEffect(() => {
    if (projectState.success) {
      dispatch(resetProject());
      updateSideBarState({
        ...sidebarState,
        pageType: SideBarPageType.PROJECT,
        status: SideBarStatus.OPEN,
      });
    } else if (projectState.postSuccess) {
      dispatch(resetProject());
      dispatch(
        updateSideBarState({
          ...sidebarState,
          pageType: SideBarPageType.PROJECT,
          status: SideBarStatus.OPEN,
        }),
      );
    }
  }, [projectState.success, projectState.postSuccess]);
  useEffect(() => {
    if (logoutClicked || auth.token === null) {
      // dispatch(
      //   setLoginCallBack(history.location.pathname + history.location.search),
      // );
      // history.push('/login');
      history.replace('/login');
    }
  }, [logoutClicked, auth, history]);

  const toggleSidebarPage = () => {
    dispatch(toggleSidePan());
    if (sidebarState.status === SideBarStatus.OPEN) {
      dispatch(hideSideBarPage());
    } else {
      dispatch(showSideBarPage());
    }
  };

  const addNewProjectClicked = () => {
    dispatch(
      updateSideBarState({
        ...sidebarState,
        pageType: SideBarPageType.ADD_PROJECT,
        status: SideBarStatus.OPEN,
      }),
    );
  };

  return (
    <SideMenuContainer className={'side-menu'}>
      <LogoContainer
        to={
          auth.user_information?.first_login ? '/' : '/settings/account-details'
        }
      >
        <LogoMark />
      </LogoContainer>
      <Divider />
      <NavIconsContainer className="sticky-top">
        <NavIconList
          className="nav"
          style={{
            height: 'calc(100vh - 495px)',
            justifyContent: 'flex-start',
          }}
        >
          {auth.user_information?.first_login && showModal === true && (
            <IconListItem
              key="0"
              className="sample-project"
              isSelected={
                sidebarState.selectedProject?.id === '0' ? true : false
              }
            >
              <Link to="#" className="text-decoration-none">
                <img
                  style={{ width: '100%', display: 'block' }}
                  src={sampleProject}
                  alt={'Sample Project'}
                />
              </Link>
            </IconListItem>
          )}

          {projectState?.projectList?.map(
            project =>
              project.status !== 0 && (
                <OverlayTrigger
                  key={project?.id}
                  placement={'right'}
                  overlay={
                    <Tooltip id={`tooltip-${project?.id}`}>
                      {project.name}
                    </Tooltip>
                  }
                >
                  <IconListItem
                    key={project?.id}
                    isSelected={
                      (sidebarState.selectedProject?.id === project?.id &&
                        project_id) ||
                      false
                    }
                  >
                    <Link
                      to={`/project/overview/${project?.id}`}
                      className="text-decoration-none"
                    >
                      {project?.logo ? (
                        <img
                          style={{ width: '100%', display: 'block' }}
                          src={project?.logo}
                          alt={project?.id}
                        />
                      ) : (
                        <AlphaLogo>{project?.name[0].toUpperCase()}</AlphaLogo>
                      )}
                    </Link>
                  </IconListItem>
                </OverlayTrigger>
              ),
          )}
          {allowedPermission?.PROJECTS?.includes(types.CREATE_PROJECT) && (
            <OverlayTrigger
              key={'add-project'}
              placement={'right'}
              overlay={
                <Tooltip id={`tooltip-add-project`}>Add New Project</Tooltip>
              }
            >
              <IconListItem>
                <AddNewButton onClick={addNewProjectClicked}>
                  <PlusNaked strokeColor="#667085" />{' '}
                </AddNewButton>
              </IconListItem>
            </OverlayTrigger>
          )}
        </NavIconList>
        <NavIconList className="nav">
          {(auth.user_information?.first_login && showModal === true) ||
          allowedPermission?.MY_MEDIA ? (
            <OverlayTrigger
              key={'my-media'}
              placement={'right'}
              overlay={<Tooltip id={`tooltip-my-media`}>My Media</Tooltip>}
            >
              <IconListItem>
                <NavItemLink
                  to={allowedPermission?.MY_MEDIA ? '/media/assets' : '#'}
                  className="media"
                >
                  <Film />
                </NavItemLink>
              </IconListItem>
            </OverlayTrigger>
          ) : null}

          {(auth.user_information?.first_login && showModal === true) ||
          allowedPermission?.ARCHIVED_PROJECTS ? (
            <OverlayTrigger
              key={'archived-projects'}
              placement={'right'}
              overlay={
                <Tooltip id={`tooltip-archived-projects`}>
                  Archived Projects
                </Tooltip>
              }
            >
              <IconListItem className="archive-projects">
                <NavItemLink
                  to={
                    allowedPermission?.ARCHIVED_PROJECTS
                      ? '/archive-projects'
                      : '#'
                  }
                  className="archive"
                >
                  <Archive />
                </NavItemLink>
              </IconListItem>
            </OverlayTrigger>
          ) : null}

          <OverlayTrigger
            key={'help-rticles'}
            placement={'right'}
            overlay={
              <Tooltip id={`tooltip-help-articles`}>Help Articles</Tooltip>
            }
          >
            <IconListItem>
              <NavItemLink to="#" className="help-desk">
                <LifeBouy />
              </NavItemLink>
            </IconListItem>
          </OverlayTrigger>
          {/* <IconListItem>
            <NavItemLink to="/settings/account-details">
              <Settings />
            </NavItemLink>
          </IconListItem> */}
          <OverlayTrigger
            key={'minmax'}
            placement={'right'}
            overlay={
              <Tooltip id={`tooltip-minmax`}>
                {sidebarState?.status !== SideBarStatus.OPEN
                  ? 'Expand'
                  : 'Collapse'}
              </Tooltip>
            }
          >
            <IconListItem>
              <MinMaxButton onClick={toggleSidebarPage}>
                {sidebarState?.status === SideBarStatus.OPEN ? (
                  <Minimize />
                ) : (
                  <Maximize />
                )}
              </MinMaxButton>
            </IconListItem>
          </OverlayTrigger>
          <IconListFullWidth>
            <Divider />
          </IconListFullWidth>
          <IconListFullWidth>
            <OverlayTrigger
              key={'my-settings'}
              placement={'right'}
              overlay={
                <Tooltip id={`tooltip-my-settings`}>My Settings</Tooltip>
              }
            >
              <AvatarButton
                className="btn account-settings"
                type="button"
                data-bs-toggle="dropdown"
              >
                <Avatar
                  src={auth.user_information?.profile_image || avatar}
                  alt=""
                />
              </AvatarButton>
            </OverlayTrigger>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
              <li>
                <Link className="dropdown-item" to="/settings/account-details">
                  Account Details
                </Link>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={onLogoutClicked}>
                  Logout
                </a>
              </li>
            </ul>
          </IconListFullWidth>
        </NavIconList>
      </NavIconsContainer>
    </SideMenuContainer>
  );
};

export default SideMenu;
