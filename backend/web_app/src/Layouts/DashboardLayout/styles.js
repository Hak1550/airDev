import styled from 'styled-components';
import { GRAY_50, GRAY_900 } from '../../Config/colors';
import { Link } from 'react-router-dom';

export const SideNavColumn = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const MainContentColumn = styled.div`
  background: ${GRAY_50};
  padding: 0;
`;
export const MainContentColumn2 = styled.div`
  background: ${GRAY_50};
  padding: 0;
  width: 500px;
  overflow-x: auto;
`;

// Side Menu Header
export const SideMenuPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SideMenuPageTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${GRAY_900};
`;

export const AddNewButton = styled.button`
  background: #f9fafb;
  border-radius: 6px;
  outline: none;
  border: none;
  width: 48px;
  height: 48px;
`;

// menu page main content

export const SideMenuPageContent = styled.div`
  height: calc(100vh - 92px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const SideMenuFooter = styled.div``;

// project

export const ProjectPageLink = styled(Link)`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  color: ${GRAY_900};
  li {
    background: ${props => {
      return window.location.href.includes(props.className) ? '#f9fafb' : '';
    }};
  }
`;
