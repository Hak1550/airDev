import React, { useEffect, useState } from 'react';
import X from '../../Components/Icons/X';
import ProjectTopNav from '../../Components/ProjectTopNav';
import SearchBar from '../../Components/SearchBar';
import {
  CloseIcon,
  ContentGround,
  LayoutContainer,
  NavTitle,
  RightNavContainer,
  SearchBarContainer,
  SideBarContent,
  SiteContainer,
} from './styles';

const ProjectLayout = ({
  children,
  onPublish,
  onSaveDraft,
  isCanvasDirty,
  onSearchChange,
  onNavToggle,
  rightNavContent,
  rightNavTitle,
  hasRightNav = true,
}) => {
  const [showRightNav, setShowRightNav] = useState(true);

  const onRightNavClose = () => {
    setShowRightNav(false);
  };

  const toggleSideNav = () => {
    setShowRightNav(prev => !prev);
  };

  useEffect(() => {
    onNavToggle();
  }, [showRightNav]);

  return (
    <LayoutContainer>
      <ContentGround>
        <ProjectTopNav
          isCanvasDirty={isCanvasDirty}
          onPublish={onPublish}
          onSaveDraft={onSaveDraft}
          onMenuClick={toggleSideNav}
        />
        <SiteContainer>{children}</SiteContainer>
      </ContentGround>
      {showRightNav && hasRightNav && (
        <RightNavContainer>
          <CloseIcon onClick={onRightNavClose}>
            <X />
          </CloseIcon>

          <NavTitle>{rightNavTitle}</NavTitle>
          {rightNavTitle !== 'Add Gear' && (
            <SearchBarContainer>
              <SearchBar onChange={onSearchChange} />
            </SearchBarContainer>
          )}
          <SideBarContent>{rightNavContent}</SideBarContent>
        </RightNavContainer>
      )}
    </LayoutContainer>
  );
};

export default ProjectLayout;
