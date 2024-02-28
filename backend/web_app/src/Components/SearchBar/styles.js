import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 16px;
  align-items: center;
  width: 100%;
  .form-control:focus {
    box-shadow: none !important;
  }
  .form-control {
    border-radius: 0px !important;
  }
`;

export const SearchInput = styled.input`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  border: none;
  padding: 0;
  margin-left: 8px;
  width: 100%;
`;
