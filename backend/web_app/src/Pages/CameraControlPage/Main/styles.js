import styled from 'styled-components';

export const NoUserFoundText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #667085;
`;

// main content

export const MainContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BottomUsersNavContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: auto;
  left: 50%;
  transform: translateX(-50%);
`;
export const BottomUsersNavContainer2 = styled.div`
  position: absolute;
  bottom: 0;
  width: 95%;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const ZoomToolContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  @media (max-width: 1080px) {
    bottom: 90px;
  }
`;
