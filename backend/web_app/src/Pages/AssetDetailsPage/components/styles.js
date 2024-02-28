import styled from 'styled-components';

export const ControlsWrapper = styled.div`
  /* visibility: hidden; */
  opacity: 0.6;
  position: absolute;
  height: 80px !important;
  padding: 0px 16px 16px;
  background: black;

  // position: absolute;
  // height: 100px !important;
  // padding: 16px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ControlIcons = styled.div`
  color: #777;
  font-size: 50;
  transform: scale(0.9);
`;
