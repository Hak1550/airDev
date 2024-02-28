import React, { useState } from 'react';
import { TeamSearchMainDiv, TeamTableMainDiv } from '../styles';
import CollaboratorsList from './CollabolatorsList';
import SearchFilters from './SearchFilters';
import SearchFooter from './SearchFooter';
import SearchHeading from './SearchHeading';
import EditCollaborator from './Edit';
import { useReducer } from 'react';

const SearchCollaborators = ({
  team,
  onChange,
  onChangeAll,
  select,
  selectAll,
  count,
  loading,
  projects,
  state,
  dispatch,
  ACTION_TYPES,
  currentPage,
  setCurrentPage,
  postsPerPage,
  selectRef,
  handleNameFilter,
  handleRoleFilter,
  handleProjectFilter,
  handleDeleteMember,
}) => {
  const [editView, setEditView] = useState(false);
  const [editUser, setEditUser] = useState({});
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const editCollaborator = (data, id) => {
    setEditView(true);
    setEditUser(data);
  };

  const closeSideBar = () => {
    setEditView(false);
  };
  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPg = () => {
    let totPage = Math.ceil(count / postsPerPage);
    if (currentPage < totPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <TeamTableMainDiv>
      <TeamSearchMainDiv>
        <SearchFilters
          role={state.role_filter}
          project={state.project_filter}
          name={state.name_filter}
          dispatch={dispatch}
          state={state}
          ACTION_TYPES={ACTION_TYPES}
          projects={projects}
          handleRoleFilter={handleRoleFilter}
          handleProjectFilter={handleProjectFilter}
        />
        <SearchHeading onChangeAll={onChangeAll} selectAll={selectAll} />
        <CollaboratorsList
          indexOfFirstPost={indexOfFirstPost}
          indexOfLastPost={indexOfLastPost}
          onChange={onChange}
          editCollaborator={editCollaborator}
          name_filter={state.name_filter}
          role_filter={state.role_filter}
          project_filter={state.project_filter}
          team={team}
          loading={loading}
        />
        {editView ? (
          <EditCollaborator
            closeSideBar={closeSideBar}
            editUser={editUser}
            select={select}
            projects={projects}
            handleDeleteMember={handleDeleteMember}
            ACTION_TYPES={ACTION_TYPES}
            dispatch={dispatch}
          />
        ) : null}
      </TeamSearchMainDiv>
      <SearchFooter
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        prePage={prePage}
        nextPg={nextPg}
        count={count}
      />
    </TeamTableMainDiv>
  );
};

export default SearchCollaborators;
