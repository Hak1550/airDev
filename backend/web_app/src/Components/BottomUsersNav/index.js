import React, { useState } from 'react';

import {
  Container,
  UserContainer,
  RoleText,
  AvatarPlaceholder,
  OnlineStatus,
  AvatarContainer,
} from './styles';
import avatar from '../../Assets/images/avatar.png';
import acrynom from '../../Utils/acrynom';
import * as types from 'Config/permissionConstant';
const ROLES_BY_NAME = {
  ADMIN: 'ADMIN',
  PRODUCER: 'PRODUCER',
  DIRECTOR: 'DIRECTOR',
  TECHNICAL_DIRECTOR: 'TECHNICAL_DIRECTOR',
  CAMERA_OP: 'CAMERA_OP',
  FIELD_CREW: 'FIELD_CREW',
  CLIENT: 'CLIENT',
  TALENT: 'TALENT',
  EDIT_OP: 'EDIT_OP',
  GRFX_OP: 'GRFX_OP',
  AUDIO_OP: 'AUDIO_OP',
  PLAYBACK_OP: 'PLAYBACK_OP',
  NO_ROLE: 'NO_ROLE',
};

const AvatarComponent = ({ users, onlineMembers }) => {
  const userData = [];
  if (users.length) {
    users?.forEach(item => {
      item['isOnline'] = false;
      const getStatus = onlineMembers?.find(member => member[item.id]);
      if (getStatus) item['isOnline'] = getStatus[Object.keys(getStatus)[0]];
      userData.push(item);
    });
    userData.sort((a, b) => (a.isOnline > b.isOnline ? 1 : -1));
  }
  return (
    <AvatarContainer>
      {userData?.length ? (
        userData.map((user, index) => {
          // const isOnline = onlineMembers?.find(item => item[user?.id] === true);
          // console.log(isOnline, 'user : ', user?.id);
          return (
            <AvatarPlaceholder
              bgImage={user?.profile_image}
              sm={users?.length > 1}
              index={index}
              last={users?.length - 1 === index}
              is_active={user.isOnline}
            >
              {user?.profile_image
                ? null
                : acrynom(user?.first_name + ' ' + user?.last_name)}
            </AvatarPlaceholder>
          );
        })
      ) : (
        <AvatarPlaceholder bgImage={avatar}></AvatarPlaceholder>
      )}
    </AvatarContainer>
  );
};

