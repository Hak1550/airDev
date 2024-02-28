import React, { useEffect } from 'react';
import { CollaboratorsContainer } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import SearchProjects from './components/SearchProjects';
import {
  apiArchiveProjectGetRequest,
  apiProjectDeleteRequest,
  resetProject,
} from 'Redux/actions/project';
import { useState } from 'react';
import { useReducer } from 'react';
import { useRef } from 'react';
import Modal from 'Components/Modal';
import errorIcon from '../../Assets/icons/errorIcon.svg';
import { ModalFooter } from 'Components/CommonStyles';
import { Button } from 'react-bootstrap';

const ArchiveProjectsPage = () => {
  const auth = useSelector(state => state.auth);
  const projectState = useSelector(state => state.project);
  const dispatchRedux = useDispatch();
  const [postsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const selectRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState({ name: '', id: '' });

  const ACTION_TYPES = {
    NAME_FILTER: 'Name_filter',
    CLIENT_FILTER: 'Client_filter',
    FILL_OBJECT: 'Fill_object',
    CLEAR_FILTERS: 'Clear_filter',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.CLIENT_FILTER:
        return { ...state, client_filter: action.payload.text };
      case ACTION_TYPES.NAME_FILTER:
        return { ...state, name_filter: action.payload.text };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    name_filter: '',
    client_filter: '',
  });

  const handleModalShow = (id, name) => {
    setModalShow(true);
    setSelectedProject({ name: name, id: id });
  };
  const handleNameFilter = e => {
    setCurrentPage(1);
    dispatch({
      type: ACTION_TYPES.NAME_FILTER,
      payload: { text: e.target.value },
    });
  };
  const handleClientFilter = e => {
    setCurrentPage(1);
    dispatch({
      type: ACTION_TYPES.CLIENT_FILTER,
      payload: { text: e.value },
    });
  };

  const clearFilters = () => {
    selectRef.current.setValue('');
    dispatch({
      type: ACTION_TYPES.NAME_FILTER,
      payload: { text: '' },
    });
    dispatch({
      type: ACTION_TYPES.CLIENT_FILTER,
      payload: { text: '' },
    });
  };

  const changePage = number => {
    if (currentPage === number) return;
    setCurrentPage(number);
  };

  const fetchArchiveProjects = () => {
    dispatchRedux(
      apiArchiveProjectGetRequest(
        auth.token,
        0,
        state.name_filter,
        '',
        state.client_filter,
        currentPage,
        postsPerPage,
      ),
    );
  };
  const deleteClicked = () => {
    dispatchRedux(apiProjectDeleteRequest(selectedProject.id, auth.token));
    setModalShow(false);
  };
  const modalFooter = (
    <ModalFooter>
      <Button onClick={() => setModalShow(false)} variant="light">
        Cancel
      </Button>
      <Button onClick={deleteClicked} variant="danger">
        Delete
      </Button>
    </ModalFooter>
  );
  useEffect(() => {
    fetchArchiveProjects();
  }, [currentPage, state]);

  useEffect(() => {
    fetchArchiveProjects();
  }, []);

  useEffect(() => {
    if (
      projectState.postSuccess === true ||
      projectState?.deleteSuccess === true
    ) {
      clearFilters();
      dispatchRedux(resetProject());
    }
  }, [projectState?.postSuccess, projectState?.deleteSuccess]);

  return (
    <CollaboratorsContainer>
      <Header count={projectState?.archiveProjectList?.count} />
      <SearchProjects
        projectState={projectState}
        count={projectState?.archiveProjectList?.count}
        state={state}
        dispatch={dispatch}
        ACTION_TYPES={ACTION_TYPES}
        changePage={changePage}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        handleNameFilter={handleNameFilter}
        handleClientFilter={handleClientFilter}
        clearFilters={clearFilters}
        selectRef={selectRef}
        handleModalShow={handleModalShow}
      />
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        icon={errorIcon}
        title={'Permanently Delete Project?'}
        body={`Are you sure you want to delete ${selectedProject?.name}? This will delete all information associated with this project and cannot be undone.`}
        footer={modalFooter}
      />
    </CollaboratorsContainer>
  );
};

export default ArchiveProjectsPage;
