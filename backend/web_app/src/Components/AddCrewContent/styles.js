import styled from 'styled-components';
import { OutlinedButton } from '../IconButton/styles';

export const AddCrewContentContainer = styled.div`
  // height: 100%;
  // height: 72vh;
  height: calc(100vh - 210px);
  display: flex;
  flex-direction: column;
`;

export const DoneButton = styled.button`
  margin-left: 12px;
`;

export const InviteButton = styled(OutlinedButton)`
  background: #f9fafb;
  border: 1px solid #d0d5dd;
  margin-bottom: 10px;
  min-height: 55px;
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
