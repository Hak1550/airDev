import React, { useState, useEffect } from 'react';
import {
  AssignedProjectHead,
  InitialsDiv,
  InitialsNameDiv,
  InitialsNameDiv2,
  InitialsNameDiv2P,
  InitialsP,
  InviteDiv,
  InviteDiv2,
  MainSelectImg2,
  NoCollaborator,
  NoCollaboratorAll,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  RightNavContainerXPar2,
  RightNavContainerXPar2Transform,
  RightNavContainerXPar3,
  RNCFBtn,
  RNCFBtn2,
  SBMSDiv,
  SBMSImg,
  SBMSImg2,
  SBMSInput,
  SDMHeading,
  SideBarMainDiv2,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../styles';
import search from '../../../Assets/images/search.png';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import cross from '../../../Assets/images/cross.png';
import addBlue from '../../../Assets/images/addBlue.png';
import arrowDown from '../../../Assets/images/arrowDown.png';
import NewProject from './NewProject';
import {
  apiAddMemberRequest,
  apiRemoveMemberRequest,
} from '../../../Redux/actions/project';
import { useDispatch, useSelector } from 'react-redux';
import { apiTeamListRequest } from '../../../Redux/actions/team';

const ManageProjects = props => {
  let {
    closeSideBar,
    projects,
    editUser,
    setAllProjectsArr,
    ACTION_TYPES,
    dispatch,
  } = props;
  const [assignProjects, setAssignProjects] = useState(false);
  const [allProjects, setAllProjects] = useState(true);
  const [filterProjects, setFilterProjects] = useState('');
  const [projects1, setProjects] = useState(editUser.projects);

  const auth = useSelector(state => state.auth);
  const dispatchRedux = useDispatch();

  const onRemoveProject = (project, index) => {
    let user_id = editUser.user.id;
    let project_id = project.id;
    let array = [...projects1];
    array.splice(index, 1);
    setProjects(array);
    let array1 = [...projects];
    array1.filter(f => f.id === project.id).map(m => (m.added = false));
    setAllProjectsArr(array1);

    dispatchRedux(apiRemoveMemberRequest(user_id, project_id, auth.token));
  };

  const onAddProject = project_id => {
    let user_id = editUser.user.id;
    let array = [...projects];
    array.filter(f => f.id === project_id).map(m => (m.added = true));
    setAllProjectsArr(array);
    dispatchRedux(apiAddMemberRequest(user_id, project_id, auth.token));
  };

  const showAllProjects = () => {
    setAllProjects(!allProjects);
  };

  const onDone = () => {
    dispatchRedux(apiTeamListRequest(auth.token));
    closeSideBar();
    dispatch({
      type: ACTION_TYPES.NAME_FILTER,
      payload: { text: '' },
    });
  };
  return (
    <RightNavContainer>
      {/* =========================Header=================================== */}
      <RightNavContainerX onClick={closeSideBar}>
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      <SideBarMainDiv2>
        <SDMHeading>Manage Projects</SDMHeading>
        <SBMSDiv>
          <SBMSImg2 src={search} />
          <SBMSInput
            type="text"
            placeholder="Search"
            onChange={e => setFilterProjects(e.target.value)}
          />
        </SBMSDiv>
        {/* =========================Body=================================== */}
      </SideBarMainDiv2>

      <AssignedProjectHead>
        <p
          style={{
            marginBottom: 0,
            fontWeight: 500,
            color: '#344054',
            fontfamily: 'Inter',
            fontweight: 500,
            fontsize: 16,
          }}
        >
          Assigned to {editUser.projects.length} projects
        </p>
        <div>
          <>
            <RightNavContainerXPar3
              src={addBlue}
              onClick={() => setAssignProjects(true)}
            />
            {allProjects ? (
              <RightNavContainerXPar2
                src={arrowDown}
                onClick={showAllProjects}
              />
            ) : (
              <RightNavContainerXPar2Transform
                src={arrowDown}
                onClick={showAllProjects}
              />
            )}
          </>
        </div>
      </AssignedProjectHead>
      <>
        {allProjects ? (
          <InviteDiv>
            {projects1.length !== 0 ? (
              projects1.filter(all =>
                all.name.toLowerCase().includes(filterProjects.toLowerCase()),
              ).length !== 0 ? (
                projects1
                  .filter(all =>
                    all.name
                      .toLowerCase()
                      .includes(filterProjects.toLowerCase()),
                  )
                  // .slice(projects.length - 5, projects.length - 1)
                  .map((user, index) => {
                    return (
                      <InviteDiv2 key={index}>
                        <InitialsDiv>
                          <InitialsP>
                            {user.name?.split('')[0].toUpperCase()}
                            {user.name?.split('')[1].toUpperCase()}
                          </InitialsP>
                        </InitialsDiv>
                        <InitialsNameDiv>
                          <p
                            style={{
                              marginBottom: 0,
                              fontWeight: 500,
                              fontSize: 14,
                              fontfamily: 'Inter',
                              color: '#344054',
                            }}
                          >
                            {user.name?.toUpperCase()}
                          </p>
                        </InitialsNameDiv>
                        <div
                          style={{ marginRight: 20, cursor: 'pointer' }}
                          onClick={() => onRemoveProject(user, index)}
                        >
                          <p
                            style={{
                              marginBottom: 0,
                              fontSize: 14,
                              color: '#B42318',
                              fontWeight: 500,
                              fontfamily: 'Inter',
                            }}
                          >
                            Remove
                          </p>
                        </div>
                      </InviteDiv2>
                    );
                  })
              ) : (
                <NoCollaborator>
                  <p style={{ marginBottom: 0, color: '#667085' }}>
                    No Project Found
                  </p>
                </NoCollaborator>
              )
            ) : (
              <NoCollaboratorAll>
                <p style={{ marginBottom: 0, color: '#667085' }}>
                  No Projects to show
                </p>
              </NoCollaboratorAll>
            )}
          </InviteDiv>
        ) : (
          <InviteDiv>
            {projects.length !== 0 ? (
              projects.filter(all =>
                all.name.toLowerCase().includes(filterProjects.toLowerCase()),
              ).length !== 0 ? (
                projects
                  .filter(all =>
                    all?.name
                      .toLowerCase()
                      .includes(filterProjects.toLowerCase()),
                  )
                  .map((user, index) => {
                    var randomColor = Math.floor(
                      Math.random() * 16777215,
                    ).toString(16);

                    return (
                      <InviteDiv2 key={index}>
                        <MainSelectImg2
                          src={user.added ? tick : CheckboxBase}
                          onClick={
                            user.added
                              ? () => onRemoveProject(user, index)
                              : () => onAddProject(user.id)
                          }
                        />
                        <InitialsNameDiv2>
                          <InitialsNameDiv2P randomColor={randomColor}>
                            {user.name.toUpperCase()}
                          </InitialsNameDiv2P>
                        </InitialsNameDiv2>
                      </InviteDiv2>
                    );
                  })
              ) : (
                <NoCollaborator>
                  <p style={{ marginBottom: 0, color: '#667085' }}>
                    No Project Found
                  </p>
                </NoCollaborator>
              )
            ) : (
              <NoCollaboratorAll>
                <p style={{ marginBottom: 0, color: '#667085' }}>
                  No Projects to show
                </p>
              </NoCollaboratorAll>
            )}
          </InviteDiv>
        )}
      </>

      {/* =========================Footer=================================== */}
      <RightNavContainerFoot>
        <RNCFBtn>
          <TeamHeadBtnImgP onClick={closeSideBar}>Cancel</TeamHeadBtnImgP>
        </RNCFBtn>
        <RNCFBtn2>
          <TeamHeadBtnImgPa onClick={onDone}>Done</TeamHeadBtnImgPa>
        </RNCFBtn2>
      </RightNavContainerFoot>
      {assignProjects ? (
        <NewProject
          closeSideBar={closeSideBar}
          projects={projects}
          setProjects={setProjects}
          edituser={editUser}
          token={auth.token}
          onDone={onDone}
          onAddProject={onAddProject}
          setAllProjectsArr={setAllProjectsArr}
        />
      ) : null}
    </RightNavContainer>
  );
};

export default ManageProjects;
