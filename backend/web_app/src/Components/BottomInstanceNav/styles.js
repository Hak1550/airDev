import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
`;

export const InstanceContainer = styled.div`
  height: 80px;
  width: 80px;
  cursor: pointer;
  position: relative;
`;

export const IconContainer = styled.div`
  height: 48px;
  width: 48px;
`;

export const IconInnerContainer = styled.div`
  margin-top: 2px;
  height: 100%;
  width: 100%;
  background: ${props => (props.active ? '#7F56D9' : '#F9F5FF')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

export const RoleText = styled.p`
  height: 20px;
  width: 100%;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #667085;
  margin: 0;
`;

export const UserContainer = styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  position: absolute;
  top: 34px;
  right: 14px;
  font-size: 12px;
`;

export const OnlineStatus = styled.div`
  width: 12px;
  height: 12px;
  background: #12b76a;
  border: 1.5px solid #ffffff;
  border-radius: 6px;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const OflineStatus = styled.div`
  width: 12px;
  height: 12px;
  background: #fbc348;
  border: 1.5px solid #ffffff;
  border-radius: 6px;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
