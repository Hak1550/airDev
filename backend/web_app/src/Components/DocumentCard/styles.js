import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  height: 193px;
  /* White */
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopSection = styled.div`
  padding: 24px 24px 4px 24px;
`;

export const BottomSection = styled.div`
  padding: 5px 10px;
  border-top: 1px solid #e4e7ec;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const TopSectionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FileIconImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

export const FileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;
export const FileName = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #101828;
  margin: 0;
`;

export const FileType = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
`;

export const ModifiedDate = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  margin: 24px 0px 0px 0px;
`;
