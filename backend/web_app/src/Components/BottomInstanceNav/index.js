import React, { useState } from 'react';
import {
  Container,
  RoleText,
  InstanceContainer,
  UserContainer,
  OnlineStatus,
  OflineStatus,
} from './styles';
import { Avatar } from '../CommonStyles';
import Icon from './Icon';
import acrynom from '../../Utils/acrynom';
import trancate from '../../Utils/trancate';
import * as types from 'Config/permissionConstant';

const UserAssignComponent = ({ image, name, isOnline }) => {
  return (
    <UserContainer>
      <Avatar bgImage={image}>{image ? null : acrynom(name)}</Avatar>
      {isOnline ? <OnlineStatus /> : <OflineStatus />}
    </UserContainer>
  );
};
const BottomInstanceNav = ({
  instances,
  onlineMembers,
  onDrop,
  onContextMenu,
  myPermission,
  crew_target_key,
  cam_target_key,
  // data: { id, lan_ip },
  onDblClick = () => {},
  popup = () => {},
}) => {
  const order_one = instances?.filter(instance => instance.order === 1);
  const order_two = instances?.filter(instance => instance.order === 2);
  const order_three = instances?.filter(instance => instance.order === 3);

  const ondblClickFunc = order => {
    let instancesArr = instances;
    instancesArr = instancesArr.filter(f => f.order === order);
    let instances_lan_ip = instancesArr[0].lan_ip;
    let instances_id = instancesArr[0].id;
    // console.log('instances 2', instances_lan_ip, instances_id);
    onDblClick(instances_id, instances_lan_ip);
  };
  let lan_ip = 1;
  let id = 2;
  return (
    <Container>
      {/* <DropTarget
        targetKey={crew_target_key}
        onDragLeave={e => {
          onDrop(e, 1, order_one.length ? order_one[0].id : null);
        }}
        onHit={e => {
          // alert('You put the orange in the box!');
        }}
        // e.preventDefault();
      >
        <DropTarget
          targetKey={cam_target_key}
          // onDragLeave={e => {
          //   console.log('Drag Leave', e);
          //   onDrop(e, 1, order_one.length ? order_one[0].id : null);
          //   console.log('onDragLeave Inst', e);
          // }}
          onHit={e => {
            // alert('You put the orange in the box!');
          }}
          // e.preventDefault();
        > */}
      <InstanceContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, 1, order_one.length ? order_one[0].id : null);
        }}
        onDoubleClick={order_one?.length ? () => ondblClickFunc(1) : null}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? order_one?.length
              ? e => {
                  e.preventDefault();
                  popup(order_one[0]);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        {order_one?.length ? (
          <>
            <RoleText>{trancate(order_one[0].nick_name, 9)}</RoleText>
            <Icon active />
            {order_one[0].user ? (
              <UserAssignComponent
                name={order_one[0].user.name}
                image={order_one[0].user.profile_image}
                isOnline={onlineMembers?.find(
                  item => item[order_one[0]?.user?.id] === true,
                )}
              />
            ) : null}
          </>
        ) : (
          <>
            <RoleText>Switcher</RoleText>
            <Icon />
          </>
        )}
      </InstanceContainer>
      {/* </DropTarget>
      </DropTarget> */}

      {/* <DropTarget
        targetKey={cam_target_key}
        onDragLeave={e => {
          onDrop(e, 2, order_two.length ? order_two[0].id : null);
        }}
        onHit={e => {
          // alert('You put the orange in the box!');
        }}
        // e.preventDefault();
      >
        <DropTarget
          targetKey={crew_target_key}
          onDragLeave={e => {
            onDrop(e, 2, order_two.length ? order_two[0].id : null);
          }}
          onHit={e => {
            // alert('You put the orange in the box!');
          }}
          // e.preventDefault();
        > */}
      <InstanceContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, 2, order_two.length ? order_two[0].id : null);
        }}
        onDoubleClick={order_two?.length ? () => ondblClickFunc(2) : null}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? order_two?.length
              ? e => {
                  e.preventDefault();
                  popup(order_two[0]);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        {order_two?.length ? (
          <>
            <RoleText>{trancate(order_two[0].nick_name, 9)}</RoleText>
            <Icon active />
            {order_two[0].user ? (
              <UserAssignComponent
                name={order_two[0].user.name}
                image={order_two[0].user.profile_image}
                isOnline={onlineMembers?.find(
                  item => item[order_two[0]?.user?.id] === true,
                )}
              />
            ) : null}
          </>
        ) : (
          <>
            <RoleText>Switcher</RoleText>
            <Icon />
          </>
        )}
      </InstanceContainer>
      {/* </DropTarget>
      </DropTarget> */}

      {/* <DropTarget
        targetKey={cam_target_key}
        onDragLeave={e => {
          onDrop(e, 3, order_three.length ? order_three[0].id : null);
        }}
        onHit={e => {
          // alert('You put the orange in the box!');
        }}
        // e.preventDefault();
      >
        <DropTarget
          targetKey={crew_target_key}
          onDragLeave={e => {
            onDrop(e, 3, order_three.length ? order_three[0].id : null);
          }}
          onHit={e => {
            // alert('You put the orange in the box!');
          }}
          // e.preventDefault();
        > */}
      <InstanceContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          onDrop(e, 3, order_three.length ? order_three[0].id : null);
        }}
        onDoubleClick={order_three?.length ? () => ondblClickFunc(3) : null}
        onContextMenu={
          myPermission?.includes(types.EDIT_SETUP_SCREEN)
            ? order_three?.length
              ? e => {
                  e.preventDefault();
                  popup(order_three[0]);
                }
              : e => {
                  e.preventDefault();
                }
            : e => {
                e.preventDefault();
              }
        }
      >
        {order_three?.length ? (
          <>
            <RoleText onClick={onContextMenu}>
              {trancate(order_three[0].nick_name, 9)}
            </RoleText>
            <Icon active />
            {order_three[0].user ? (
              <UserAssignComponent
                name={order_three[0].user.name}
                image={order_three[0].user.profile_image}
                isOnline={onlineMembers?.find(
                  item => item[order_three[0]?.user?.id] === true,
                )}
              />
            ) : null}
          </>
        ) : (
          <>
            <RoleText>Switcher</RoleText>
            <Icon />
          </>
        )}
      </InstanceContainer>
      {/* </DropTarget>
      </DropTarget> */}

      {/* <InstanceContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          // onDrop(e, ROLES_BY_NAME.DIRECTOR);
        }}
        style={{ marginRight: 15 }}
      >
        <RoleText>vMix 32...</RoleText>
        <Icon active />
        <UserAssignComponent first_name={'Sheehab'} last_name={'Pranto'} />
      </InstanceContainer>
      <InstanceContainer
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          // onDrop(e, ROLES_BY_NAME.DIRECTOR);
        }}
      >
        <RoleText>Switcher</RoleText>
        <Icon />
      </InstanceContainer> */}
    </Container>
  );
};

export default BottomInstanceNav;
