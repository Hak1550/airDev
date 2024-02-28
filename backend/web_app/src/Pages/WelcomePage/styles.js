import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Container = styled.div`
  width: 400px;
  height: auto;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Heading = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: #101828;
  margin: 30px 0px 8px;
`;
export const Form = styled.form`
  margin: 20px 0px 16px 0px;
  width: 100%;
`;

export const TextLink = styled(Link)`
  color: #7f56d9;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

export const Footer = styled.div`
  margin: 45px 0px;
  width: 400px;
  text-align: center;
`;

export const FooterButton = styled.button`
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  width: 100%;
  margin-top: 46px;
`;

export const ModalBody = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #667085;
`;

export const VideoPreview = styled.div`
  position: relative;
  cursor: pointer;
  img {
    border-radius: 8px;
  }
`;

export const Play = styled.img`
  position: absolute;
  left: 40%;
  top: 36%;
  z-index: 99999999999999999999999999;
`;
