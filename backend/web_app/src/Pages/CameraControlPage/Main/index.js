import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import queryString from 'query-string';
import { Portal } from 'react-konva-utils';

import {
  MainContentContainer,
  BottomUsersNavContainer,
  ZoomToolContainer,
  BottomUsersNavContainer2,
} from './styles';

import BottomUsersNav from '../../../Components/BottomUsersNav';
import ZoomTool from '../../../Components/ZoomTool';

import {
  apiGearAssignedListRequest,
  apiGearListRequest,
} from '../../../Redux/actions/gear';
import CameraLayout from '../../../Layouts/CameraControlLayout';
import CameraCanvasItem from '../../../Components/Konva/CameraCanvasItem';
import BottomInstanceNav from '../../../Components/BottomInstanceNav';
import { apiGetOnlineMembers } from 'Redux/actions/user_information';
import Loader from 'Components/Loader';
import { apiGetCameraStatusRequest } from 'Redux/actions/onlineStatus';
function parseCameraConnectionObject(camera_connections) {
  console.log('conn : ', camera_connections);
  const membersInCanvas = {};
  const gearsInCanvas = {};
  const connections = [];
  const air_ids = [];
  camera_connections.forEach(c => {
    air_ids.push(c?.camera?.air_id);
    if (c.camera_id) {
      gearsInCanvas[c.camera_id] = {
        x: c.camera_x,
        y: c.camera_y,
        camera_image_x: c.camera_image_x,
        camera_image_y: c.camera_image_x,
        rotation: c.camera_rotation,
        camera_placeholder: c.camera_placeholder,
        data: c.camera,
      };
    }
    if (c.camera_operator_id) {
      membersInCanvas[c.camera_operator_id] = {
        x: c.camera_operator_x,
        y: c.camera_operator_y,
        data: c.camera_operator,
      };
    }
    //   if (c.camera_id && c.camera_operator_id) {
    //     connections.push({
    //       member: c.camera_operator_id,
    //       gear: c.camera_id,
    //     });
    //   }
    // });
    if (c.camera_id && Array.isArray(c.camera_operator)) {
      const member_ids_parsed = [];
      c.camera_operator.forEach(c => member_ids_parsed.push(c.id));
      connections.push({
        member: member_ids_parsed,
        gear: c.camera_id,
      });
    }
  });

  return {
    membersInCanvas,
    gearsInCanvas,
    connections,
    air_ids,
  };
}

