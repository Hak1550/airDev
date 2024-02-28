import React, { useEffect, useState } from 'react';

import {
  AddCrewContentContainer,
  DoneButton,
  MembersSearchList,
  NavFooter,
  NoCrewMemberFoundCard,
  NoUserFoundText,
} from './styles';
import { SearchCrewMemberListItem } from '../MemberListItem';

import { OutlinedButton } from '../IconButton/styles';

const EditGearMember = ({
  onDelete,
  connection,
  members,
  gear,
  onClose,
  onDone,
}) => {
  const options = {
    product_designer: 'Product Designer',
    camera_men: 'Camera Operator',
  };
  const [memberList, setMemberList] = useState([]);
  const [delMember, setdelMember] = useState([]);

  useEffect(() => {
    if (members) {
      Array.isArray(members)
        ? setMemberList([...members])
        : setMemberList([members]);
    }
  }, [members]);

  const deleteInstanceMember = operator => {
    console.log('run', operator);
    onDelete(operator);
    setMemberList([]);
  };

  const onDeletePermission = (delMember, newMembers) => {
    onDelete(delMember, newMembers);
    setMemberList([...newMembers]);
  };
  const deleteMem = m => {
    let newArr = memberList;
    const newMemberList = newArr.filter(ml => ml.id !== m.id);
    delMember.push(m);
    // --------------------------------------------------------
    setMemberList(newMemberList);
    // ----------------------------------------------------------
  };
  const deleteMem2 = m => {
    let newArr = memberList;
    const newMemberList = newArr.filter(ml => ml.user !== m.user);
    delMember.push(m);
    // --------------------------------------------------------
    setMemberList(newMemberList);
    // ----------------------------------------------------------
  };
  console.log(memberList);
  return (
    <AddCrewContentContainer>
      <MembersSearchList>
        {memberList?.length ? (
          memberList?.map(m => (
            <SearchCrewMemberListItem
              id={m.user}
              name={
                'first_name' in m
                  ? `${m.first_name} ${m.last_name}`
                  : `${m.name}`
              }
              job_title={options[m.job_title]}
              avatar={m.profile_image}
              isAdded={false}
              onDelete={() => {
                'role_obj' in m ? deleteMem2(m) : deleteMem(m);
              }}
              forDelete
              key={m.user}
            />
          ))
        ) : (
          <NoCrewMemberFoundCard>
            <NoUserFoundText>No Users Found.</NoUserFoundText>
          </NoCrewMemberFoundCard>
        )}
      </MembersSearchList>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={() => {
            {
              !Array.isArray(members)
                ? deleteInstanceMember(members)
                : 'role_obj' in members[0]
                ? onDelete(gear.id, memberList)
                : onDeletePermission(delMember, memberList);
            }
            onClose();
          }}
        >
          Done
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default EditGearMember;
