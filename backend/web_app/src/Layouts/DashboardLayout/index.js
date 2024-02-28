import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  MainContentColumn,
  MainContentColumn2,
  ProjectPageLink,
  SideMenuFooter,
  SideMenuPageContent,
  SideMenuPageHeader,
  SideMenuPageTitle,
  SideNavColumn,
} from './styles';

import SideMenuPage from '../../Components/SideMenuPage';
import { SideMenuList, SideMenuListItem } from '../../Components/CommonStyles';
import SideMenu from '../../Components/SideMenu';
import SideBarStatus from '../../Enums/SideBarStatus';

import { updateSideBarState } from '../../Redux/actions/sidebar';
import SideBarPageType from '../../Enums/SideBarPageType';
import AddProjectPage from '../../Components/AddProjectPage';
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { updateTutorialState } from 'Redux/actions/tutorial';
import { setLoginCallBack } from 'Redux/actions/login';
import { apiPatchUserInformation } from 'Redux/actions/user_information';
import {
  apiGetProjectFilesRequest,
  apiGetProjectLinksRequest,
} from 'Redux/actions/project';
import { getObjectByLowestValue } from 'Utils/permissions';
import {
  COMMS,
  EDIT_SETUP_SCREEN,
  MULTIVIEW,
  PROGRAM_FEED_FILE,
  PROJECTS_SCREEN_VISABILITY,
  SHOOT_SETUP_SCREEN,
} from 'Config/permissionConstant';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import truncate from 'Utils/trancate';

