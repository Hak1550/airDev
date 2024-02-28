import React, { useState } from 'react';
import {
  MainSelectImg,
  SearchHeadingDiv,
  SearchHeadingDivP1,
  SearchHeadingDivP1pa,
  SearchHeadingDivP2,
  SearchHeadingDivP3,
  SearchHeadingDivP4,
  SearchHeadingDivP5,
} from '../styles';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import tick from '../../../Assets/images/tick-square.png';
import Select from 'react-select';
const SearchHeading = ({ onChangeAll, selectAll }) => {
  return (
    <SearchHeadingDiv>
      <SearchHeadingDivP1>
        <MainSelectImg
          src={selectAll ? tick : CheckboxBase}
          onClick={onChangeAll}
        />
        <SearchHeadingDivP1pa>Collaborators</SearchHeadingDivP1pa>
      </SearchHeadingDivP1>
      <SearchHeadingDivP2>
        <SearchHeadingDivP1pa>Role</SearchHeadingDivP1pa>
      </SearchHeadingDivP2>
      <SearchHeadingDivP3>
        <SearchHeadingDivP1pa>Email Address</SearchHeadingDivP1pa>
      </SearchHeadingDivP3>
      <SearchHeadingDivP4>
        <SearchHeadingDivP1pa>Projects</SearchHeadingDivP1pa>
      </SearchHeadingDivP4>
      <SearchHeadingDivP5></SearchHeadingDivP5>
    </SearchHeadingDiv>
  );
};

export default SearchHeading;