const BottomUsersNav = ({
  onDrop,
  permission_obj,
  onContextMenu,
  myPermission,
  onDeleteAllPersonell,
  onlineMembers,
  checkDeselect,

  crew_target_key,

  popup = () => {},
}) => {
  const permission = {
    director: false,
    producer: false,
    technical_director: false,
    replay: false,
    audio: false,
    grfx: false,
    client: false,
    on_sight: false,
  };
  permission_obj?.forEach(p => {
    if (p.role.name === ROLES_BY_NAME.DIRECTOR) {
      permission.director = p.users;
    }
    if (p.role.name === ROLES_BY_NAME.PRODUCER) {
      permission.producer = p.users;
    }
    if (p.role.name === ROLES_BY_NAME.TECHNICAL_DIRECTOR) {
      permission.technical_director = p.users;
    }
    if (p.role.name === ROLES_BY_NAME.EDIT_OP) {
      permission.replay = p.users;
    }
    if (p.role.name === ROLES_BY_NAME.AUDIO_OP) {
      permission.audio = p.users;
    }
    if (p.role.name === ROLES_BY_NAME.GRFX_OP) {
      permission.grfx = p.users;
    }
    if (p.role.name === ROLES_BY_NAME.CLIENT) {
      permission.client = p.users;
    }
    if (p.role.name === ROLES_BY_NAME.FIELD_CREW) {
      permission.on_sight = p.users;
    }
  });
  return (
    <Container>
      {/* <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          e.preventDefault();

          onDrop(e, ROLES_BY_NAME.DIRECTOR);
        }}
        onHit={e => {
          onDrop(e, ROLES_BY_NAME.DIRECTOR);
        }}
      > */}
      <UserContainer
        onTouchStart={checkDeselect}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, ROLES_BY_NAME.DIRECTOR);
        }}
        onContextMenu={
          permission.director.length
            ? e => {
                e.preventDefault();
                popup(permission.director, ROLES_BY_NAME.DIRECTOR);
              }
            : e => {
                e.preventDefault();
              }
        }
      >
        <RoleText>Director</RoleText>
        <AvatarComponent
          users={permission.director}
          onlineMembers={onlineMembers}
        />
      </UserContainer>
      {/* </DropTarget>
      <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          e.preventDefault();
          onDrop(e, ROLES_BY_NAME.DIRECTOR);
        }}
        onHit={e => {
          onDrop(e, ROLES_BY_NAME.PRODUCER);
        }}
      > */}
      <UserContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, ROLES_BY_NAME.PRODUCER);
        }}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? permission.producer.length
              ? e => {
                  e.preventDefault();
                  popup(permission.producer, ROLES_BY_NAME.PRODUCER);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        <RoleText>Producer</RoleText>
        <AvatarComponent
          users={permission.producer}
          onlineMembers={onlineMembers}
        />
      </UserContainer>
      {/* </DropTarget>

      <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          e.preventDefault();

          onDrop(e, ROLES_BY_NAME.TECHNICAL_DIRECTOR);
        }}
      > */}
      <UserContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, ROLES_BY_NAME.TECHNICAL_DIRECTOR);
        }}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? permission.technical_director.length
              ? e => {
                  e.preventDefault();
                  popup(
                    permission.technical_director,
                    ROLES_BY_NAME.TECHNICAL_DIRECTOR,
                  );
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        <RoleText>Talent</RoleText>
        <AvatarComponent
          users={permission.technical_director}
          onlineMembers={onlineMembers}
        />
      </UserContainer>
      {/* </DropTarget>

      <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          e.preventDefault();

          onDrop(e, ROLES_BY_NAME.AUDIO_OP);
        }}
      > */}
      <UserContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, ROLES_BY_NAME.AUDIO_OP);
        }}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? permission.audio.length
              ? e => {
                  e.preventDefault();
                  popup(permission.audio, ROLES_BY_NAME.AUDIO_OP);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        <RoleText>Audio</RoleText>
        <AvatarComponent
          users={permission.audio}
          onlineMembers={onlineMembers}
        />
      </UserContainer>
      {/* </DropTarget>

      <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          e.preventDefault();
          onDrop(e, ROLES_BY_NAME.GRFX_OP);
        }}
      > */}
      <UserContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, ROLES_BY_NAME.GRFX_OP);
        }}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? permission.grfx.length
              ? e => {
                  e.preventDefault();
                  popup(permission.grfx, ROLES_BY_NAME.GRFX_OP);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        <RoleText>Graphics</RoleText>
        <AvatarComponent
          users={permission.grfx}
          onlineMembers={onlineMembers}
        />
      </UserContainer>
      {/* </DropTarget>

      <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          e.preventDefault();

          onDrop(e, ROLES_BY_NAME.CLIENT);
        }}
      > */}
      <UserContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, ROLES_BY_NAME.CLIENT);
        }}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? permission.client.length
              ? e => {
                  e.preventDefault();
                  popup(permission.client, ROLES_BY_NAME.CLIENT);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        <RoleText>Client</RoleText>
        <AvatarComponent
          users={permission.client}
          onlineMembers={onlineMembers}
        />
      </UserContainer>
      {/* </DropTarget>

      <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          e.preventDefault();

          onDrop(e, ROLES_BY_NAME.FIELD_CREW);
        }}
      > */}
      <UserContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, ROLES_BY_NAME.FIELD_CREW);
        }}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? permission.on_sight.length
              ? e => {
                  e.preventDefault();
                  popup(permission.on_sight, ROLES_BY_NAME.FIELD_CREW);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        <RoleText>On-Site</RoleText>
        <AvatarComponent
          users={permission.on_sight}
          onlineMembers={onlineMembers}
        />
      </UserContainer>
      {/* </DropTarget> */}
    </Container>
  );
};

export default BottomUsersNav;
