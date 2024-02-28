import { Container } from 'react-bootstrap';
import styled from 'styled-components';
export const MainContainer = styled(Container)`
  margin: auto;
  max-width: 1185px;
  padding: 0px 32px;
  min-height: calc(100vh - 106px);
`;

export const MainFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 81px;
  width: 100%;
  border-top: 1px solid #e4e7ec;
  margin-top: 22px;
  z-index: 5;
`;

export const CheckBoxContainer = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  top: 12px;
  left: 18px;
`;
