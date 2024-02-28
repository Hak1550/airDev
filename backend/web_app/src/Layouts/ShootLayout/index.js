import React, { useEffect, useState } from 'react';
import X from '../../Components/Icons/X';
import ProjectTopNav from '../../Components/ProjectTopNav';
import SearchBar from '../../Components/SearchBar';
import { isMobile } from 'react-device-detect';

import {
  CloseIcon,
  ContentGround,
  LayoutContainer,
  NavTitle,
  RightNavContainer,
  RightNavToggle,
  RightNavToggleImg,
  SearchBarContainer,
  SideBarContent,
  SiteContainer,
} from './styles';
import Left from '../../Assets/images/left-2.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRightNavOnMobile, toggleSidePan } from 'Redux/actions/shoot';
const ShootLayout = ({
  children,
  onPublish,
  onSaveDraft,
  isCanvasDirty,
  onSearchChange,
  onNavToggle,
  rightNavContent,
  rightNavTitle,
  myPermission,
  onBoardCameraForm,
  selectProjectDetails,
  hasRightNav = true,
  imageSize,
  search,
}) => {
  const [showRightNav, setShowRightNav] = useState(true);
  const [showRightNavonCell, setShowRightNavonCell] = useState(false);
  const { toggle_right_nav_on_cell } = useSelector(state => state.shoot);
  const dispatch = useDispatch();
  const onRightNavClose = () => {
    setShowRightNav(false);
  };

  const toggleSideNav = () => {
    setShowRightNav(prev => !prev);
  };

  const toggleSideNavonCell = () => {
    onNavToggle();
    dispatch(toggleRightNavOnMobile());
    // dispatch(toggleSidePan());
    onNavToggle();
  };
  useEffect(() => {
    setShowRightNavonCell(toggle_right_nav_on_cell);
  }, [toggle_right_nav_on_cell]);
  // console.log('onCell', showRightNavonCell);

  var screenWidth = window.innerWidth;
  // console.log('re-render', isMobile, screenWidth, typeof screenWidth);

  useEffect(() => {
    onNavToggle();
  }, [showRightNav]);
  return (
    <LayoutContainer>
      <ContentGround onBoardCameraForm={onBoardCameraForm}>
        <ProjectTopNav
          isCanvasDirty={isCanvasDirty}
          onPublish={onPublish}
          onSaveDraft={onSaveDraft}
          onMenuClick={toggleSideNav}
          myPermission={myPermission}
          selectProjectDetails={selectProjectDetails}
        />
        {screenWidth < +600 && (
          <RightNavToggle onClick={toggleSideNavonCell}>
            <RightNavToggleImg
              src={Left}
              showRightNavonCell={showRightNavonCell}
            />
          </RightNavToggle>
        )}
        <SiteContainer
          imageSize={imageSize}
          screenWidth={screenWidth}
          isMobile={isMobile}
          showRightNavonCell={showRightNavonCell}
        >
          {children}
        </SiteContainer>
      </ContentGround>
      {showRightNav && hasRightNav && (
        <RightNavContainer
          imageSize={imageSize}
          isMobile={isMobile}
          screenWidth={screenWidth}
          showRightNavonCell={showRightNavonCell}
        >
          {/* <CloseIcon onClick={onRightNavClose}>
            <X />
          </CloseIcon> */}

          <NavTitle>{rightNavTitle}</NavTitle>
          {rightNavTitle !== 'On Boarding Gear' &&
            rightNavTitle !== 'Shoot Menu' &&
            rightNavTitle !== 'Instance Info' &&
            rightNavTitle !== 'Camera Info' && (
              <SearchBarContainer>
                <SearchBar value={search} onChange={onSearchChange} />
              </SearchBarContainer>
            )}
          <SideBarContent>{rightNavContent}</SideBarContent>
        </RightNavContainer>
      )}
    </LayoutContainer>
  );
};

export default ShootLayout;
