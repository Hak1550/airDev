import React from 'react';
import {
  SearchImg,
  SearchClearFilterDiv,
  SearchClearFilterP,
  SearchHeadDiv,
  SearchHeadDivLeft,
  SearchHeadDivRight,
  SearchHeadPart1,
  SearchHeadPart1Div,
  SearchHeadPart1DivHead,
  SearchHeadPart2,
  SearchHeadPart2DivHead2,
} from '../styles';
import search from '../../../Assets/images/search.png';
import Select from 'react-select';
const SearchFilters = props => {
  let {
    name,
    handleNameFilter,
    handleClientFilter,
    clearFilters,
    projects,
    selectRef,
  } = props;

  const clientOptions = projects?.map(project => {
    return { value: project?.client, label: project?.client };
  });

  const uniqueClientOptions = [
    ...new Map(clientOptions?.map(item => [item['value'], item])).values(),
  ];

  const customRoleStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'blue',
      width: '100%',
      fontFamily: 'Inter',
    }),
    control: (provide, state) => ({
      ...provide,
      flex: 1,
      width: '100%',
      minWidth: 100,
      display: 'flex',
      border: '1px solid #D0D5DD',
      borderRadius: 8,
      height: 44,
      fontWeight: 400,
      color: '#667085',
      fontSize: 16,
      fontFamily: 'Inter',
    }),
    container: base => ({
      ...base,
      flex: 1,
    }),
  };

  return (
    <SearchHeadDiv>
      <SearchHeadDivLeft>
        <SearchHeadPart1>
          <SearchHeadPart1Div>
            <p
              style={{
                color: '#344054',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Inter',
              }}
            >
              Search
            </p>
            <SearchHeadPart1DivHead>
              <SearchImg src={search} />
              <input
                type="text"
                placeholder="Search"
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'Inter',
                  fontSize: 16,
                  fontWeight: 400,
                  color: '#667085',
                }}
                value={name}
                onChange={handleNameFilter}
              />
            </SearchHeadPart1DivHead>
          </SearchHeadPart1Div>
        </SearchHeadPart1>
        <SearchHeadPart2>
          <SearchHeadPart1Div>
            <p
              style={{
                color: '#344054',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Inter',
              }}
            >
              Client
            </p>
            <SearchHeadPart2DivHead2>
              <Select
                ref={selectRef}
                onChange={handleClientFilter}
                options={uniqueClientOptions}
                placeholder="All"
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </SearchHeadPart2DivHead2>
          </SearchHeadPart1Div>
        </SearchHeadPart2>
      </SearchHeadDivLeft>
      <SearchHeadDivRight>
        <SearchClearFilterDiv onClick={clearFilters}>
          <SearchClearFilterP>Clear Filters</SearchClearFilterP>
        </SearchClearFilterDiv>
      </SearchHeadDivRight>
    </SearchHeadDiv>
  );
};

export default SearchFilters;
