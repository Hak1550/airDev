import styled from 'styled-components';
import { GRAY_200 } from '../../Config/colors';

export const Container = styled.div`
  max-width: 370px;
  // width: 5vw;
  min-width: 170px;
  height: 100%;
  border-left: 1px solid ${GRAY_200};
  padding: 28px 16px 28px 16px;
  overflow: auto;
  z-index: 10;
`;
