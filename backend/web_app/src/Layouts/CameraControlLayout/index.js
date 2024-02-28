import React from 'react';
import Navbar from './Components/Navbar';

import { ContentGround, LayoutContainer, SiteContainer } from './styles';

const CameraLayout = ({ children, links = [], projectName = null }) => {
  return (
    <LayoutContainer>
      <ContentGround>
        <Navbar links={links} projectName={projectName} />
        <SiteContainer>{children}</SiteContainer>
      </ContentGround>
    </LayoutContainer>
  );
};

export default CameraLayout;
