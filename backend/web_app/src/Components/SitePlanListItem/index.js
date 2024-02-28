import React, { useCallback } from 'react';
import EditSquare from '../Icons/EditSquare';
import TrashCan from '../Icons/TrashCan';
import Media from '../Icons/Media';
import Meatball from '../Icons/Meatball';
import * as types from 'Config/permissionConstant';

import {
  ActionButton,
  ActionsDiv,
  Avatar,
  AvatarHighlighted,
  PlanName,
  PlanNameHighlighted,
  PlanContainer,
  NameDiv,
  NameAvatarDiv,
} from './styles';

const SitePlanListItem = ({
  id,
  name,
  onEdit,
  selected,
  handleImageSelectionId,
  myPermission,
  handleBackgroundDelete,
}) => {
  const memoizedOnEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);
  return (
    <PlanContainer onDoubleClick={() => handleImageSelectionId(id)}>
      <NameAvatarDiv>
        {selected ? (
          <AvatarHighlighted>
            <Media />
          </AvatarHighlighted>
        ) : (
          <Avatar>
            <Media />
          </Avatar>
        )}

        <NameDiv>
          {selected ? (
            <PlanNameHighlighted>{name}</PlanNameHighlighted>
          ) : (
            <PlanName>{name}</PlanName>
          )}
        </NameDiv>
      </NameAvatarDiv>
      <ActionsDiv>
        <div className="dropdown me-1">
          {myPermission?.includes(types.EDIT_SETUP_SCREEN) && (
            <ActionButton type="button" data-bs-toggle="dropdown">
              <Meatball />
            </ActionButton>
          )}
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
            <li>
              <span
                style={{ cursor: 'pointer' }}
                className="dropdown-item"
                onClick={memoizedOnEdit}
              >
                <span className="dropdown-item-icon">
                  <EditSquare />
                </span>
                <span className="dropdown-item-text-custom">Edit</span>
              </span>
            </li>
            <li>
              <span
                style={{ cursor: 'pointer' }}
                className="dropdown-item"
                onClick={() => handleBackgroundDelete(id)}
              >
                <span className="dropdown-item-icon">
                  <TrashCan />
                </span>
                <span className="dropdown-item-text-custom">Delete</span>
              </span>
            </li>
          </ul>
        </div>
        {/* <ActionButton onClick={memoizedOnEdit}>
          <EditSquare />
        </ActionButton> */}
      </ActionsDiv>
    </PlanContainer>
  );
};

export default SitePlanListItem;
