import styled from 'styled-components';

export const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 175px;
  justify-content: space-between;
`;

export const ToolButton = styled.button`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;

  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 6px;
  border: none;
  outline: none;
`;
