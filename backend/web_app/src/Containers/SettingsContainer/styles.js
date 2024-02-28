import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GRAY_200, GRAY_500 } from '../../Config/colors';

export const AccountPageContainer = styled.div`
  padding: 32px;
  /* min-width: 1140px; */
  min-width: 686px;
  max-width: 1300px;
  margin: auto;
`;

export const TopNav = styled.div`
  width: 100%;
  margin-top: 24px;
  border-bottom: 1px solid ${GRAY_200};
  display: flex;
  flex-direction: row;
`;

export const NavItem = styled(Link)`
  padding-bottom: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  margin-right: 24px;
  color: ${props => (props.selected ? '#6941C6' : GRAY_500)};
  ${props => (props.selected ? 'border-bottom: 2px solid #6941C6;' : '')};
`;
export const NavItemDetails = styled(Link)`
  padding-bottom: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  margin-right: 24px;
  min-width: 72px;
  color: ${props => (props.selected ? '#6941C6' : GRAY_500)};
  ${props => (props.selected ? 'border-bottom: 2px solid #6941C6;' : '')};
`;

export const TeamCount = styled.span`
  border-radius: 25px;
  background: #f2f4f7;
  width: 24px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #344054;
  margin-left: 2px;
  padding: 4px;
`;
