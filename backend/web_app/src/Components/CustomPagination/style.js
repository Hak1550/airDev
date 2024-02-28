import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';

export const PaginationDiV = styled(Pagination)`
  display: flex;
  max-width: 500px;
  width: 33.33%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;
export const PaginationEllipsis = styled(Pagination.Ellipsis)`
  a {
    border-radius: 8px !important;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 40px;
    width: 40px;
  }
`;
export const PaginationItemP = styled(Pagination.Item)`
  margin-left: 8px;
  span {
    color: #7f56d9 !important;
    background-color: #f9f5ff !important;
  }
  span,
  a {
    border-radius: 8px !important;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 40px;
    width: 40px;
  }
  a {
    color: #6669;
  }
`;
export const PaginationItemP2 = styled.p`
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  color: #6669;
`;
