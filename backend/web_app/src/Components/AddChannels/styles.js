import styled from 'styled-components';
import { OutlinedButton } from '../IconButton/styles';

export const AddCrewContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DoneButton = styled.button`
  margin-left: 12px;
`;

export const InviteButton = styled(OutlinedButton)`
  background: #f9fafb;
  border: 1px solid #d0d5dd;
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

export const AddGearFormContainer = styled.div`
  flex: 1 1 auto;
  position: relative;
  max-height: 100%;
  overflow: auto;
  padding: 0px 24px;
  margin: 24px 0px 0px 0px;
`;

export const AddLink = styled.div`
  cursor: pointer;
  color: rgb(105, 65, 198);
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;
  svg {
    margin-right: 12px;
  }
`;
