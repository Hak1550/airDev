import styled from 'styled-components';
import icon1 from '../../Assets/images/arrowLeft.png';
import icon2 from '../../Assets/images/arrowRight.png';
export const AccordionContainer = styled.div`
  margin-top: 24px;
`;

export const AccordionButton = styled.button`
  width: 16px;
`;

// export const AccordionButton1 = styled.button`
//   width: 16px;
//   // !(.collapsed)::after {
//   //   background-image: url(${icon1});
//   // }
//   &::after {
//     background-image: url(${icon1});
//   }
// `;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 41px;
`;

export const AccordionTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #344054;
  margin: 0;
`;

export const AccordionActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AddItemButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px;
  width: 28px;
  height: 28px;
  background: #f5faff;
  border-radius: 6px;
  border: none;
  outline: none;
  margin-right: 12px;
`;

export const AccordionBody = styled.div`
  margin-top: 24px;
`;
