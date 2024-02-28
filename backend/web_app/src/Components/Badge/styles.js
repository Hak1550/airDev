import styled from 'styled-components';

export const MainContainer = styled.div`
  width: auto;
  padding: 2px;
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  min-height: 22px;
  span {
    max-width: 150px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    margin-bottom: 0px;
    padding: 0px 6px;
    color: ${props => props.color};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
