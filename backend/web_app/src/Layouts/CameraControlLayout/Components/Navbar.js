import React from 'react';
import BreadCrumbs from './BreadCrumbs';
import { NavContainer } from './styles';

const Navbar = ({ children, links = [], projectName = null }) => {
  return (
    <NavContainer>
      <BreadCrumbs links={links} projectName={projectName} />
      {children}
    </NavContainer>
  );
};

export default Navbar;
