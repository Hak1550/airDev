import styled from 'styled-components';

export const Card = styled.div`
  max-width: 720px;
  max-height: 406px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
export const InnerContainer = styled.div`
  width: 80%;
  max-width: 352px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const MainContainer = styled.div`
  background: #101828;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;
export const CloseIcon = styled.span`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #fff;
`;

export const NavTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #101828;
  margin: 0;
  padding: 24px 24px 0px 24px;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
  }
  display: flex;
  justify-content: space-between;
  align-items: start;
`;
