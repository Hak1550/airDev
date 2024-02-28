import React, { useState } from 'react';
import {
  InitialsAddDiv,
  InitialsDiv,
  InitialsNameDiv,
  InitialsP,
  InviteDiv2,
  InviteDivAssign,
  NoCollaborator2,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  RNCFBtn,
  RNCFBtn2,
  SBMSDiv,
  SBMSImg,
  SBMSInput,
  SDMHeading,
  SideBarMainDiv2,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../styles';
import search from '../../../Assets/images/search.png';
import cross from '../../../Assets/images/cross.png';

const NewProject = props => {
  let { closeSideBar, projects, onDone, onAddProject } = props;
  const [filterProjects, setFilterProjects] = useState('');
  const [added, setAdded] = useState(false);
  const [allProjects, setAllProjects] = useState(projects);
  return (
    <RightNavContainer>
      {/* =========================Header=================================== */}
      <RightNavContainerX onClick={closeSideBar}>
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      <SideBarMainDiv2>
        <SDMHeading>Assign New Project</SDMHeading>
        <SBMSDiv>
          <SBMSImg src={search} />
          <SBMSInput
            type="text"
            placeholder="Search"
            onChange={e => setFilterProjects(e.target.value)}
          />
        </SBMSDiv>
        {/* =========================Body=================================== */}
      </SideBarMainDiv2>

      <InviteDivAssign>
        {/* {filterProjects !== '' ? ( */}
        {allProjects.filter(all =>
          all.name.toLowerCase().includes(filterProjects.toLowerCase()),
        ).length !== 0 ? (
          allProjects
            .filter(all =>
              all.name.toLowerCase().includes(filterProjects.toLowerCase()),
            )
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
                      }}
                    >
                      {user.name?.toUpperCase()}
                    </p>
                  </InitialsNameDiv>
                  <InitialsAddDiv
                    onClick={() => onAddProject(user.id)}
                    // added={user.isAdded}
                  >
                    <p
                      style={{
                        marginBottom: 0,
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        color: user.added ? '#027A48' : '#344054',
                      }}
                    >
                      {user.added ? 'Added!' : '+ Add'}
                    </p>
                  </InitialsAddDiv>
                </InviteDiv2>
              );
            })
        ) : (
          <NoCollaborator2>
            <p style={{ marginBottom: 0, color: '#667085' }}>
              No Project Found
            </p>
          </NoCollaborator2>
        )}
        {/*  ) : ( 
        <NoCollaborator2>
          <p style={{ marginBottom: 0, color: '#667085' }}>
            Search projects by name to get started //{' '}
          </p>
          
        </NoCollaborator2>
         )} */}
      </InviteDivAssign>
      {/* =========================Footer=================================== */}
      <RightNavContainerFoot>
        <RNCFBtn>
          <TeamHeadBtnImgP onClick={onDone}>Cancel</TeamHeadBtnImgP>
        </RNCFBtn>
        <RNCFBtn2>
          <TeamHeadBtnImgPa onClick={onDone}>Done</TeamHeadBtnImgPa>
        </RNCFBtn2>
      </RightNavContainerFoot>
    </RightNavContainer>
  );
};

export default NewProject;
