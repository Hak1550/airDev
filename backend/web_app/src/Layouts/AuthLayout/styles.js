import styled from 'styled-components';
import { GRAY_500, GRAY_800, GRAY_900 } from '../../Config/colors';

export const IllustrationColumn = styled.div`
  /* background: ${GRAY_800}; */
  background: linear-gradient(to bottom, #1e1e1e 36%, #010101 100%);
  padding: 0px;
  /* height: 100vh; */
`;

export const FormColumn = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  /* height: 100vh; */
`;

export const Header = styled.div``;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

export const AuthFormContainer = styled.div`
  max-width: 360px;
  width: 98%;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const GrayText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${GRAY_500};
  margin-bottom: 0;
`;

export const Heading = styled.h1`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.02em;
  color: ${GRAY_900};
  margin-bottom: 12px;
`;

export const Description = styled.p`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${GRAY_500};
  margin-bottom: 2rem;
`;
