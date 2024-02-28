import styled from 'styled-components';

export const FileContainer = styled.li`
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  list-style: none;
  /* padding: 14px 16px; */
  margin-top: 16px;
  display: flex;
  height: 72px;
  column-gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const FileDetails = styled.div`
  display: flex;
  align-items: center;
  column-gap: 14px;
  background: #f9fafb;
  height: 100%;
  padding-left: 16px;
  width: 75%;
`;

export const FileDetailsSpan1 = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
`;

export const FileDetailsSpan2 = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
`;
