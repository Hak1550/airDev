import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import CameraCanvasItem from './CameraCanvasItem';
import images from 'Components/PaymentFormComponent/images';

const TransformerCameraItem = ({
  scale,
  dragLayerRef,
  gearsInCanvas,
  selectedId,
  onContextMenu,
  onDragMove,
  onTransformEnd,
  memberItemMoving,
  handleGearClick,
  memberList,
  connections,
  myPermission,
  cameraStatusList,
  onlineMembers,
  draggable = true,
  imageSize,
}) => {
  const [transformer, setTransformer] = useState(false);
  useEffect(() => {
    if (transformer && draggable) {
      transformer.destroy();
      setTransformer(null);
    }
    if (selectedId && draggable) {
      const group = dragLayerRef.current.findOne(
        '.group-container-' + selectedId,
      );

      const camera = group.findOne('.group-container-image-' + selectedId);

      camera.off('transform');

      const transformerRef = new Konva.Transformer({
        node: camera,
        borderDash: [],
        anchorCornerRadius: 5,
        anchorStrokeWidth: 12,
        anchorSize: 10,
        borderStrokeWidth: 1,
        padding: 6,
        keepRatio: false,
        opacity: 1,
        enabledAnchors: ['top-right', 'top-left'],
        anchorFill: '#7B61FF',
        rotationSnaps: [0, 90, 180, 270],
        rotateAnchorOffset: 5,
        borderStroke: '#7B61FF',
        anchorStroke: '#7B61FF',
        rotateEnabled: true,
        resizeEnabled: false,
      });

      const selector = 'rotater';

      transformerRef.attachTo(camera);
      group.add(transformerRef);

      const button =
        '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><title>box-configurator-rotate</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M0.9,0.5c0.1,0,0.3,0.1,0.3,0.3L1.1,2.9c1-1.4,2.6-2.4,4.5-2.4c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3c-1.4,0-2.6-0.5-3.6-1.4c-0.1-0.1-0.1-0.3,0-0.4L2.3,9c0.1-0.1,0.3-0.1,0.4,0c0.7,0.7,1.7,1.1,2.8,1.1c2.3,0,4.2-1.9,4.2-4.2S7.8,1.7,5.5,1.7c-1.7,0-3.2,1-3.8,2.5l2.7-0.1c0.1,0,0.3,0.1,0.3,0.3v0.6c0,0.1-0.1,0.3-0.3,0.3H0.3C0.1,5.2,0,5.1,0,4.9V0.8c0-0.1,0.1-0.3,0.3-0.3H0.9z"/></svg>';

      const shape = transformerRef.findOne('.rotater');
      const icon = new Konva.Path({
        fill: 'white',
        data: button,
        name: selector + '-icon',
      });
      icon.position(shape?.position());
      icon.x(shape.x() - 5.25);
      icon.y(shape.y() - 5.25);
      transformerRef.add(icon);

      camera.on('transform', function () {
        transformerRef.update();
        const shape = transformerRef.findOne('.' + selector);
        const icon = transformerRef.findOne('.' + selector + '-icon');
        icon.position(shape?.position());
        icon.x(icon.x() - 5.25);
        icon.y(icon.y() - 5.25);
        dragLayerRef.current.batchDraw();
      });
      setTransformer(transformerRef);
    }
  }, [selectedId]);

  useEffect(() => {
    if (transformer) {
      const selector = 'rotater';
      const shape = transformer.findOne('.rotater');
      const icon = transformer.findOne('.' + selector + '-icon');
      icon?.position(shape?.position());
      icon?.x(shape.x() - 5.25);
      icon?.y(shape.y() - 5.25);
    }
  }, [scale]);
  return (
    <>
      {Object.keys(gearsInCanvas).map((key, index) => {
        const {
          x,
          y,
          camera_image_x,
          camera_image_y,
          rotation,
          camera_placeholder,
          data,
        } = gearsInCanvas[key];
        const cameraStatus =
          (cameraStatusList && cameraStatusList[data?.air_id]?.status) || false;
        let connectedMembers = [];
        let memberData = [];
        connections.forEach(connection => {
          if (connection.gear.toString() === data.id.toString()) {
            connectedMembers = connection.member;
          }
        });
        if (connectedMembers.length) {
          if (memberList) {
            connectedMembers.forEach(cMember => {
              memberList.forEach(member => {
                if (member.user.toString() === cMember.toString()) {
                  member['isOnline'] = false;
                  const getStatus = onlineMembers?.find(item => item[cMember]);
                  if (getStatus)
                    member['isOnline'] = getStatus[Object.keys(getStatus)[0]];
                  memberData.push(member);
                  return;
                }
              });
            });
            memberData.sort((a, b) => (a.isOnline > b.isOnline ? 1 : -1));
          }
        }
        return (
          <CameraCanvasItem
            key={`gear-${index}`}
            x={x}
            y={y}
            camera_image_x={camera_image_x}
            camera_image_y={camera_image_y}
            scale={scale}
            rotation={rotation}
            camera_placeholder={camera_placeholder}
            data={data}
            onClick={e => {
              handleGearClick(data.id);
            }}
            onContextMenu={e => {
              onContextMenu(e, 'GEAR', data);
            }}
            draggable={draggable}
            memberItemMoving={memberItemMoving}
            onTransformEnd={e => {
              onTransformEnd(data.id, e);
            }}
            onDragMove={e => {
              onDragMove(e, 'GEAR', data.id);
            }}
            memberData={memberData}
            myPermission={myPermission}
            cameraStatus={cameraStatus}
            imageSize={imageSize}
          />
        );
      })}
    </>
  );
};

export default TransformerCameraItem;
