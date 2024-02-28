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
  pointer-events: ${props => (props.onBoardCameraForm ? 'none' : 'auto')};
`;

export const RightNavContainer = styled.div`
  // max-width: 400px;
  transition-timing-function: ease-in-out;
  transition: 0.25s;
  width: ${props =>
    props.imageSize
      ? 0
      : props.showRightNavonCell
      ? 250
      : props.screenWidth < 600
      ? 0
      : 370}px;
  position: fixed;
  top: 80px;
  right: 0px;
  height: calc(100% - 80px);
  background: #ffffff;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  display: flex;
  flex-direction: column;
  z-index: ${props => (props.imageSize ? -10 : 10)};
  background-color: '#666';
`;

export const SiteContainer = styled.div`
  height: calc(100vh - 80px);
  width: ${props =>
    props.imageSize
      ? '100%'
      : props.isMobile && props.showRightNavonCell
      ? 'calc(100%-250px)'
      : props.screenWidth < +600
      ? '100%'
      : 'calc(100% - 370px)'};
  /* width: calc(70%); */
  z-index: ${props => (props.imageSize ? 20 : null)};
`;

export const RightNavToggle = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  border-left: 1px solid #666;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
  /* background-color: #6669; */
  align-self: flex-end;
  cursor: pointer;
  margin-bottom: 2px;
  z-index: 50;
`;
export const RightNavToggleImg = styled.img`
  width: 40px;
  height: 40px;
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  transform: ${props => (props.showRightNavonCell ? 'rotate(180deg)' : null)};
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
`;

export const SearchBarContainer = styled.div`
  border: 1px solid #d0d5dd;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 24px 0 24px;
`;

export const SideBarContent = styled.div`
  flex: 1 1 auto;
  position: relative;
  max-height: 100%;
  overflow: hidden;
`;
