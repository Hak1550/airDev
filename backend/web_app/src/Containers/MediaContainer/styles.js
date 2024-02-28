import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GRAY_500 } from '../../Config/colors';

export const MainContainer = styled.div`
  background: #f9fafb;
  /* min-width: 1140px; */
  min-width: 686px;
`;

export const MediaHeader = styled.div`
  /* padding: 24px 82px 0px; */
  padding: 24px 32px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopNav = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NavItem = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  margin-right: 8px;
  padding: 8px 12px;
  width: 98px;
  height: 36px;
  background: ${props => (props.selected ? '#f9f5ff' : '')};
  border-radius: 6px;
  color: ${props => (props.selected ? '#6941C6' : GRAY_500)};
`;

export const SearchBarContainer = styled.div`
  border: 1px solid #d0d5dd;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  height: 40px;
  width: 366px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
`;
