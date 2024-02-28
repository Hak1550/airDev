import React, { useState } from 'react';
import { TeamSearchMainDiv } from '../styles';
import CollaboratorsList from './CollabolatorsList';
import SearchFilters from './SearchFilters';
import SearchFooter from './SearchFooter';
import SearchHeading from './SearchHeading';
import EditCollaborator from './EditStorage';
import Pagination from 'Components/Pagination';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GearsList from './CollabolatorsList';
import {
  apiGearAssignedListRequest,
  apiInstancePatchRequest,
} from 'Redux/actions/gear';

const GearList = ({
  team,
  onChangeRightNav,
  onChange,
  onChangeAll,
  select,
  gears,
  assets,
  selectAll,
  count,
  loading,
  projects,
  state,
  editGear,
  dispatch,
  ACTION_TYPES,
  currentPage,
  setCurrentPage,
  postsPerPage,
  handleNameFilter,
  handleDeviceFilter,
  handleCategoryFilter,
  onGearEditApi,
  filterAssets,
  setFilterAssets,
}) => {
  const [editView, setEditView] = useState(false);
  const [editUser, setEditUser] = useState({});
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const [postsPerPage] = useState(6);
  // const [currentPage, setCurrentPage] = useState(1);

  // const ACTION_TYPES = {
  //   NAME_FILTER: 'Name_filter',
  //   ROLE_FILTER: 'Role_filter',
  //   PROJECT_FILTER: 'Project_filter',
  //   FILL_OBJECT: 'Fill_object',
  //   CLEAR_FILTERS: 'Clear_filter',
  // };
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case ACTION_TYPES.ROLE_FILTER:
  //       return { ...state, role_filter: action.payload.text };
  //     case ACTION_TYPES.NAME_FILTER:
  //       return { ...state, name_filter: action.payload.text };
  //     case ACTION_TYPES.PROJECT_FILTER:
  //       return { ...state, project_filter: action.payload.text };

  //     default:
  //       return state;
  //   }
  // };
  // const [state, dispatch] = useReducer(reducer, {
  //   name_filter: '',
  //   role_filter: '',
  //   project_filter: '',
  // });

  // const onChangeAll = val => {};

  // const onChange = (each, id) => {};

  const closeSideBar = () => {
    setEditView(false);
  };
  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPg = () => {
    let totPage = Math.ceil(gears.length / postsPerPage);
    if (currentPage < totPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <TeamSearchMainDiv>
        <SearchFilters
          // device={state.device_filter}
          // category={state.category_filter}
          // name={state.name_filter}

          dispatch={dispatch}
          state={state}
          ACTION_TYPES={ACTION_TYPES}
          handleNameFilter={handleNameFilter}
          handleDeviceFilter={handleDeviceFilter}
          handleCategoryFilter={handleCategoryFilter}
        />
        <SearchHeading
          onChangeAll={onChangeAll}
          selectAll={selectAll}
          filterAssets={filterAssets}
          setFilterAssets={setFilterAssets}
        />
        <GearsList
          indexOfFirstPost={indexOfFirstPost}
          indexOfLastPost={indexOfLastPost}
          onChange={onChange}
          editGear={editGear}
          state={state}
          gears={gears}
          name_filter={state.name_filter}
          device_filter={state.device_filter}
          category_filter={state.category_filter}
          team={team}
          loading={loading}
          filterAssets={filterAssets}
        />
        {editView ? (
          <EditCollaborator closeSideBar={closeSideBar} editUser={editUser} />
        ) : null}
      </TeamSearchMainDiv>
      <SearchFooter
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        prePage={prePage}
        nextPg={nextPg}
        team={team}
        count={count}
      />
    </>
  );
};

export default GearList;
