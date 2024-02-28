import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GRAY_200, GRAY_50, GRAY_900 } from '../../Config/colors';

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: block;
`;

export const AvatarButton = styled.button`
  padding: 0px;
  border: 0px;
  box-shadow: none;
`;

export const SideMenuContainer = styled.div`
  width: 82px;
  height: 100%;
  padding: 34px 18px 24px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  /* overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; */
`;

export const LogoContainer = styled(Link)`
  text-decoration: none;
  display: block;
`;

export const NavIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
`;

export const NavIconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const IconListItem = styled.li`
  margin-bottom: 8px;
  width: 100%;
  border: ${props =>
    props.isSelected ? `3px solid rgba(76, 84, 116, 0.5)` : ''};
  border-radius: 12px;
  .text-decoration-none {
    span,
    img {
      width: ${props => (props.isSelected ? '42px' : '48px')};
      height: ${props => (props.isSelected ? '42px' : '48px')};
      border-radius: 10px;
    }
  }
  background: ${props => {
    return window.location.href.includes(props.className) ? '#f9fafb' : '';
  }};
`;

const navLinkStyles = `
    padding: 12px;
    background: ${props => (props.selected ? GRAY_50 : '#FFFFFF')};
    border-radius: 6px;
    display: block;

    &:hover {
        background: ${GRAY_50};
    }
`;

export const MinMaxButton = styled.span`
  cursor: pointer;
  ${navLinkStyles}
`;

export const NavItemLink = styled(Link)`
  ${navLinkStyles}
`;

export const IconListFullWidth = styled.li`
  width: 100%;
`;

export const AlphaLogo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  /* color: ${GRAY_900}; */
  color: #fff;
  /* background: ${GRAY_200}; */
  background: #4c5474;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 500;
`;
