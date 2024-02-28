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

const AddCrewContent = ({
  search,
  onAddMember,
  onInviteClicked,
  onAddCrewEnd,
  ...props
}) => {
  const userInformation = useSelector(state => state.userInformation);
  const auth = useSelector(state => state.auth);
  const options = {
    product_designer: 'Product Designer',
    camera_men: 'Camera Operator',
  };

  return (
    <AddCrewContentContainer>
      <MembersSearchList>
        {userInformation.users.length ? (
          userInformation.users
            // .filter(u => u.user !== auth?.user?.id)
            // .sort((a, b) =>
            //   a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1,
            // )
            .map(user =>
              user.first_name || user.last_name ? (
                <SearchCrewMemberListItem
                  id={user.user}
                  name={`${user.first_name} ${user.last_name}`}
                  job_title={options[user.job_title]}
                  avatar={user.profile_image}
                  isAdded={false}
                  onAdd={onAddMember}
                  key={user.user}
                  email={user.email}
                />
              ) : null,
            )
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
              onClick={() => onInviteClicked(6)}
              className="btn btn-sm"
              style={{ marginTop: '22px' }}
            >
              <Mail />{' '}
              <span style={{ marginLeft: '5px', wordBreak: 'break-all' }}>
                Invite: {search} as a Crew for this project.
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
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onAddCrewEnd}>
          Cancel
        </OutlinedButton>
        <DoneButton className="btn btn-primary btn-sm" onClick={onAddCrewEnd}>
          Done
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default AddCrewContent;
