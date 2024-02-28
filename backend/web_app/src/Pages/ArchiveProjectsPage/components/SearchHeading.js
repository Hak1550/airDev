import React from 'react';
import {
  SearchHeadingDiv,
  SearchHeadingDivP1,
  SearchHeadingDivP1pa,
  SearchHeadingDivP2,
  SearchHeadingDivP3,
} from '../styles';

const SearchHeading = () => {
  return (
    <SearchHeadingDiv>
      <SearchHeadingDivP1>
        <SearchHeadingDivP1pa>Project Title</SearchHeadingDivP1pa>
      </SearchHeadingDivP1>
      <SearchHeadingDivP2>
        <SearchHeadingDivP1pa>Date Created</SearchHeadingDivP1pa>
      </SearchHeadingDivP2>
      <SearchHeadingDivP3></SearchHeadingDivP3>
    </SearchHeadingDiv>
  );
};

export default SearchHeading;
