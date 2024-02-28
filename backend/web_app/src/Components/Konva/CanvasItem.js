import { useRef } from 'react';
import { Group, Text } from 'react-konva';
import useImage from 'use-image';
import RoundedImage from './RoundedImage';
import * as types from 'Config/permissionConstant';
const CanvasItem = ({
  x,
  y,
  data,
  defaultAvatar,
  groupName = '',
  type = 'CREW_MEMBER',
  onDragMove,
  onDragMoveEnd,
  onDragMoveStart,
  myPermission,
  draggable = true,
  onClick = () => {},
  onContextMenu = () => {},
}) => {
  const [img] = useImage(data.avatar ? data.avatar : defaultAvatar);
  const ref = useRef();
  return (
    <Group
      x={x}
      y={y}
      name={`${groupName}-${data.id}`}
      ref={ref}
      // I will use offset to set origin to the center of the image
      offsetX={24}
      offsetY={24}
      draggable={draggable}
      onDragMove={e => {
        onDragMove(e, type, data.id);
      }}
      onDragStart={e => {
        onDragMoveStart(e);
        ref.current?.zIndex(10);
      }}
      onDragEnd={e => {
        onDragMoveEnd(e);
        ref.current?.zIndex(0);
      }}
      onClick={
        myPermission?.includes(types.EDIT_SETUP_SCREEN) &&
        (e => onClick(e, type, data))
      }
      onContextMenu={
        myPermission?.includes(types.EDIT_SETUP_SCREEN) &&
        (e => onContextMenu(e, type, data))
      }
      onTouchMove={e => {
        onDragMove(e, type, data.id);
      }}
      onTouchStart={e => {
        onDragMoveStart(e);
        ref.current?.zIndex(10);
      }}
      onTouchEnd={e => {
        onDragMoveEnd(e);
        ref.current?.zIndex(0);
      }}
      onTap={
        myPermission?.includes(types.EDIT_SETUP_SCREEN) &&
        (e => onClick(e, type, data))
      }
      onDblTap={
        myPermission?.includes(types.EDIT_SETUP_SCREEN) &&
        (e => onContextMenu(e, type, data))
      }

    >
      <RoundedImage
        x={0}
        y={0}
        height={48}
        width={48}
        cornerRadius={24}
        image={img}
      />
      <Text x={0} y={50} text={data.name} />
    </Group>
  );
};

export default CanvasItem;
