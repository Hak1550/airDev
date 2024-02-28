import styled from 'styled-components';
import { OutlinedButton } from '../../../Components/IconButton/styles';
export const AddCrewContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MembersSearchList = styled.div`
  flex: 1 1 auto;
  position: relative;
  max-height: 100%;
  overflow: auto;
  padding: 0px 24px;
  margin: 24px 0px 0px 0px;
`;

export const NavFooter = styled.div`
  height: 72px;
  border-top: 1px solid #e4e7ec;
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const DoneButton = styled.button`
  margin-left: 12px;
`;

export const NoCrewMemberFoundCard = styled.div`
  border-radius: 8px;
  background: #f2f4f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 14px;
`;

export const NoUserFoundText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #667085;
`;

export const InviteButton = styled(OutlinedButton)`
  background: #f9fafb;
  border: 1px solid #d0d5dd;
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
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  justify-content: space-between;
`;

export const ZoomToolContainer = styled.div`
  position: absolute;
  bottom: 100px;
  right: 10px;
`;
export const PopupMain = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 246px;
  height: ${props => (props.popup.personell ? 98 : 142)}px;
  border-box: box-sizing;
  padding-left: 15px;
  background-color: #fff;
  position: absolute !important;
  bottom: 100px;
  // left: 0%;
  left: ${props => props.role}%;

  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  div {
    display: flex;
    height: 44px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &:focus {
      background-color: #333 !important;
    }
  }
  span {
    color: #667085;
    font-size: 16px;
    font-weight: 500;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
export const LoaderDiv = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;
  p {
    text-align: center;
    color: #e4e7ec;
    margin-top: -200px;
    font-size: 16px;
    color: black;
    opacity: 0.4;
  }
`;
// set IMage Div

export const SetImageSizeDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const IconDiv = styled.div`
  border-left: 1px solid lightblue;
  border-right: 1px solid lightblue;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px 20px 0 20px;
`;
export const SetImageSize = styled.div`
  position: absolute;
  width: 50%;
  bottom: 0;
  height: 60px;
  display: flex;
  background-color: white;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: 5px;
  /* height: 100%; */
`;
export const SetImageIcon = styled.img`
  height: 40px;
  width: 40px;
  cursor: pointer;
`;
export const SetImageIcon2 = styled.img`
  height: 40px;
  width: 80px;
  cursor: pointer;
  margin-left: 50px;
`;

export const SetImageSizeText = styled.p`
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
`;
export const SetImageSizeText2 = styled.p`
  margin-right: 20px;
  margin-left: 20px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  background-color: #6663;
  justify-self: center;
  align-self: center;
`;
