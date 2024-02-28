import React, { useState, useRef } from 'react';
import {
  SearchImg,
  TeamSearchClearFilterDiv,
  TeamSearchClearFilterP,
  TeamSearchHeadDiv,
  TeamSearchHeadDivLeft,
  TeamSearchHeadDivRight,
  TeamSearchHeadPart1,
  TeamSearchHeadPart1DivHead,
  TeamSearchHeadPart2,
  TeamSearchHeadPart2Div,
  TeamSearchHeadPart2DivHead2,
  TeamSearchHeadPart2DivHead3,
  TeamSearchHeadPart3,
} from '../styles';
import search from '../../../Assets/images/search.png';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const SearchFilters = props => {
  let {
    role,
    state,
    project,
    dispatch,
    ACTION_TYPES,
    handleNameFilter,
    handleDeviceFilter,
    handleCategoryFilter,
  } = props;
  let collabolators = useSelector(state => state.team);
  let deviceRef = useRef(null);
  let categoryRef = useRef(null);
  const [projectOptions, setProjectOptions] = useState({});

  const deviceOptions = [
    { value: '0', label: 'All' },
    { value: '1', label: 'Air 1 Camera' },
    { value: '2', label: 'vMIX Main' },
    { value: '3', label: 'vMIX Reply' },
    { value: '4', label: 'SRT Gateway' },
  ];
  const categoryOptions = [
    { value: '0', label: 'All' },
    { value: 'Available', label: 'Available' },
    { value: 'Engaged', label: 'Engaged' },
  ];
  const customRoleStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
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

  const customProjectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      width: state.selectProps.width,
      display: 'flex',
      flexDirection: 'row',
      fontFamily: 'Inter',
    }),
    control: (provide, state) => ({
      ...provide,
      width: '100%',
      minWidth: 120,
      display: 'flex',
      height: 44,
      flexDirection: 'row',
      borderRadius: 8,
      fontFamily: 'Inter',
      border: '1px solid #D0D5DD',
      fontSize: 16,
      fontWeight: 400,
      color: '#667085',
    }),
    container: base => ({
      ...base,
      flex: 1,
    }),
  };
  // const handleNameFilter = e => {
  //   dispatch({
  //     type: ACTION_TYPES.NAME_FILTER,
  //     payload: { text: e.target.value },
  //   });
  // };
  // const handleRoleFilter = e => {
  //   dispatch({
  //     type: ACTION_TYPES.ROLE_FILTER,
  //     payload: { text: e.label },
  //   });
  // };
  // const handleProjectFilter = e => {
  //   dispatch({
  //     type: ACTION_TYPES.PROJECT_FILTER,
  //     payload: { text: e.label },
  //   });
  // };

  const clearFilters = () => {
    deviceRef.current.setValue('');
    categoryRef.current.setValue('');
    dispatch({
      type: ACTION_TYPES.NAME_FILTER,
      payload: { text: '' },
    });
    dispatch({
      type: ACTION_TYPES.ROLE_FILTER,
      payload: { text: '' },
    });
    dispatch({
      type: ACTION_TYPES.PROJECT_FILTER,
      payload: { text: '' },
    });
  };
  return (
    <TeamSearchHeadDiv>
      <TeamSearchHeadDivLeft>
        <TeamSearchHeadPart1>
          <TeamSearchHeadPart2Div>
            <p>Search</p>
            <TeamSearchHeadPart1DivHead>
              <SearchImg src={search} />
              <input
                type="text"
                placeholder="Search"
                onChange={handleNameFilter}
              />
            </TeamSearchHeadPart1DivHead>
          </TeamSearchHeadPart2Div>
        </TeamSearchHeadPart1>
        <TeamSearchHeadPart2>
          <TeamSearchHeadPart2Div>
            <p>Device</p>
            <TeamSearchHeadPart2DivHead2>
              <Select
                ref={deviceRef}
                onChange={handleDeviceFilter}
                options={deviceOptions}
                placeholder="All"
                styles={customRoleStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </TeamSearchHeadPart2DivHead2>
          </TeamSearchHeadPart2Div>
        </TeamSearchHeadPart2>
        <TeamSearchHeadPart3>
          <TeamSearchHeadPart2Div>
            <p>Category</p>
            <TeamSearchHeadPart2DivHead3>
              <Select
                ref={categoryRef}
                onChange={handleCategoryFilter}
                options={categoryOptions}
                placeholder="All"
                styles={customProjectStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </TeamSearchHeadPart2DivHead3>
          </TeamSearchHeadPart2Div>
        </TeamSearchHeadPart3>
      </TeamSearchHeadDivLeft>
      <TeamSearchHeadDivRight>
        <TeamSearchClearFilterDiv onClick={clearFilters}>
          <TeamSearchClearFilterP>Clear Filters</TeamSearchClearFilterP>
        </TeamSearchClearFilterDiv>
      </TeamSearchHeadDivRight>
    </TeamSearchHeadDiv>
  );
};

export default SearchFilters;
