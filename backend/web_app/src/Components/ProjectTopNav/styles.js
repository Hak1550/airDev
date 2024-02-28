import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 100%;
  height: 80px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Badge = styled.span`
  background: #f9fafb;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
`;

export const ButtonDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PublishedDate = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  margin-right: 18px;
`;

export const PublishButton = styled.button`
  margin-left: 12px;
`;
