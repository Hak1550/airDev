import styled from "styled-components";
import { GRAY_200, GRAY_500, GRAY_700, GRAY_900 } from "../../Config/colors";

export const FormHeaderTitleColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: ${GRAY_900};
  margin-bottom: 0;
`;

export const FormDescription = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${GRAY_500};
`;
