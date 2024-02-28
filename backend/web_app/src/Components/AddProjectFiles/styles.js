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

export const UploadContainer = styled.div`
  border: 1px dashed #e4e7ec;
  border-radius: 8px;
  padding: 16px 24px;
  cursor: pointer;
  text-align: center;
`;

export const UploadSpanFirst = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6941c6;
`;

export const UploadSpan2 = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
`;
