import styled from 'styled-components';

export const PopupContainer = styled.ul`
  min-width: 250px;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  box-sizing: border-box;
  padding: 10px 0 !important;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  position: absolute;
  z-index: 100;
  padding: 0;
  list-style: none;

  ${props => (props.x ? `left: ${props.x}px;` : null)}
  ${props => (props.y ? `top: ${props.y}px;` : null)}
    display: ${props => (props.show ? 'block' : 'none')};
`;

export const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

export const Title = styled.h3`
  font-size: 1rem;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  margin: 30px 0;
`;

export const InfoRecord = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoTitle = styled.div`
  font-weight: 600;
`;

export const InfoValue = styled.div``;
