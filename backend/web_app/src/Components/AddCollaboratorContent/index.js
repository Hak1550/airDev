import Loader from 'Components/Loader';
import React from 'react';
import { useSelector } from 'react-redux';
import { OutlinedButton } from '../IconButton/styles';
import Mail from '../Icons/Mail';
import { SearchCrewMemberListItem } from '../MemberListItem';
import {
  AddCrewContentContainer,
  DoneButton,
  InviteButton,
  MembersSearchList,
  NavFooter,
  NoCrewMemberFoundCard,
  NoUserFoundText,
} from './styles';

const AddCollaboratorContent = ({
  search,
  onAddMember,
  members,
  onInviteClicked,
  onRightNavClose,
  myPermission,
}) => {
  const userInformation = useSelector(state => state.userInformation);
  const auth = useSelector(state => state.auth);
  const options = {
    product_designer: 'Product Designer',
    camera_men: 'Camera Operator',
  };
  const filteredUser = userInformation?.users.filter(
    ({ user: id }) =>
      // !members?.some(({ user: user }) => user === id) && id !== auth?.user?.id,
      !members?.some(({ user }) => user === id),
  );
  return (
    <AddCrewContentContainer>
      {userInformation.isLoading === false ? (
        <MembersSearchList>
          {filteredUser.length ? (
            filteredUser
              .sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
              .map(user => (
                <SearchCrewMemberListItem
                  id={user.user}
                  name={
                    user.first_name
                      ? `${user.first_name} ${user.last_name}`
                      : user.email
                  }
                  email={user.email}
                  avatar={user.profile_image}
                  isAdded={false}
                  onAdd={onAddMember}
                  key={user.user}
                />
              ))
          ) : (
            <NoCrewMemberFoundCard>
              <NoUserFoundText>No Users Found.</NoUserFoundText>
              <InviteButton
                onClick={() => onInviteClicked(7)}
                className="btn btn-sm"
              >
                <Mail />{' '}
                <span style={{ marginLeft: '5px', wordBreak: 'break-all' }}>
                  Invite: {search} as a Viewer for this project.
                </span>
              </InviteButton>
              <InviteButton
                onClick={() => onInviteClicked(2)}
                className="btn btn-sm"
                style={{ marginTop: '22px' }}
              >
                <Mail />{' '}
                <span style={{ marginLeft: '5px', wordBreak: 'break-all' }}>
                  Invite: {search} as a Producer for this project.
                </span>
              </InviteButton>
            </NoCrewMemberFoundCard>
          )}
        </MembersSearchList>
      ) : (
        <Loader />
      )}

      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={onRightNavClose}
        >
          Done
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default AddCollaboratorContent;
