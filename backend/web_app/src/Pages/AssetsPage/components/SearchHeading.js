import React, { useState } from 'react';
import {
  ArrowImg,
  DivP1,
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
import arrow from '../../../Assets/images/arrowLeft.png';
import Select from 'react-select';
const SearchHeading = props => {
  const [arrowDirection, setArrowDirection] = useState(true);
  let { onChangeAll, selectAll, filterAssets, setFilterAssets } = props;
  const handleHeadingClick = heading => {
    filterAssets.heading === heading
      ? setArrowDirection(!arrowDirection)
      : setArrowDirection(true);
    setFilterAssets(prev => ({
      ...prev,
      heading,
      arrowDirection: arrowDirection ? 'up' : 'down',
    }));
  };
  return (
    <SearchHeadingDiv>
      <DivP1>
        <MainSelectImg
          src={selectAll ? tick : CheckboxBase}
          onClick={onChangeAll}
        />
      </DivP1>
      <SearchHeadingDivP1 onClick={() => handleHeadingClick('name')}>
        <SearchHeadingDivP1pa>Nickname</SearchHeadingDivP1pa>
        {filterAssets.heading === 'name' &&
        (filterAssets.arrowDirection === 'up' ||
          filterAssets.arrowDirection === 'down') ? (
          <ArrowImg src={arrow} direction={filterAssets.arrowDirection} />
        ) : null}
      </SearchHeadingDivP1>
      <SearchHeadingDivP2 onClick={() => handleHeadingClick('type')}>
        <SearchHeadingDivP1pa>Type</SearchHeadingDivP1pa>
        {filterAssets.heading === 'type' &&
        (filterAssets.arrowDirection === 'up' ||
          filterAssets.arrowDirection === 'down') ? (
          <ArrowImg src={arrow} direction={filterAssets.arrowDirection} />
        ) : null}
      </SearchHeadingDivP2>
      <SearchHeadingDivP4 onClick={() => handleHeadingClick('price')}>
        <SearchHeadingDivP1pa>Price/Unit</SearchHeadingDivP1pa>
        {filterAssets.heading === 'price' &&
        (filterAssets.arrowDirection === 'up' ||
          filterAssets.arrowDirection === 'down') ? (
          <ArrowImg src={arrow} direction={filterAssets.arrowDirection} />
        ) : null}
      </SearchHeadingDivP4>
      <SearchHeadingDivP4 onClick={() => handleHeadingClick('exp_date')}>
        <SearchHeadingDivP1pa>Exp Date</SearchHeadingDivP1pa>
        {filterAssets.heading === 'exp_date' &&
        (filterAssets.arrowDirection === 'up' ||
          filterAssets.arrowDirection === 'down') ? (
          <ArrowImg src={arrow} direction={filterAssets.arrowDirection} />
        ) : null}
      </SearchHeadingDivP4>
      <SearchHeadingDivP5></SearchHeadingDivP5>
    </SearchHeadingDiv>
  );
};

export default SearchHeading;
