import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

export const ContentGround = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const RightNavContainer = styled.div`
  max-width: 400px;
  width: 40vw;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

export const SiteContainer = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
`;

export const CloseIcon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 10;
  cursor: pointer;
  background: #fff;
`;

export const NavTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #101828;
  margin: 0;
  padding: 24px 24px 0px 24px;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
  }
`;

export const SearchBarContainer = styled.div`
  border: 1px solid #d0d5dd;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 24px 24px 0 24px;
`;

export const SideBarContent = styled.div`
  flex: 1 1 auto;
  position: relative;
  max-height: 100%;
  overflow: hidden;
`;
