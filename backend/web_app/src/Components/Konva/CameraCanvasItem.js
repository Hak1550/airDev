import { Group, Text, Image, Rect, Circle } from 'react-konva';
import useImage from 'use-image';

import RoundedImage from './RoundedImage';
import defaultAvatar from '../../Assets/images/avatar.png';
import * as types from 'Config/permissionConstant';
// import gear from './gear.svg';
import gear from './newGear.svg';
// import gear from '../../Assets/images/canvasGear.png';
import truncate from '../../Utils/trancate';
import { useEffect, useRef, useState } from 'react';
import RoundedImageDefault from './RoundedImageDefault';

const STATUS = {
  0: '#FBC348',
  1: '#12B76A',
  false: '#FBC348',
  true: '#12B76A',
};

const CameraCanvasItem = ({
  x,
  y,
  rotation,
  camera_placeholder,
  memberItemMoving = false,
  data,
  cameraStatus,
  data: { id, owner_name, status = 'CONNECTING', lan_ip },
  onClick = () => {},
  onContextMenu = () => {},
  onTransformEnd = () => {},
  onDragMove = () => {},
  onDblClick = () => {},
  myPermission,
  memberData,
  draggable,
  scale,
  ...props
}) => {
  const [onGearClick, setOnGearClick] = useState(false);
  const imageRef = useRef();
  const [img] = useImage(gear);
  const getScale = scaleVal => {
    const base = 0.5;
    console.log('Math.abs(base - scaleVal) : ', Math.abs(base - scaleVal));
    return base - scaleVal > 0.1 ? base - scaleVal : 0.1;
    // if (scaleVal <= 0.05) return 0.6;
    // if (scaleVal > 0.05 && scaleVal <= 0.1) return 0.6;
    // if (scaleVal > 0.1 && scaleVal <= 0.15) return 0.5;
    // if (scaleVal > 0.15 && scaleVal <= 0.2) return 0.4;
    // if (scaleVal > 0.2 && scaleVal <= 0.25) return 0.3;
    // if (scaleVal > 0.25) return 0.25;
  };
  useEffect(() => {
    if (rotation && img?.complete) {
      const degToRad = Math.PI / 180;

      const rotatePoint = ({ x, y }, deg) => {
        const rcos = Math.cos(deg * degToRad),
          rsin = Math.sin(deg * degToRad);
        return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
      };

      //current rotation origin (0, 0) relative to desired origin - center (node.width()/2, node.height()/2)
      const topLeft = {
        x: -imageRef.current.width() / 2,
        y: -imageRef.current.height() / 2,
      };
      const current = rotatePoint(topLeft, imageRef.current.rotation());
      const rotated = rotatePoint(topLeft, rotation);
      const dx = rotated.x - current.x,
        dy = rotated.y - current.y;

      imageRef.current.rotation(rotation);
      imageRef.current.x(imageRef.current.x() + dx);
      imageRef.current.y(imageRef.current.y() + dy);
    }
  }, [rotation, img]);
  const length = memberData?.length > 3 ? 3 : memberData?.length;

  // useEffect(() => {
  //   console.log('onGearClick', onGearClick);
  //   // onClick();
  //   // onDblClick();
  // }, [onGearClick]);
  const [contextMenu, setContextMenu] = useState({
    exist: false,
    value: false,
  });
  useEffect(() => {
    if (props?.imageSize === false || props?.imageSize === true) {
      setContextMenu(prev => ({
        ...prev,
        exist: true,
        value: props.imageSize,
      }));
    }
  }, [props?.imageSize]);
  return (
    <Group
      x={x}
      y={y}
      draggable={draggable}
      name={'group-container-' + id}
      // I will use offset to set origin to the center of the image
      offsetX={50}
      offsetY={50}
      onContextMenu={
        contextMenu.exist &&
        myPermission?.includes(types.EDIT_SETUP_SCREEN) &&
        !contextMenu.value &&
        onContextMenu
      }
      onDblClick={() => onDblClick(id, lan_ip)}
      onClick={() => {
        onClick();
        setOnGearClick(!onGearClick);
      }}
      onDragMove={onDragMove}
      onDblTap={() => onDblClick(id, lan_ip)}
      onTap={onClick}
      onTouchMove={onDragMove}
      onTouchEnd={
        myPermission?.includes(types.EDIT_SETUP_SCREEN) && onContextMenu
      }
      scaleX={
        // props?.imageSize
        //   ? scale && scale / 10 < 0.15
        //     ? 0.5
        //     : scale / 10 >= 0.15 && scale / 10 < 0.2
        //     ? 0.4
        //     : 0.3
        //   : 0.25
        props?.imageSize ? scale && getScale(scale / 10) : 0.25
      }
      scaleY={
        // scale && scale / 10 < 0.15 ? 0.15 : scale / 10 > 0.2 ? 0.2 : scale / 10
        // 0.25
        // props?.imageSize
        //   ? scale && scale / 10 < 0.15
        //     ? 0.5
        //     : scale / 10 >= 0.15 && scale / 10 < 0.2
        //     ? 0.4
        //     : 0.3
        //   : 0.25
        props?.imageSize ? scale && getScale(scale / 10) : 0.25
      }
      // scaleX={1}
      // scaleY={1}
    >
      <Rect
        height={150}
        width={100}
        fill={'transparent'}
        shadowColor={'#101828'}
        shadowOffsetX={0}
        shadowOffsetY={4}
        shadowBlur={8}
        cornerRadius={[6, 6, 0, 0]}
        shadowOpacity={0.1}
      />
      <Image
        image={img}
        x={24.5}
        y={18}
        ref={imageRef}
        rotation={0}
        name={'group-container-image-' + id}
        onTransformEnd={onTransformEnd}
      />
      <Group fill={'#333'} height={120} width={100}>
        <Rect
          height={20}
          width={100}
          fill={'#fff'}
          offsetY={-100}
          shadowColor={'#101828'}
          shadowOffsetX={0}
          shadowOffsetY={4}
          shadowBlur={8}
          cornerRadius={[6, 6, 0, 0]}
          shadowOpacity={0.5}
        />
        <Circle
          height={12}
          width={12}
          y={110}
          x={14}
          fill={STATUS[cameraStatus]}
        />
        <Text
          y={103}
          x={24}
          width={80}
          text={
            camera_placeholder ? `Cam ${camera_placeholder}` : data.nick_name
          }
          // text={owner_name}
          align={'left'}
          fontFamily="Inter"
          fontSize={14}
          fontStyle="bold"
          ellipsis={true}
          wrap={'none'}
        />
      </Group>
      <Group>
        <Rect
          y={120}
          height={40}
          width={100}
          fill={'#7B61FF'}
          shadowColor={'#101828'}
          shadowOffsetX={0}
          shadowOffsetY={4}
          shadowBlur={8}
          cornerRadius={[0, 0, 6, 6]}
          shadowOpacity={0.1}
          visible={memberItemMoving}
        />
        <Text
          y={135}
          x={0}
          width={100}
          fill={'#ffffff'}
          text={'Drop Here'}
          align={'center'}
          fontFamily="Inter"
          fontSize={10}
          visible={memberItemMoving}
        />
        <Rect
          y={126}
          x={6}
          height={28}
          width={88}
          fill={'#7B61FF00'}
          dash={[3, 3]}
          stroke={'#fff'}
          shadowColor={'#101828'}
          shadowOffsetX={0}
          shadowOffsetY={4}
          shadowBlur={8}
          cornerRadius={6}
          shadowOpacity={0.1}
          visible={memberItemMoving}
        />
      </Group>
      <Group visible={!!memberData?.length}>
        <Rect
          y={120}
          height={63}
          width={100}
          fill={'#7B61FF'}
          shadowColor={'#101828'}
          shadowOffsetX={0}
          shadowOffsetY={4}
          shadowBlur={8}
          cornerRadius={[0, 0, 6, 6]}
          shadowOpacity={0.1}
        />
        <Group>
          {memberData?.map((member, index) => {
            if (index > 2) {
              return null;
            }
            const length = memberData?.length > 3 ? 3 : memberData?.length;
            return (
              <>
                <RoundedImageDefault
                  x={
                    length === 2
                      ? 5 + (index + 1) * 18
                      : length === 3
                      ? -length * 1.5 + (index + 1) * 18
                      : 33
                  }
                  y={128}
                  height={36}
                  width={36}
                  cornerRadius={18}
                  image={member.profile_image}
                  defaultImage={defaultAvatar}
                  isOnline={member?.isOnline}
                  key={member.id}
                />
              </>
            );
          })}
          <Circle
            height={10}
            width={10}
            y={158}
            x={length * 20 + 40 - (length - 1) * 9}
            stroke={'#fff'}
            fill={STATUS[memberData[length - 1]?.isOnline]}
          />
        </Group>

        <Text
          y={166}
          x={0}
          width={100}
          fill={'#ffffff'}
          text={
            memberData?.length > 1
              ? 'Multiple...'
              : truncate(
                  memberData[0]?.first_name + ' ' + memberData[0]?.last_name,
                  12,
                  '.',
                )
          }
          align={'center'}
          fontFamily="Inter"
          fontSize={10}
        />
      </Group>
    </Group>
  );
};

export default CameraCanvasItem;
