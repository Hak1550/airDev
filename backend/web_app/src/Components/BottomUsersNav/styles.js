import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: block;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  height: 80px;
  width: 80px;
`;

export const OnlineStatus = styled.div`
  width: 12px;
  height: 12px;
  background: #12b76a;
  border: 1.5px solid #ffffff;
  border-radius: 6px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const RoleText = styled.p`
  font-weight: normal;
  font-size: 12px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #667085;
  margin: 0;
  height: 20px;
`;

export const AvatarContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
`;

export const AvatarPlaceholder = styled(FlexDiv)`
  position: relative;
  justify-content: center;
  width: ${props => (props.sm ? '30px' : '48px')};
  height: ${props => (props.sm ? '30px' : '48px')};
  font-size: ${props => (props.sm ? '10px' : '12px')};
  margin-top: ${props => (props.sm ? '12px' : '2px')};
  margin-left: ${props =>
    props.sm ? (!props.index ? '12px' : '-16px') : '16px'};
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #f9f5ff;
  ${props => (props.bgImage ? `background-image: url(${props.bgImage});` : '')}
  background-size: cover;
  color: #7f56d9;
  text-transform: uppercase;
  cursor: ${props => (props.draggable ? 'move' : 'default')};
  ${props =>
    props.is_active
      ? ''
      : `&::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background: #ffffff70;
    }`}
  ${props =>
    props.is_active
      ? `&::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: -1px;
    background: #12b76a;
    border: 1.5px solid #ffffff;
    border-radius: 8px;
    right: 0px;
    // z-index: 5;
  }`
      : !props.bgImage
      ? `&::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: -1px;
    background: #FBC348;
    border: 1.5px solid #ffffff;
    border-radius: 8px;
    right: 0px;`
      : ''}
`;
