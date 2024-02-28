import React, { useCallback, useState, useEffect } from 'react';

import acrynom from '../../Utils/acrynom';
import { Avatar } from '../CommonStyles';
import Mail from '../Icons/Mail';
import TrashCan from '../Icons/TrashCan';
import Message from '../Icons/Message';
import Meatball from '../Icons/Meatball';
import Dropdown from '../../Assets/images/dropdown.png';

// import Dropdown from '../../Assets/images/dropdown';
import {
  ActionButton,
  ActionsDiv,
  AddCrewMemberBtn,
  CrewJobTitle,
  CrewName,
  MemberContainer,
  NameAvatarDiv,
  NameJobTitleDiv,
  ContactMenuSection,
  ContactMenuDiv,
  ActionButton2,
  ContactMenuAnc,
} from './styles';
import { ADD_COLLABORATORS } from 'Config/permissionConstant';
import * as types from 'Config/permissionConstant';

const MemberListItem = ({
  name,
  job_title,
  avatar,
  children,
  draggable,
  onAvatarDragStart,
  setMemberItemMoving,
  setMemberItemMovingData,
  email,
  id,
  crew_target_key,
  crew_target_key2,
  crew_target_key3,
  ...props
}) => {
  const [dragCrew, setDragCrew] = useState(false);
  // useEffect(() => {
  //   if (dragCrew) {
  //     setMemberItemMovingData({
  //       avatar,
  //       id,
  //       job_title,
  //       name,
  //       dragType: 'CREW_MEMBER',
  //     });
  //   } else {
  //     setMemberItemMovingData({});
  //   }
  // }, [dragCrew]);
  const onCrewMemberMove = () => {
    let member = {
      avatar,
      id,
      job_title,
      name,
      dragType: 'CREW_MEMBER',
    };

    setMemberItemMovingData(member);
  };

  return (
    <MemberContainer {...props}>
      <NameAvatarDiv>
        {draggable ? (
          // <DragDropContainer
          //   targetKey={crew_target_key}
          //   onDragStart={e => {
          //     console.log('on drag start cont mem', e);
          //     // onAvatarDragStart(e);
          //   }}
          //   dragClone
          //   dragData={{
          //     avatar,
          //     id,
          //     job_title,
          //     name,
          //     dragType: 'CREW_MEMBER',
          //   }}
          // >
          //   <DragDropContainer
          //     targetKey={crew_target_key2}
          //     onDragStart={e => {
          //       console.log('on drag start cont 2', e);
          //       // onAvatarDragStart(e);
          //     }}
          //     dragClone
          //     dragData={{
          //       avatar,
          //       id,
          //       job_title,
          //       name,
          //       dragType: 'CREW_MEMBER',
          //     }}
          //   >
          // <DragDropContainer
          //   targetKey={crew_target_key}
          //   dragClone
          //   onDragStart={e => {
          //     // onCrewMemberMove();
          //     console.log('on drag start cont 3', e);
          //     setMemberItemMoving(true);
          //     // setMemberItemMovingData(e);
          //   }}
          //   onDragEnd={() => {
          //     setMemberItemMoving(false);
          //   }}
          //   dragData={{
          //     avatar,
          //     id,
          //     job_title,
          //     name,
          //     dragType: 'CREW_MEMBER',
          //   }}
          // >
          <Avatar
            // draggable={draggable}
            draggable
            onDrag={onAvatarDragStart}
            onSelect={onAvatarDragStart}
            bgImage={avatar}
          >
            {avatar ? null : acrynom(name)}
          </Avatar>
        ) : (
          // </DragDropContainer>
          //   </DragDropContainer>
          // </DragDropContainer>
          <Avatar
            draggable={draggable}
            onDrag={onAvatarDragStart}
            onSelect={onAvatarDragStart}
            bgImage={avatar}
          >
            {avatar ? null : acrynom(name)}
          </Avatar>
        )}

        <NameJobTitleDiv>
          <CrewName>{name}</CrewName>
          <CrewJobTitle>{email?.toLowerCase()}</CrewJobTitle>
        </NameJobTitleDiv>
      </NameAvatarDiv>
      <ActionsDiv>{children}</ActionsDiv>
    </MemberContainer>
  );
};

