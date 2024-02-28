import React from 'react';
import { useSelector } from 'react-redux';
import truncate from '../../Utils/trancate';
import { OutlinedButton } from '../IconButton/styles';
import moment from 'moment';
import {
  Badge,
  ButtonDateDiv,
  NavContainer,
  PublishButton,
  PublishedDate,
} from './styles';
import * as types from 'Config/permissionConstant';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';

const ProjectTopNav = ({
  isCanvasDirty,
  onSaveDraft,
  onPublish,
  onMenuClick,
  myPermission,
  selectProjectDetails,
}) => {
  const sidebarState = useSelector(state => state.sidebar);
  const shootState = useSelector(state => state.shoot);
  let screenWidth = window.innerWidth;
  const isNotMobileScreen = screenWidth > 600;
  // console.log('isNotMobileScreen', isNotMobileScreen);
  return (
    <NavContainer>
      {isNotMobileScreen && (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item"
              title={sidebarState.selectedProject?.name}
            >
              {truncate(sidebarState.selectedProject?.name, 20)}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Badge onClick={onMenuClick}>Shoot Setup</Badge>
            </li>
          </ol>
        </nav>
      )}
      <ButtonDateDiv>
        {myPermission?.includes(types.EDIT_SETUP_SCREEN) && (
          <>
            <PublishedDate>
              {' '}
              Published:{' '}
              {selectProjectDetails?.updated_at
                ? moment(selectProjectDetails?.updated_at).calendar()
                : selectProjectDetails?.created_at}
            </PublishedDate>
            {/* <PublishedDate>Published: Jan 17, 2022 at 6:35pm</PublishedDate> */}

            <OutlinedButton
              className="btn"
              disabled={shootState.isLoading || !isCanvasDirty}
              onClick={onSaveDraft}
            >
              Save Draft
            </OutlinedButton>
            <PublishButton
              className="btn btn-primary"
              disabled={shootState.isLoading}
              onClick={onPublish}
            >
              Publish
            </PublishButton>
          </>
        )}
      </ButtonDateDiv>
    </NavContainer>
  );
};

export default ProjectTopNav;