const Main = ({ state, project_id }) => {
  const backgroundImageRef = useRef(null);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const params = queryString.parse(window.location.search);

  // canvas
  const [scale, setScale] = useState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [image] = useImage(state.shoot?.background_image);

  const [gearsInCanvas, setGearsInCanvas] = useState({});
  const [membersInCanvas, setMembersInCanvas] = useState({});
  const [connections, setConnections] = useState([]);
  const sideNavState = useSelector(state => state.sidebar);
  const gear = useSelector(state => state.gear);
  const onlineStatus = useSelector(state => state.onlineStatus);
  const userInformation = useSelector(state => state.userInformation);
  const members = sideNavState.selectedProject?.members;
  const [selectedGear, setSelectedGear] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [instance, setInstance] = useState(
    gear?.airGearAssignedList?.instances,
  );
  const history = useHistory();
  const links = [
    {
      title: 'Camera Control',
      href: `/project/launchpad/${project_id}`,
    },
  ];
  useEffect(() => {
    setInstance(gear?.airGearAssignedList?.instances);
  }, [gear?.airGearAssignedList?.instances]);

  useEffect(() => {
    if (project_id) {
      dispatch(apiGetOnlineMembers(project_id, auth.token));
    }
  }, [project_id]);
  useEffect(() => {
    if (params.gearId) {
      setSelectedGear(params.gearId);
    }
  }, [params]);

  useEffect(() => {
    if (state?.shoot?.connected_camera) {
      const data = parseCameraConnectionObject(state?.shoot?.connected_camera);
      const { membersInCanvas, gearsInCanvas, connections, air_ids } = data;
      setMembersInCanvas(membersInCanvas);
      setGearsInCanvas(gearsInCanvas);
      setConnections(connections);
      setScale(state.shoot?.scale);
      dispatch(apiGetCameraStatusRequest(air_ids, auth.token));
    }
  }, [state.shoot]);

  const ref = useRef();
  // console.log(scale, 'scale');
  const stageRef = React.useRef();

  const setStageDims = () => {
    if (stageRef) {
      if (image) {
        const stageCenter = {
          x: ref.current?.offsetWidth / 2,
          y: ref.current?.offsetHeight / 2,
        };
        const backgroundImageCenter = {
          x: (image.width * scale) / 2,
          y: (image.height * scale) / 2,
        };

        const centerPoint = {
          x: stageCenter.x - backgroundImageCenter.x,
          y: stageCenter.y - backgroundImageCenter.y,
        };

        setPosition(centerPoint);
      }

      stageRef.current?.width(ref.current.offsetWidth);
      stageRef.current?.height(ref.current.offsetHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', setStageDims);
    dispatch(apiGearListRequest(auth.token));
    dispatch(apiGearAssignedListRequest(auth.token, state.shoot?.project));

    dispatch(apiGetOnlineMembers(project_id, auth.token));
    return () => {
      window.removeEventListener('resize', setStageDims);
    };
  }, [state]);

  useEffect(() => {
    setStageDims();
  }, [image, ref.current]);

  const handleWheel = event => {
    event.evt.preventDefault();
    const currentStageRef = stageRef.current;

    if (currentStageRef) {
      const stage = currentStageRef.getStage();

      if (event.evt.ctrlKey) {
        const oldScale = stage.scaleX();

        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const unboundedNewScale = oldScale - event.evt.deltaY * 0.01;
        let newScale = unboundedNewScale;
        if (unboundedNewScale < 0.1) {
          newScale = 0.1;
        } else if (unboundedNewScale > 10.0) {
          newScale = 10.0;
        }

        const newPosition = {
          x:
            -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
            newScale,
          y:
            -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
            newScale,
        };

        setScale(newScale);
        setPosition(newPosition);
      } else {
        const dragDistanceScale = 0.75;
        const newPosition = {
          x: position.x - dragDistanceScale * event.evt.deltaX,
          y: position.y - dragDistanceScale * event.evt.deltaY,
        };

        setPosition(newPosition);
      }
    }
  };
  const handleZoomIn = () => {
    setScale(prevValue => Math.min(10.0, Math.ceil(prevValue * 1.1 * 10) / 10));
    setStageDims();
  };

  const handleZoomOut = () => {
    setScale(prevValue => Math.max(0.1, Math.floor(prevValue * 0.9 * 10) / 10));
    setStageDims();
  };

  const handleCentered = () => {
    setStageDims();
  };
  const handleFocusOut = () => {
    setSelectedGear(null);
    history.push(window.location.pathname);
  };

  const handleFocusIn = (id, ip) => {
    setSelectedGear(id);
    history.push(window.location.pathname + '?gearId=' + id);
    window.open(`airapp://ip=${ip}&encoder=h264`);
    // just add these to remove gray rectangle
    setTimeout(() => {
      history.push(window.location.pathname);
      setSelectedGear(null);
    }, 500);
  };

  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  const getCenter = (p1, p2) => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };
  var lastCenter = null;
  var lastDist = 0;

  const handleMultiTouch = e => {
    e.evt.preventDefault();

    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];
    const stage = e.target.getStage();

    if (touch1 && touch2) {
      setIsZooming(true);

      var p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      var p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      if (!lastCenter) {
        lastCenter = getCenter(p1, p2);
        return;
      }
      var newCenter = getCenter(p1, p2);

      var dist = getDistance(p1, p2);

      if (!lastDist) {
        lastDist = dist;
      }

      // local coordinates of center point
      var pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      };

      var scale = stage.scaleX() * (dist / lastDist);
      // setScale(scale);
      stage.scaleX(scale);
      stage.scaleY(scale);

      // calculate new position of the stage
      var dx = newCenter.x - lastCenter.x;
      var dy = newCenter.y - lastCenter.y;

      var newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };

      stage.position(newPos);
      stage.batchDraw();

      lastDist = dist;
      lastCenter = newCenter;
    }
  };

  const multiTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
    setIsZooming(false);
  };

  const handleDragStart = e => {
    const stage = e.target.getStage();

    if (isZooming) {
      stage.stopDrag();
    }

    console.log(stage.isDragging());
  };

  return (
    <CameraLayout links={links}>
      {gear.isLoading || userInformation.isLoading ? (
        <Loader />
      ) : (
        <MainContentContainer
          ref={ref}
          onChange={() => console.log('Changed!')}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: stageRef.current?.width(),
              height: stageRef.current?.height(),
            }}
          >
            <Stage
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              draggable
              ref={stageRef}
              x={position.x}
              y={position.y}
              onWheel={handleWheel}
              scaleX={scale}
              scaleY={scale}
              onTouchMove={handleMultiTouch}
              onTouchEnd={multiTouchEnd}
              onDragStart={handleDragStart}
            >
              <Layer>
                <Image
                  x={0}
                  y={0}
                  image={image}
                  width={image?.width}
                  height={image?.height}
                />
              </Layer>
              <Layer>
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
                    const cameraStatus = onlineStatus?.cameraStatusList
                      ? onlineStatus?.cameraStatusList[data?.air_id]?.status
                      : [];
                    let connectedMembers = [];
                    let memberData = [];
                    connections.forEach(connection => {
                      if (connection.gear.toString() === data.id.toString()) {
                        connectedMembers = connection.member;
                      }
                    });
                    if (connectedMembers.length) {
                      if (members) {
                        connectedMembers.forEach(cMember => {
                          members.forEach(member => {
                            if (member.user.toString() === cMember.toString()) {
                              member['isOnline'] = false;
                              const getStatus =
                                userInformation?.onlineMembers.find(
                                  item => item[cMember],
                                );
                              if (getStatus)
                                member['isOnline'] =
                                  getStatus[Object.keys(getStatus)[0]];
                              memberData.push(member);
                              return;
                            }
                          });
                        });
                        memberData.sort((a, b) =>
                          a.isOnline > b.isOnline ? 1 : -1,
                        );
                      }
                    }
                    return (
                      // <Portal
                      //   selector=".focused"
                      //   key={key}
                      //   enabled={
                      //     true
                      //     // gearsInCanvas[key].data.id.toString() === selectedGear
                      //   }
                      // >
                      <CameraCanvasItem
                        {...gearsInCanvas[key]}
                        memberData={memberData}
                        selectedGear={selectedGear}
                        draggable={false}
                        onDblClick={handleFocusIn}
                        cameraStatus={cameraStatus}
                        scale={state?.shoot?.scale}
                      />
                      // </Portal>
                    );
                  })}
                </>
              </Layer>
              {selectedGear ? (
                <Layer
                  width={stageRef.current?.width()}
                  height={stageRef.current?.height()}
                >
                  <Rect
                    x={-position.x / scale}
                    y={-position.y / scale}
                    width={stageRef.current?.width() / scale}
                    height={stageRef.current?.height() / scale}
                    fill="#000000"
                    opacity={0.4}
                    onClick={handleFocusOut}
                  />
                </Layer>
              ) : null}
              <Layer name="focused" />
            </Stage>
          </div>
          <BottomUsersNavContainer2>
            <BottomInstanceNav
              instances={instance}
              onlineMembers={userInformation?.onlineMembers}
              // onDrop={onInstanceDrop}
              // onContextMenu={handleContextMenu}
              // popup={handlePopup}
              onDblClick={handleFocusIn}
              // {...gearsInCanvas[key]}
            />
            <BottomUsersNav
              shoot={state?.shoot}
              permission_obj={state?.shoot?.permission_obj}
              onlineMembers={userInformation?.onlineMembers}
            />
          </BottomUsersNavContainer2>

          <ZoomToolContainer>
            <ZoomTool
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              centered={handleCentered}
            />
          </ZoomToolContainer>
        </MainContentContainer>
      )}
    </CameraLayout>
  );
};

export default Main;
