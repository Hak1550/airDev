import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid ${props => (props.isDefault ? '#D6BBFB' : '#e4e7ec')};
  border-radius: 8px;
  padding: 16px 16px 0px;
  margin-bottom: 12px;
  cursor: pointer;
  background: ${props => (props.isDefault ? '#F9F5FF' : '#FFFFFF')};
`;

export const CardDetails = styled.div`
  padding: 13.5px 8px;
  border: 1px solid #f2f4f7;
  border-radius: 6px;
  width: 58px;
  height: 40px;
  display: flex;
  background: white;
`;

export const CardHeader = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${props => (props.isDefault ? '#53389E' : '#344054')};
`;

export const CardDefault = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${props => (props.isDefault ? '#9E77ED' : '#667085')};
`;

export const CardEdit = styled.span`
  margin-left: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #6941c6;
`;

export const CardContentWrapper = styled.div`
  position: relative;
`;
export const CheckIcon = styled.span`
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 16px;
`;