const DashboardLayout = ({ children }) => {
  const sidebarState = useSelector(state => state.sidebar);
  const projectState = useSelector(state => state.project);
  const tutorialState = useSelector(state => state.tutorial);
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);

  if (tutorialState?.run) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const { project_id } = useParams();
  useEffect(() => {
    // const tutorialPayload = {
    //   ...tutorialState,
    //   run: tutorialState?.run,
    // };
    // dispatch(updateTutorialState(tutorialPayload));
    let payload = {
      status: SideBarStatus.OPEN,
      pageType: projectState.postSuccess
        ? SideBarPageType.PROJECT
        : sidebarState.pageType,
      selectedProject: null,
    };
    if (project_id && project_id !== 'undefined' && projectState?.projectList) {
      let selectedProject = {
        id: '0',
        owner: {
          id: 15,
          first_name: '',
          last_name: '',
          username: 'arafat_ul_007',
          email: 'arafat007@mailinator.com',
        },
        organisation: {
          id: 26,
          name: 'AI ORG',
          owner: 15,
          camera: [1],
        },
        logo: null,
        cover_image: null,
        project_id: 'fczvxodlvr0kqpv8c3jypp',
        name: 'Sample Project',
        client: 'AIR',
        location: '',
        shoot_date: '2022-09-30',
        shoot_start_date: null,
        shoot_end_date: '2022-09-30',
        shoot_time: '12:19:58',
        description: null,
        members: [
          {
            user: 19,
            user_details: {
              id: 19,
              first_name: '',
              last_name: '',
              username: '001_arafat_islam',
              email: 'arafat001@mailinator.com',
            },
            first_name: '001 Arafat',
            last_name: 'Islam',
            nick_name: '',
            profile_image: 'backend/user/18/AIR_traffic_control.png',
            phone: '+8801521433158',
            role: 13,
            is_active: true,
            role_obj: {
              id: 13,
              name: 'NO_ROLE',
            },
          },
        ],
        properties: {},
        status: 1,
        permission_obj: [
          {
            role: {
              id: 1,
              name: 'ADMIN',
            },
            allowed_permissions: [
              'CREATE_PROJECT',
              'EDIT_PROJECT_DETAILS',
              'DUPLICATE_PROJECT',
              'ADD_COLLABORATORS',
              'PROJECT_DATES',
              'PROJECTS_SCREEN_VISABILITY',
              'SHOOT_SETUP_SCREEN',
              'VIDEO_AUDIO_ROUTING',
              'CAMERA_ASSIGN',
              'CAMERA_CONTROL',
              'COMMS',
              'EC2_CREATE',
              'EC2_ACCESS',
              'MULTIVIEW',
              'PROGRAM_FEED_FILE',
              'UPLOAD_FILE',
              'FILE_MOVEMENT',
              'USAGE_AND_BILLING',
              'EDIT_SETUP_SCREEN',
              'MEDIA_ASSET_MGMNT',
              'QR_SCAN',
              'ARCHIVE_PROJECT',
              'DELETE_PROJECT',
              'ONBOARD_CAMERA',
            ],
          },
        ],
        created_at: '2022-09-29T18:20:03.398648Z',
        updated_at: '2022-09-29T18:20:03.398918Z',
        is_published: false,
      };
      selectedProject =
        project_id === '0'
          ? selectedProject
          : projectState.projectList?.find(p => p.id === parseInt(project_id));
      if (!selectedProject) history.push('/404');

      if (sidebarState.newMember) {
        // prev members
        const members = sidebarState.selectedProject.members;
        selectedProject.members = JSON.parse(JSON.stringify(members));
      }

      payload = {
        status:
          project_id == sidebarState.selectedProject?.id
            ? SideBarStatus.OPEN
            : SideBarStatus.OPEN,
        pageType: projectState.postSuccess
          ? SideBarPageType.PROJECT
          : sidebarState.pageType,
        selectedProject: selectedProject,
      };
    } else {
      if (projectState.projectList?.length > 0) {
        const selectedProject = projectState.projectList[0];
        if (sidebarState.newMember) {
          // prev members
          const members = sidebarState.selectedProject.members;
          selectedProject.members = JSON.parse(JSON.stringify(members));
        }

        payload = {
          status:
            project_id == sidebarState.selectedProject?.id
              ? SideBarStatus.OPEN
              : SideBarStatus.OPEN,
          pageType: projectState.postSuccess
            ? SideBarPageType.PROJECT
            : sidebarState.pageType,
          selectedProject: selectedProject,
        };
      }
      // else {
      //   history.push('/');
      // }
    }
    dispatch(updateSideBarState(payload));
    if (tutorialState?.tourActive)
      setTimeout(() => {
        const tutorialPayload = {
          ...tutorialState,
          run: true,
          tourActive: false,
        };
        dispatch(updateTutorialState(tutorialPayload));
      }, 100);
  }, [project_id, projectState.projectList, sidebarState.pageType]);

  useEffect(() => {
    if (
      project_id &&
      project_id !== 'undefined' &&
      project_id !== '0' &&
      auth.token
    ) {
      dispatch(apiGetProjectLinksRequest(project_id, auth.token));
      dispatch(apiGetProjectFilesRequest(project_id, auth.token));
    }
  }, [project_id]);

  useEffect(() => {
    const tutorialPayload = {
      ...tutorialState,
      run: tutorialState?.run,
    };
    dispatch(updateTutorialState(tutorialPayload));
    dispatch(setLoginCallBack(null));
  }, []);

  // useMount(() => {
  //   setState({ run: true });
  // });
  const [currTab, setCurrTab] = useState(null);

  const getPageName = () => {
    if (
      sidebarState.pageType === SideBarPageType.ADD_PROJECT ||
      project_id === 'undefined'
    ) {
      return 'Add New Project';
    } else if (sidebarState.pageType === SideBarPageType.EDIT_PROJECT) {
      return 'Edit Project';
    } else if (sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT) {
      return 'Duplicate Project';
    } else if (sidebarState.pageType === SideBarPageType.PROJECT) {
      return `${truncate(sidebarState.selectedProject?.name, 15)}`;
    }
  };

  const getPage = () => {
    if (project_id === 'undefined') return <AddProjectPage />;
    if (sidebarState.pageType === SideBarPageType.ADD_PROJECT) {
      return <AddProjectPage />;
    } else if (sidebarState.pageType === SideBarPageType.EDIT_PROJECT) {
      return <AddProjectPage />;
    } else if (sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT) {
      return <AddProjectPage />;
    } else if (sidebarState.pageType === SideBarPageType.PROJECT) {
      const project_id = sidebarState.selectedProject?.id;
      const allowedPermissions =
        sidebarState.selectedProject &&
        getObjectByLowestValue(
          sidebarState.selectedProject?.permission_obj,
          'role',
        )?.allowed_permissions;

      return (
        <SideMenuList>
          {allowedPermissions?.includes(PROJECTS_SCREEN_VISABILITY) && (
            <ProjectPageLink
              to={`/project/overview/${project_id}`}
              className="overview"
            >
              <SideMenuListItem>Overview</SideMenuListItem>
            </ProjectPageLink>
          )}
          {allowedPermissions?.includes(EDIT_SETUP_SCREEN) && (
            <ProjectPageLink
              to={`/project/shoot-setup/${project_id}`}
              className="shoot-setup"
            >
              <SideMenuListItem>Shoot Setup</SideMenuListItem>
            </ProjectPageLink>
          )}
          {allowedPermissions?.includes(SHOOT_SETUP_SCREEN) && (
            <ProjectPageLink
              to={`/project/launchpad/${project_id}`}
              className="launchpad"
            >
              <SideMenuListItem>Launchpad</SideMenuListItem>
            </ProjectPageLink>
          )}
          {/* <ProjectPageLink to={`/project/virtual-workstation/${project_id}`}>
            <SideMenuListItem>Virtual Workstation</SideMenuListItem>
          </ProjectPageLink> */}
          {/* <ProjectPageLink to={`/project/launchpad/${project_id}`}>
            <SideMenuListItem>Camera Control</SideMenuListItem>
          </ProjectPageLink> */}
          {allowedPermissions?.includes(COMMS) && (
            <ProjectPageLink
              to={`/project/comms/${project_id}`}
              className="comms"
            >
              <SideMenuListItem>Comms</SideMenuListItem>
            </ProjectPageLink>
          )}
          {/* {allowedPermissions?.includes(PROGRAM_FEED_FILE) && (
            <ProjectPageLink
              to={`/project/program-feed/${project_id}`}
              className="program-feed"
            >
              <SideMenuListItem>Program Feed</SideMenuListItem>
            </ProjectPageLink>
          )} */}
          {allowedPermissions?.includes(MULTIVIEW) && (
            <ProjectPageLink
              to={`/project/multiview/${project_id}`}
              className="multiview"
            >
              <SideMenuListItem>Viewers</SideMenuListItem>
            </ProjectPageLink>
          )}
          {/* <ProjectPageLink to={`/project/post-setup/${project_id}`}>
            <SideMenuListItem>Post Setup</SideMenuListItem>
          </ProjectPageLink> */}
        </SideMenuList>
      );
    }
  };

  const handleJoyrideCallback = data => {
    const { action, index, status, type } = data;
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      dispatch(
        updateTutorialState({
          ...tutorialState,
          stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
        }),
      );
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      const submitData = {
        tutorial: false,
      };
      if (
        userInformation?.data?.organisation_data &&
        userInformation?.data?.organisation_data?.length > 0
      )
        submitData['first_login'] = false;
      dispatch(
        apiPatchUserInformation(
          submitData,
          auth.user_information?.id,
          auth?.token,
          null,
          false,
        ),
      );
      dispatch(
        updateTutorialState({
          ...tutorialState,
          run: false,
          stepIndex: 0,
          tourActive: false,
          isTour: true,
        }),
      );
      if (
        userInformation?.data?.organisation_data &&
        userInformation?.data?.organisation_data?.length > 0
      )
        history.push('/settings/account-details');
      else history.push('/');
    }
    if (type === 'step:after' && index === 5) {
      if (history.location.pathname !== '/project/overview/0') {
        history.push('/project/overview/0');
        dispatch(
          updateTutorialState({
            ...tutorialState,
            stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
            run: false,
            tourActive: true,
          }),
        );
      }
    }
  };
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);
  let currTabFunc = getPage();
  let currTabIs = currTabFunc;
  return (
    <>
      <div className="container-fluid" style={{ padding: '0px' }}>
        <div className="d-flex">
          <SideNavColumn className="col-auto sticky-top">
            <SideMenu />
            {sidebarState.selectedProject?.id === '0' ||
            ((project_id ||
              sidebarState.pageType === SideBarPageType.ADD_PROJECT) &&
              sidebarState.status === SideBarStatus.OPEN) ? (
              <SideMenuPage tab={currTab} pageType={sidebarState.pageType}>
                {/* Header */}
                <SideMenuPageHeader>
                  <OverlayTrigger
                    key={'help-rticles'}
                    placement={'right'}
                    overlay={
                      <Tooltip id={`${sidebarState.selectedProject?.name}`}>
                        {sidebarState.selectedProject?.name}
                      </Tooltip>
                    }
                  >
                    <SideMenuPageTitle>{getPageName()}</SideMenuPageTitle>
                  </OverlayTrigger>
                </SideMenuPageHeader>
                <SideMenuPageContent>{getPage()}</SideMenuPageContent>
                <SideMenuFooter></SideMenuFooter>
              </SideMenuPage>
            ) : null}
          </SideNavColumn>
          {screenSize > 1000 ? (
            <MainContentColumn
              className={
                sidebarState.pageType === SideBarPageType.ADD_PROJECT
                  ? 'd-none'
                  : 'col min-vh-100'
              }
            >
              {children}
            </MainContentColumn>
          ) : (
            <MainContentColumn2
              className={
                sidebarState.pageType === SideBarPageType.ADD_PROJECT
                  ? 'd-none'
                  : 'col min-vh-100'
              }
            >
              {children}
            </MainContentColumn2>
          )}
        </div>
      </div>
      <ReactJoyride
        callback={handleJoyrideCallback}
        continuous
        run={tutorialState?.run}
        hideCloseButton
        disableOverlayClose
        disableScrolling={true}
        disableScrollParentFix={true}
        showSkipButton
        stepIndex={tutorialState?.stepIndex}
        steps={tutorialState?.steps}
        spotlightPadding={0}
        spotlightClicks={false}
        scrollToFirstStep={true}
        // disableOverlay={true}
        floaterProps={{
          placement: tutorialState?.stepIndex === 4 ? 'right-end' : 'right',
          styles: {
            arrow: {
              length: 6,
              spread: 12,
            },
          },
        }}
        styles={{
          options: {
            backgroundColor: '#101828',
            zIndex: 9999,
            arrowColor: '#101828',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            textColor: '#FFFFFF',
            width: 320,
          },
          buttonSkip: {
            color: '#667085',
            fontSize: 14,
            fontWeight: 500,
          },
          buttonNext: {
            outlineColor: '#7F56D9',
            backgroundColor: '#7F56D9',
            width: 64,
            height: 40,
            fontSize: 14,
            fontWeight: 500,
          },
          buttonBack: {
            color: '#667085',
            fontSize: 14,
            fontWeight: 500,
          },
          tooltip: {
            borderRadius: '8px',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltipTitle: {
            fontSize: 12,
            fontWeight: 600,
            margin: '0 0 4px 0',
          },
          tooltipContent: {
            padding: '0px',
            fontSize: 12,
            fontWeight: 400,
          },
          spotlight: {
            borderRadius: 0,
            width: '450px',
            height: '100%',
          },
        }}
        locale={{ last: 'Finish', back: 'Previous' }}
      />
    </>
  );
};

export default DashboardLayout;
