import React, { useState, useEffect, useReducer } from 'react';
import SearchCollaborators from './components/SearchCollaborators';
import TeamHeader from './components/TeamHeader';
import { CollaboratorsContainer } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiMembersListRequest,
  apiTeamDeleteRequest,
  apiTeamListRequest,
} from 'Redux/actions/team';
import { apiProjectGetRequest } from 'Redux/actions/project';
import { useRef } from 'react';
import { apiInviteRequest, resetInvite } from 'Redux/actions/invite';

const TeamPage = () => {
  const dispatchRedux = useDispatch();
  const auth = useSelector(state => state.auth);
  const team = useSelector(state => state.team);
  const invite = useSelector(state => state.invite);
  const projects = useSelector(state => state.project.projectList);
  const selectRef = useRef(null);
  const loading = team?.isLoading;
  const count = team?.teamMembers?.count;

  const [select, setSelect] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [teamNew, setTeamNew] = useState([]);
  const [otherMemberList, setOtherMemberList] = useState([]);
  const [teamHeader, setTeamHeader] = useState([]);
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const ACTION_TYPES = {
    NAME_FILTER: 'Name_filter',
    ROLE_FILTER: 'Role_filter',
    PROJECT_FILTER: 'Project_filter',
    FILL_OBJECT: 'Fill_object',
    CLEAR_FILTERS: 'Clear_filter',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.ROLE_FILTER:
        return { ...state, role_filter: action.payload.text };
      case ACTION_TYPES.NAME_FILTER:
        return { ...state, name_filter: action.payload.text };
      case ACTION_TYPES.PROJECT_FILTER:
        return { ...state, project_filter: action.payload.text };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    name_filter: '',
    role_filter: '',
    project_filter: '',
  });

  const handleNameFilter = e => {
    setCurrentPage(1);
    dispatch({
      type: ACTION_TYPES.NAME_FILTER,
      payload: { text: e.target.value },
    });
  };

  const handleRoleFilter = e => {
    dispatch({
      type: ACTION_TYPES.ROLE_FILTER,
      payload: { text: e.value !== '0' ? e.value : null },
    });
  };
  const handleProjectFilter = e => {
    dispatch({
      type: ACTION_TYPES.PROJECT_FILTER,
      payload: { text: e.value == '0' ? '' : e.label },
    });
  };

  // const changePage = number => {
  //   if (currentPage === number) return;
  //   setCurrentPage(number);
  // };

  const handleDeleteMember = user => {
    let collaborator_id = user.collaborator_id;
    console.log(collaborator_id, 'collaborator_id');
    dispatchRedux(apiTeamDeleteRequest(collaborator_id, auth.token));
  };

  const fetchAllProjects = () => {
    dispatchRedux(
      apiTeamListRequest(
        auth.token,
        state.name_filter.toLowerCase(),
        state.role_filter,
        state.project_filter,
        currentPage,
        selectAll,
      ),
    );
  };
  const onChangeAll = val => {
    setSelectAll(!selectAll);
  };

  const onChange = each => {
    changeCollabUI(each);
    changeCollabDownlaodList(each);
  };

  const changeCollabDownlaodList = obj => {
    let newArr2 = [...teamHeader];
    newArr2.filter(f => f.collaborator_id === obj.collaborator_id);
    // .map(m => (m.isSelected = !m.isSelected));
    setTeamHeader(newArr2);
  };

  const changeCollabUI = obj => {
    let newArr = [...teamNew];
    newArr
      .filter(f => f.collaborator_id === obj.collaborator_id)
      .map(m => (m.isSelected = !m.isSelected));
    setTeamNew(newArr);
    setSelect(!select);
  };

  useEffect(() => {
    fetchAllProjects();
  }, [state, currentPage, selectAll]);

  useEffect(() => {
    let teamArr = team.teamMembers.results?.map(m => ({
      ...m,
      isSelected: false,
    }));
    setTeamNew(teamArr);
    setTeamHeader(teamArr);

    let otherMemberArr = team?.otherMemberList;
    setOtherMemberList(otherMemberArr);

    if (selectAll) {
      let teamArr = team.teamMembers.results?.map(m => ({
        ...m,
        isSelected: true,
      }));
      setTeamHeader(teamArr);
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const teamNewArr = teamArr.slice(indexOfFirstPost, indexOfLastPost);
      setTeamNew(teamNewArr);
    } else {
      let teamArr = team.teamMembers.results?.map(m => ({
        ...m,
        isSelected: false,
      }));
      setTeamNew(teamArr);
      setTeamHeader(teamArr);
    }
  }, [team]);

  useEffect(() => {
    dispatchRedux(apiMembersListRequest(auth.token));
    dispatchRedux(apiProjectGetRequest(auth.token));
    fetchAllProjects();
  }, []);

  useEffect(() => {
    if (invite.success) {
      dispatch(resetInvite());
    }
  }, [invite]);

  return (
    <CollaboratorsContainer>
      <TeamHeader
        team={teamHeader}
        otherMemberList={otherMemberList}
        count={count}
        selectAll={selectAll}
        loading={loading}
      />
      <SearchCollaborators
        team={teamNew}
        onChange={onChange}
        onChangeAll={onChangeAll}
        select={select}
        selectAll={selectAll}
        count={count}
        loading={loading}
        projects={projects}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        state={state}
        dispatch={dispatch}
        ACTION_TYPES={ACTION_TYPES}
        selectRef={selectRef}
        handleNameFilter={handleNameFilter}
        handleRoleFilter={handleRoleFilter}
        handleProjectFilter={handleProjectFilter}
        handleDeleteMember={handleDeleteMember}
      />
    </CollaboratorsContainer>
  );
};

export default TeamPage;
