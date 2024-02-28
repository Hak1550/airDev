import React from 'react';
import {
  GearContainer,
  GearDescription,
  GearIcon,
  GearName,
  NameDescriptionDiv,
  ActionButton,
  AddButton,
  AddButton2,
} from './styles';
import Meatball from '../Icons/Meatball';
import Edit from '../Icons/EditSquare';
import TrashCan from '../Icons/TrashCan';
import * as types from 'Config/permissionConstant';
import { useEffect, useState } from 'react';
import { check } from 'prettier';
import { isMobile } from 'react-device-detect';

const GearListItem = ({
  data,
  icon,
  onDragStart,
  disabled,
  myPermission,
  cam_target_key,
  ...props
}) => {
  const onGearClicked = () => console.log('Gear: ', data.id);

  const onGearDragStart = event => {
    onDragStart({ ...data }, event);
  };
  const [alreadyAssigned, setAlreadyAssigned] = useState(false);
  useEffect(() => {
    if (props?.assignedGearList) {
      let check1 = props.assignedGearList.some(f =>
        data?.camera?.air_id
          ? f?.air_id === data?.camera?.air_id
          : data.air_id === f?.air_id,
      );
      setAlreadyAssigned(check1);
    }
  }, [props?.assignedGearList]);

  return (
    <GearContainer
      onDrag={onGearDragStart}
      onClick={onGearClicked}
      {...props}
      is_deactivated={data.is_deactivated}
    >
      {myPermission?.includes(types.EDIT_SETUP_SCREEN) ? (
        // <DragDropContainer
        //   targetKey={cam_target_key}
        //   onDragStart={e => {
        //     onGearDragStart(e);
        //     console.log('on drag start cont gear', e);
        //   }}
        //   dragClone
        //   // onDragEnd={e => console.log('on drag end cont', e)}
        //   // dragData={{
        //   //   mousePosition_X: mousePos.x,
        //   //   mousePosition_y: mousePos.y,
        //   // }}
        // >
        <GearIcon
          // draggable={
          //   myPermission?.includes(types.EDIT_SETUP_SCREEN)
          //     ? true && !disabled
          //     : false
          // }
          draggable
          disabled={
            myPermission?.includes(types.EDIT_SETUP_SCREEN) ? disabled : false
          }
        >
          {icon}
        </GearIcon>
      ) : (
        // </DragDropContainer>
        <GearIcon
          // draggable={
          //   myPermission?.includes(types.EDIT_SETUP_SCREEN)
          //   ? true && !disabled
          //     : false
          //   }
          draggable
          onDragStart={e => onGearDragStart(e)}
          disabled={
            myPermission?.includes(types.EDIT_SETUP_SCREEN) ? disabled : false
          }
        >
          {icon}
        </GearIcon>
      )}
      <NameDescriptionDiv disabled={disabled}>
        <GearName>
          {data.camera ? data.camera.nick_name : data.nick_name}
        </GearName>
        <GearDescription>
          AIR ID {data.air_id ? data.air_id : data?.camera?.air_id}
        </GearDescription>
      </NameDescriptionDiv>
      {!data?.is_deactivated && (
        <>
          {props?.assignedGearList && alreadyAssigned ? (
            <AddButton2 onClick={props.onAdd} disabled>
              Added
            </AddButton2>
          ) : props?.add ? (
            <AddButton onClick={props.onAdd}>+ Add</AddButton>
          ) : (
            <div className="dropdown me-1" style={{ marginLeft: 'auto' }}>
              {myPermission?.includes(types.EDIT_SETUP_SCREEN) && (
                <ActionButton type="button" data-bs-toggle="dropdown">
                  <Meatball />
                </ActionButton>
              )}
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuOffset"
              >
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
                  <span
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    onClick={props.onGearEdit}
                  >
                    <span className="dropdown-item-icon">
                      <Edit />
                    </span>
                    <span className="dropdown-item-text-custom">Edit Gear</span>
                  </span>
                </li>
                <li>
                  <span
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item"
                    // onClick={props.onGearDelete}
                    onClick={
                      props.handleCameraDelete
                        ? () => props.handleCameraDelete(data.id)
                        : props.handleInstanceDelete
                        ? () => props.handleInstanceDelete(data.id)
                        : () => props.onGearDelete
                    }
                  >
                    <span className="dropdown-item-icon">
                      <TrashCan />
                    </span>
                    <span className="dropdown-item-text-custom">Delete</span>
                  </span>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </GearContainer>
  );
};

export default GearListItem;