export const CrewMemberListItem = ({
  id,
  name,
  job_title,
  avatar,
  phone,
  user_details,
  onMessage,
  onMail,
  onDragStart,
  handleMemberDelete,
  email,
  setMemberItemMoving,
  myPermission,
  crew_target_key,
  setMemberItemMovingData,
  ...props
}) => {
  const memoizedOnMessage = useCallback(() => {
    onMessage(id);
  }, [id, onMessage]);

  const memoizedOnMail = useCallback(() => {
    onMail(id);
  }, [id, onMail]);

  const onMemberDragStart = event => {
    onDragStart({ id, name, job_title, avatar }, event);
  };
  const [showContactOption, setShowContactOption] = useState(false);

  return (
    <MemberListItem
      name={name}
      email={email?.toLowerCase()}
      avatar={avatar}
      id={id}
      job_title={job_title}
      setMemberItemMoving={setMemberItemMoving}
      setMemberItemMovingData={setMemberItemMovingData}
      draggable={
        myPermission?.includes(types.EDIT_SETUP_SCREEN)
          ? onDragStart
            ? true
            : false
          : false
      }
      onAvatarDragStart={onMemberDragStart}
      crew_target_key={crew_target_key}
      {...props}
    >
      {/* {showContactOption && (
        <ContactMenuSection onMouseLeave={() => setShowContactOption(false)}>
          <ContactMenuDiv>
            <div>
              <ActionButton2>
                <ContactMenuAnc href={`sms://${phone}`}>
                  <Message />
                  <p> Message</p>
                </ContactMenuAnc>
              </ActionButton2>
            </div>
          </ContactMenuDiv>
          <ContactMenuDiv>
            <div>
              <ActionButton2 onClick={memoizedOnMail}>
                <ContactMenuAnc href={`mailto:${user_details?.email}`}>
                  <Mail />
                  <p> Email </p>
                </ContactMenuAnc>
              </ActionButton2>
            </div>
          </ContactMenuDiv>
        </ContactMenuSection>
      )}
      <div
        onClick={() => setShowContactOption(!showContactOption)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={Dropdown}
          style={{ width: 10, height: 10, marginRight: 15, opacity: 0.5 }}
        />
      </div> */}

      <div className="dropdown me-1">
        {myPermission?.includes(ADD_COLLABORATORS) ? (
          <ActionButton type="button" data-bs-toggle="dropdown">
            <Meatball />
          </ActionButton>
        ) : null}
        {myPermission?.includes(ADD_COLLABORATORS) && (
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
            {/* <li>
            <span
              style={{ cursor: "pointer" }}
              className="dropdown-item"
              // onClick={onEditClicked}
            >
              <span className="dropdown-item-icon">
                <EditSquare />
              </span>
              <span className="dropdown-item-text-custom">Edit</span>
            </span>
          </li> */}

            <li>
              <a
                style={{ cursor: 'pointer' }}
                className="dropdown-item"
                href={`sms://${phone}`}
              >
                <span className="dropdown-item-icon">
                  <Message />
                </span>
                <span className="dropdown-item-text-custom">Message</span>
              </a>
              <a
                style={{ cursor: 'pointer' }}
                className="dropdown-item"
                onClick={() => memoizedOnMail()}
                href={`mailto:${user_details?.email}`}
              >
                <span className="dropdown-item-icon">
                  <Mail />
                </span>
                <span className="dropdown-item-text-custom">Mail</span>
              </a>
              <span
                style={{ cursor: 'pointer' }}
                className="dropdown-item"
                onClick={() => handleMemberDelete(id, name)}
              >
                <span className="dropdown-item-icon">
                  <TrashCan />
                </span>
                <span className="dropdown-item-text-custom">Delete</span>
              </span>
            </li>
          </ul>
        )}
      </div>
    </MemberListItem>
  );
};

export const SearchCrewMemberListItem = ({
  id,
  name,
  job_title,
  avatar,
  isAdded,
  onAdd,
  onDelete,
  forDelete,
  email,
}) => {
  const memoizedOnAdd = useCallback(() => {
    if (!isAdded) {
      const [first_name, last_name] = name.split(' ');
      onAdd({
        user: id,
        first_name,
        last_name,
        profile_image: avatar,
        email,
      });
    }
  }, [id, isAdded, onAdd]);

  return (
    <MemberListItem name={name} draggable={false} avatar={avatar} email={email}>
      {forDelete ? (
        <AddCrewMemberBtn onClick={onDelete}>Remove</AddCrewMemberBtn>
      ) : (
        <AddCrewMemberBtn disabled={isAdded} onClick={memoizedOnAdd}>
          {isAdded ? 'Added' : '+ Add'}
        </AddCrewMemberBtn>
      )}
    </MemberListItem>
  );
};
