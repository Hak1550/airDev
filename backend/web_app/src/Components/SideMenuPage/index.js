import SideBarPageType from 'Enums/SideBarPageType';
import React from 'react';
import { Container } from './styles';

const SideMenuPage = ({ children, ...props }) => {
  // console.log('children', props);
  return (
    <Container
      className="sub-side-menu"
      style={{
        minWidth: props.pageType !== SideBarPageType.PROJECT ? '320px' : '',
      }}
    >
      {children}
    </Container>
  );
};

export default SideMenuPage;
