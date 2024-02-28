import React, { useState } from 'react';
import {
  InitialsAddDiv,
  InitialsDiv,
  InitialsNameDiv,
  InitialsP,
  InviteDiv2,
  InviteDivAssign,
  NoCollaborator,
  NoCollaboratorInputDiv,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  RNCFBtn,
  RNCFBtn2,
  SBMSDiv,
  SBMSDiv2,
  SBMSImg2,
  SBMSInput,
  SDMHeading,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../styles';
import cross from '../../../Assets/images/cross.png';
import search from '../../../Assets/images/search.png';
import mail from '../../../Assets/images/mail.png';
import { useDispatch, useSelector } from 'react-redux';
import { apiTeamPostRequest } from 'Redux/actions/team';
import { useEffect } from 'react';
import { apiInviteRequest } from 'Redux/actions/invite';
import validateEmail from '../../../Utils/validateEmail';
import { toast } from 'react-toastify';
import Loader from 'Components/Loader';

const Invite = props => {
  let { closeSideBar, team, otherMemberList, loading } = props;
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [filterCollaborators, setFilterCollabolators] = useState('');
  const [filteredOtherMemberList, setFilteredOtherMemberList] = useState([]);

  useEffect(() => {
    let otherArr = otherMemberList;
    let teamArr = team;
    otherArr?.forEach(elem => {
      let check = teamArr?.some(secObj => secObj?.user.id === elem.user);
      check ? (elem.isAdded = true) : (elem.isAdded = false);
    });
    setFilteredOtherMemberList(otherArr);
  }, [otherMemberList]);

  const handleInviteMember = () => {
    let organisation_id =
      auth.user_information.organisation_data[0].organisation.id;
    console.log('organisation_id', organisation_id);
    if (validateEmail(filterCollaborators)) {
      dispatch(apiInviteRequest(filterCollaborators, 4, null, organisation_id));
      closeSideBar();
    } else {
      toast.error('Invalid email address!');
    }
  };

  const handleAddMember = user => {
    let organisation = auth.user_information.organisation_data[0];
    let data = {
      // organisation: {
      //   name: organisation.organisation.name,
      //   id: organisation.organisation.id,
      //   owner: organisation.organisation.owner,
      //   camera: organisation.organisation.camera,
      // },
      organisation: organisation.organisation.id,
      user: user.user,
      role: 4,
    };
    console.log('data', organisation, user, data);
    dispatch(apiTeamPostRequest(data, auth.token));
  };

  return (
    <RightNavContainer>
      {/* ======================= Cross======================== */}
      <RightNavContainerX onClick={closeSideBar}>
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      <SideBarMainDiv>
        <SDMHeading>Add Collaborators</SDMHeading>
        {/* ======================= Input ======================== */}
        <SBMSDiv>
          <SBMSImg2 src={search} />
          <SBMSInput
            type="text"
            placeholder="Search"
            onChange={e => setFilterCollabolators(e.target.value)}
          />
        </SBMSDiv>
      </SideBarMainDiv>
      {/* ======================= Users ======================== */}

      {loading ? (
        <Loader />
      ) : (
        <InviteDivAssign>
          {filteredOtherMemberList?.filter(
            all =>
              all.email
                .toLowerCase()
                .includes(filterCollaborators.toLowerCase()) ||
              all.first_name
                .toLowerCase()
                .includes(filterCollaborators.toLowerCase()),
          ).length !== 0 ? (
            filteredOtherMemberList
              ?.filter(f => f.id !== auth.user_information.id)
              .filter(
                all =>
                  all.email
                    .toLowerCase()
                    .includes(filterCollaborators.toLowerCase()) ||
                  all.first_name
                    .toLowerCase()
                    .includes(filterCollaborators.toLowerCase()),
              )
              ?.map((user, index) => {
                return (
                  <InviteDiv2 key={index}>
                    <InitialsDiv>
                      <InitialsP>
                        {user?.first_name
                          ? user?.first_name?.split('')[0].toUpperCase()
                          : user?.email?.split('')[0].toUpperCase()}
                        {user?.last_name
                          ? user?.last_name?.split('')[0].toUpperCase()
                          : user?.email?.split('')[1].toUpperCase()}
                      </InitialsP>
                    </InitialsDiv>
                    <InitialsNameDiv>
                      <p>
                        {user?.first_name
                          ? user?.first_name.toUpperCase()
                          : user?.email?.split('@')[0].toUpperCase()}{' '}
                        {user?.last_name && user?.last_name.toUpperCase()}
                      </p>
                      <p style={{ marginBottom: 10, fontSize: 12 }}>
                        {user?.email}
                      </p>
                    </InitialsNameDiv>
                    <InitialsAddDiv
                      onClick={() => handleAddMember(user)}
                      added={user.isAdded}
                    >
                      <p>{user.isAdded ? 'Added' : '+ Add'}</p>
                    </InitialsAddDiv>
                  </InviteDiv2>
                );
              })
          ) : (
            <NoCollaborator>
              <p style={{ marginBottom: 0, color: '#667085' }}>
                No Member Found
              </p>
              <SBMSDiv2>
                <NoCollaboratorInputDiv onClick={handleInviteMember}>
                  <img
                    src={mail}
                    style={{ width: 18, height: 15, marginRight: 10 }}
                  />
                  <p style={{ marginBottom: 0, fontSize: 14, fontWeight: 500 }}>
                    invite: {filterCollaborators}
                  </p>
                </NoCollaboratorInputDiv>
              </SBMSDiv2>
              {/* <SBMSDiv2>
              <NoCollaboratorInputDiv onClick={handleInviteMember}>
                <img
                  src={mail}
                  style={{ width: 18, height: 15, marginRight: 10 }}
                />
                <p style={{ marginBottom: 0, fontSize: 14, fontWeight: 500 }}>
                  invite (as Producer) : {filterCollaborators}
                </p>
              </NoCollaboratorInputDiv>
            </SBMSDiv2> */}
            </NoCollaborator>
          )}
        </InviteDivAssign>
      )}

      {/* ======================= Footer ======================== */}
      <RightNavContainerFoot>
        <RNCFBtn>
          <TeamHeadBtnImgP onClick={closeSideBar}>Cancel</TeamHeadBtnImgP>
        </RNCFBtn>
        <RNCFBtn2>
          <TeamHeadBtnImgPa onClick={closeSideBar}>Done</TeamHeadBtnImgPa>
        </RNCFBtn2>
      </RightNavContainerFoot>
    </RightNavContainer>
  );
};

export default Invite;
