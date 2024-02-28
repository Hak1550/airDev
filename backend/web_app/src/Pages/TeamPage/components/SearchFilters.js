import React, { useState, useRef } from 'react';
import {
  SearchImg,
  TeamSearchClearFilterDiv,
  TeamSearchClearFilterP,
  TeamSearchHeadDiv,
  TeamSearchHeadDivLeft,
  TeamSearchHeadDivRight,
  TeamSearchHeadPart1,
  TeamSearchHeadPart1Div,
  TeamSearchHeadPart1DivHead,
  TeamSearchHeadPart2,
  TeamSearchHeadPart2Div,
  TeamSearchHeadPart2DivHead,
  TeamSearchHeadPart2DivHead2,
  TeamSearchHeadPart2DivHead3,
  TeamSearchHeadPart3,
} from '../styles';
import search from '../../../Assets/images/search.png';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const SearchFilters = ({
  role,
  state,
  projects,
  dispatch,
  ACTION_TYPES,
  handleRoleFilter,
  handleProjectFilter,
}) => {
  const userRef = useRef(null);
  const roleRef = useRef(null);
  const projectRef = useRef(null);
  const [projectOptions, setProjectOptions] = useState({});
  useEffect(() => {
    let projectsArr = [];
    if (projectsArr.length === 0) {
      projectsArr.push({ value: 0, label: 'All' });
      projects?.map(m =>
        projectsArr.push({
          value: m.name.split(' ').join('').toLowerCase(),
          label: m.name,
        }),
      );
    }
    setProjectOptions(projectsArr);
  }, [projects]);
  const roleOptions = [
    { value: '0', label: 'All' },
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Producer' },
    { value: '3', label: 'Crew' },
    { value: '4', label: 'No Role' },
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

  const handleNameFilter = e => {
    dispatch({
      type: ACTION_TYPES.NAME_FILTER,
      payload: { text: e.target.value },
    });
  };

  const clearFilters = () => {
    userRef.current.value = '';
    roleRef.current.setValue('');
    projectRef.current.setValue('');
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
    // console.log('role', role);
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
                ref={userRef}
                value={state.name_filter}
              />
            </TeamSearchHeadPart1DivHead>
          </TeamSearchHeadPart2Div>
        </TeamSearchHeadPart1>
        <TeamSearchHeadPart2>
          <TeamSearchHeadPart2Div>
            <p>Role</p>
            <TeamSearchHeadPart2DivHead2>
              <Select
                ref={roleRef}
                onChange={handleRoleFilter}
                options={roleOptions}
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
            <p>Project</p>
            <TeamSearchHeadPart2DivHead3>
              <Select
                ref={projectRef}
                // defaultValue={project}
                onChange={handleProjectFilter}
                options={projectOptions}
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
