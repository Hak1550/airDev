import React from 'react';
import { SearchMainDiv } from '../styles';
import SearchFilters from './SearchFilters';
import SearchFooter from './SearchFooter';
import SearchHeading from './SearchHeading';
import ProjectList from './ProjectList';
import Loader from 'Components/Loader';

const SearchProjects = props => {
  const {
    projectState,
    count,
    state,
    dispatch,
    ACTION_TYPES,
    changePage,
    postsPerPage,
    setCurrentPage,
    currentPage,
    handleNameFilter,
    handleClientFilter,
    clearFilters,
    selectRef,
    handleModalShow,
  } = props;

  return (
    <>
      <SearchMainDiv style={{ background: '#FFF' }}>
        <SearchFilters
          name={state.name_filter}
          client={state.client_filter}
          dispatch={dispatch}
          state={state}
          ACTION_TYPES={ACTION_TYPES}
          projects={projectState?.archiveProjectList?.results}
          handleNameFilter={handleNameFilter}
          handleClientFilter={handleClientFilter}
          clearFilters={clearFilters}
          selectRef={selectRef}
        />
        <SearchHeading />
        {projectState?.isLoading ? (
          <Loader />
        ) : (
          <ProjectList
            projects={projectState?.archiveProjectList?.results}
            handleModalShow={handleModalShow}
          />
        )}
      </SearchMainDiv>
      <SearchFooter
        itemsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        itemsCount={count}
        changePage={changePage}
      />
    </>
  );
};

export default SearchProjects;
