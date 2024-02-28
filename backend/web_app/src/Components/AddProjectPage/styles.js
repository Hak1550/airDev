import styled from 'styled-components';
import { GRAY_200 } from '../../Config/colors';

export const FormActionRow = styled.div`
  padding-top: 20px;
  margin-top: 25px;
  border-top: 1px solid ${GRAY_200};
  display: flex;
  justify-content: flex-end;
`;

export const SaveButton = styled.button`
  margin-left: 12px;
`;

export const FormButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
