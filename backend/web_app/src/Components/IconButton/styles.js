import styled from 'styled-components';
import { GRAY_300 } from '../../Config/colors';

export const OutlinedButton = styled.button`
  background: #ffffff;
  border: 1px solid ${GRAY_300};
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  height: 40px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
`;
