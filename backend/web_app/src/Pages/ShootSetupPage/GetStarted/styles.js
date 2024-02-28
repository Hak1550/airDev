import styled from 'styled-components';
import { GRAY_500, GRAY_900 } from '../../../Config/colors';

export const Card = styled.div`
  max-width: 658px;
  max-height: 458px;
  width: 90%;
  height: 90%;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InnerContainer = styled.div`
  width: 80%;
  max-width: 352px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const GetStartedText = styled.h1`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${GRAY_900};
  margin: 16px 0px 4px 0px;
`;

export const DescriptionText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${GRAY_500};
  margin: 4px 0px 24px 0px;
`;

export const UploadButton = styled.button`
  width: 100%;
  background: #1570ef;
  border: 1px solid #1570ef;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
`;

export const SkipButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #1570ef;

  outline: none;
  border: none;
  background: transparent;
  margin-top: 18px;
`;
