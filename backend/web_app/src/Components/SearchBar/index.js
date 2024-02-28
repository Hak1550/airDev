import React from 'react';
import Search from '../Icons/Search';
import { Container, SearchInput } from './styles';

const SearchBar = props => {
  const { placeholder = 'Search' } = props;
  return (
    <Container>
      <Search />
      <SearchInput
        className="form-control"
        placeholder={placeholder}
        // maxLength={30}
        {...props}
      />
    </Container>
  );
};

export default SearchBar;
