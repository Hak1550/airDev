import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Group } from 'react-konva';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import useImage from 'use-image';
// import { Prompt, useHistory } from 'react-router-dom';
import { RouterPrompt } from '../../../Components/Prompt/Prompt';
import LoadingOverlay from 'react-loading-overlay';
import Loader from 'Components/Loader';
import Add from '../../../Assets/images/add2.png';
import Less from '../../../Assets/images/less.png';
import Done from '../../../Assets/images/done.png';
// import ReactInputPosition, {
//   MOUSE_ACTIVATION,
//   TOUCH_ACTIVATION,
// } from 'react-input-position';

import {
  MainContentContainer,
  BottomUsersNavContainer,
  ZoomToolContainer,
  PopupMain,
  LoaderDiv,
  SetImageSize,
  SetImageIcon,
  SetImageSizeText,
  SetImageSizeText2,
  SetImageIcon2,
  SetImageSizeDiv,
  IconDiv,
} from './styles';
import ShootLayout from '../../../Layouts/ShootLayout';
import {
  apiGetOnlineMembers,
  apiGetMyAssets,
  apiListUserInformation,
} from '../../../Redux/actions/user_information';
import BottomUsersNav from '../../../Components/BottomUsersNav';
import BottomInstanceNav from '../../../Components/BottomInstanceNav';
import ZoomTool from '../../../Components/ZoomTool';
import {
  apiAddMemberRequest,
  apiProjectPatchRequest,
  apiRemoveMemberRequest,
} from '../../../Redux/actions/project';
import { addMemberToSelectedProject } from '../../../Redux/actions/sidebar';
import {
  apiRemoveUserPermissions,
  apiShootGetRequest,
  apiShootPatchRequest,
  apiUpdateUserPermission,
  toggleBGImageSize,
  toggleSidePan,
} from '../../../Redux/actions/shoot';
import validateEmail from '../../../Utils/validateEmail';
import { apiInviteRequest, resetInvite } from '../../../Redux/actions/invite';
import defaultAvatar from '../../../Assets/images/avatar.png';
import Edit from '../../../Assets/images/edit.png';
import Delete from '../../../Assets/images/delete.png';
import SearchAddGear from '../../../Components/SearchAddGear';
import {
  resetGear,
  apiGearAssignedListRequest,
  apiGearGlobalListRequest,
  apiGearAssignedRequest,
  apiGearPatchRequest,
  apiCameraPatchFailed,
  apiCameraPatchRequest,
  apiInstancePatchRequest,
  apiGetCameraDetailRequest,
} from '../../../Redux/actions/gear';
import CanvasItem from '../../../Components/Konva/CanvasItem';
import RightNavContent from '../../../Components/RightNavContent';
import AddCrewContent from '../../../Components/AddCrewContent';
import AddNewGearContent from '../../../Components/AddNewGearContent';
import TransformerCameraItem from '../../../Components/Konva/TransformerCameraItem';
import CanvasItemDetailsPopup from '../../../Components/CanvasItemDetailsPopup';
import GearContentDetails from '../../../Components/GearContentDetails';
import EditGearMember from 'Components/EditGearMember';
import EditCamera from '../../../Components/EditGear/EditCamera';
import EditInstance from '../../../Components/EditGear/EditInstance';
import { Canvas } from 'konva/lib/Canvas';
import * as types from 'Config/permissionConstant';
import CameraPackages from 'Pages/AssetsPage/components/CameraPackages';
import {
  apiGetAllAssetsRequest,
  apiGetAvailablePkgRequest,
  apiGetStoragePlanRequest,
} from 'Redux/actions/assets';
import { apiGetAllPaymentMethodRequest } from 'Redux/actions/payment';
import { apiGetCameraStatusRequest } from 'Redux/actions/onlineStatus';

function generateCameraConnectionObject(members, cameras, connections) {
  const data = [];
  let member_ids = Object.keys(members);
  let camera_ids = Object.keys(cameras);

  connections.forEach(connection => {
    const cameraData = cameras[connection.gear];
    console.log('cameraData', cameraData, cameras);
    camera_ids = camera_ids.filter(
      m => parseInt(m) !== parseInt(connection.gear),
    );
    const item = {
      camera_x: cameraData.x,
      camera_y: cameraData.y,
      camera_image_x: cameraData.camera_image_x,
      camera_image_y: cameraData.camera_image_y,
      camera_rotation: cameraData.rotation,
      camera_placeholder: cameraData.camera_placeholder,
      camera_id: parseInt(connection.gear),
      operators: connection.member.map(cm => ({
        camera_operator_id: parseInt(cm),
        camera_operator_x: 0,
        camera_operator_y: 0,
        camera_operator_rotation: 0,
      })),
    };
    if (cameraData?.lan_ip) {
      item['lan_ip'] = cameraData?.lan_ip;
    } else {
      item['lan_ip'] = false;
    }
    data.push(item);
  });

  member_ids.forEach(id => {
    data.push({
      camera_operator_id: parseInt(id),
      camera_operator_x: members[id].x,
      camera_operator_y: members[id].y,
      camera_operator_rotation: 0,
    });
  });
  camera_ids.forEach(id => {
    const item = {
      camera_id: parseInt(id),
      camera_x: cameras[id].x,
      camera_y: cameras[id].y,
      camera_image_x: cameras[id].camera_image_x,
      camera_image_y: cameras[id].camera_image_y,
      camera_rotation: cameras[id].rotation,
      camera_placeholder: cameras[id].camera_placeholder,
    };
    if (cameras[id]?.lan_ip) {
      item['lan_ip'] = cameras[id]?.lan_ip;
    } else {
      item['lan_ip'] = false;
    }
    data.push(item);
  });
  return data;
}

function parseCameraConnectionObject(camera_connections) {
  const membersInCanvas = {};
  const gearsInCanvas = {};
  const connections = [];
  const air_ids = [];
  camera_connections?.forEach(c => {
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
    if (c.camera_operator && !Array.isArray(c.camera_operator)) {
      membersInCanvas[c.camera_operator.id] = {
        x: c.camera_operator.camera_operator_x,
        y: c.camera_operator.camera_operator_y,
        data: c.camera_operator,
      };
    }
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
const Main = ({
  project_id,
  onImageSelected,
  onImageDelete,
  myPermission,
  myRole,
  editShoot,
  setEditShoot,
  allGears,
  selectProjectDetails,
}) => {
  const state = useSelector(state => state.shoot);
  const [toggle_sidePan, settoggle_sidePan] = useState(false);
  const [onboard_air_id, set_onboard_air_id] = useState('');
  const [imageSize, setImageSize] = useState(null);
  const [formObj, setFormObj] = useState({
    owner_name: '',
  });
  useEffect(() => {
    // if (formObj?.air_id?.length >= 14) {
    if (onboard_air_id.length >= 14) {
      dispatch(apiGetCameraDetailRequest(onboard_air_id, auth.token));
      set_onboard_air_id('');
    }
  }, [onboard_air_id.length]);

  useEffect(() => {
    // console.log('state.toggle_sidepan', gear?.airGearGlobalList);
    setTimeout(() => {
      // stageRef.current?.width();
      setStageDims();
      settoggle_sidePan(!toggle_sidePan);
    }, 100);
  }, [state?.toggle_sidePan]);

  useEffect(() => {
    setImageSize(state?.toggle_image_bg_size);
  }, [state?.toggle_image_bg_size]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleSidePan());
    }, 5000);
  }, []);

  const userInformation = useSelector(state => state.userInformation);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [apiSearch, setApiSearch] = useState('');
  const [isCanvasDirty, setIsCanvasDirty] = useState(false);
  const [dragMember, setDragMember] = useState(null);
  const backgroundImageRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [onBoardCameraFormObj, setOnBoardCameraFormObj] = useState({});
  const [selectedPackage, setSelectedPackage] = useState(null);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const invite = useSelector(state => state.invite);
  const sideNavState = useSelector(state => state.sidebar);
  const gear = useSelector(state => state.gear);
  const onlineStatus = useSelector(state => state.onlineStatus);
  const assets = useSelector(state => state.assets);
  const payment = useSelector(state => state.payment);
  const availableCameraPkgs = assets?.availablePkgs?.filter(
    f => f.package_type === 2,
  );
  const members = sideNavState.selectedProject?.members;

  useEffect(() => {
    if (gear.redirect_url) window.location.replace(gear.redirect_url);
  }, [gear.redirect_url]);
  useEffect(() => {
    setInstance(gear?.airGearAssignedList?.instances);
    setCamera(gear?.airGearAssignedList?.camera);
  }, [gear]);

  useEffect(() => {
    if (project_id) {
      dispatch(apiGetOnlineMembers(project_id, auth.token));
    }
  }, [project_id]);

  useEffect(() => {
    dispatch(apiGearAssignedListRequest(auth.token, state.shoot?.project));
    dispatch(apiGearGlobalListRequest(auth.token));
  }, [state?.shoot?.project]);

  useEffect(() => {
    dispatch(apiGetAllPaymentMethodRequest(auth.token));
    dispatch(apiGetAvailablePkgRequest(auth.token));
    dispatch(apiGetStoragePlanRequest(auth.token));
    dispatch(
      apiGetAllAssetsRequest(
        auth.token,
        sideNavState.selectedProject?.organisation?.id,
      ),
    );
  }, [
    !assets.availablePkgs,
    !assets.currentStoragePlan,
    !payment.paymentMethods,
    !assets.allGears,
  ]);

  useEffect(() => {
    if (state?.shoot?.connected_camera) {
      const data = parseCameraConnectionObject(state?.shoot?.connected_camera);
      const { membersInCanvas, gearsInCanvas, connections, air_ids } = data;
      setMembersInCanvas(membersInCanvas);
      setGearsInCanvas(gearsInCanvas);
      setConnections(connections);
      setAirIds(air_ids);
      // dispatch(apiGetCameraStatusRequest(air_ids, auth.token));
    }
  }, [state?.shoot]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (isCanvasDirty) {
      window.addEventListener('beforeunload', alertUser);
      window.addEventListener('unload', alertUser);

      return () => {
        window.removeEventListener('beforeunload', alertUser);
        window.removeEventListener('unload', alertUser);
      };
    }
  }, [isCanvasDirty]);

  const [sideNavPage, setSideNavPage] = useState('Shoot Menu');
  const dragDataRef = useRef();
  const [dragType, setDragType] = useState(null);

  // canvas
  const [scale, setScale] = useState(state.shoot.scale);
  const [selectedId, setSelectedId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [image] = useImage(selectedImage);
  const [membersInCanvas, setMembersInCanvas] = useState({});
  const [gearsInCanvas, setGearsInCanvas] = useState({});
  const [gearsInCanvasDisplayNum, setGearsInCanvasDisplayNum] = useState([]);
  const [memberItemMoving, setMemberItemMoving] = useState(false);
  const [memberItemMovingData, setMemberItemMovingData] = useState({});
  const [isIntersecting, setIsIntersecting] = useState(null);
  const [dropCrewInCanvas, setDropCrewInCanvas] = useState(null);
  const [selectedGearDetails, setSelectedGearDetails] = useState(null);
  const [selectedInstanceDetails, setSelectedInstanceDetails] = useState(null);
  const [onBoardCameraForm, setOnBoardCameraForm] = useState(false);
  const [editGear, setEditGear] = useState(null);
  const [instance, setInstance] = useState();
  const [camera, setCamera] = useState();
  const [memberRole, setMemberRole] = useState(0);
  const [Role, setRole] = useState(0);
  const [dropGearInCanvas, setDropGearInCanvas] = useState(false);
  const [designationMembers, setDesignationMembers] = useState([]);
  const [crew_target_key] = useState('crew_target_key');
  const [crew_target_key2] = useState('crew_target_key2');
  const [crew_target_key3] = useState('crew_target_key2');
  const [cam_target_key] = useState('cam_target_key');
  const [airIds, setAirIds] = useState([]);

  const [popup, setPopup] = useState({
    order_one: false,
    order_two: false,
    order_three: false,
    personell: false,
  });

  const [permission_obj, set_permission_obj] = useState(
    state?.shoot.permission_obj,
  );
  useEffect(() => {
    set_permission_obj(state?.shoot.permission_obj);
    setInstance(gear?.airGearAssignedList?.instances);
  }, [gear, state]);

  useEffect(() => {
    const air_ids = [];
    if (Object.keys(gearsInCanvas).length !== 0) {
      for (const key in gearsInCanvas) {
        air_ids.push(gearsInCanvas[key]?.data?.air_id);
      }
      setAirIds(air_ids);
    }
  }, [gearsInCanvas]);

  useEffect(() => {
    dispatch(apiGetCameraStatusRequest(airIds, auth.token));
  }, [airIds]);

  const dragLayerRef = useRef();
  const imageLayerRef = useRef();
  var width = window.innerWidth;
  var height = window.innerHeight;

  const ref = useRef();
  const stageRef = React.useRef();
  const [connections, setConnections] = useState([]);
  const [popupData, setPopupData] = useState({
    x: 0,
    y: 0,
    show: false,
    data: {},
  });

  const setStageDims = () => {
    if (stageRef) {
      if (image && ref.current) {
        const stageCenter = {
          x: ref.current.offsetWidth / 2,
          y: ref.current.offsetHeight / 2,
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

      stageRef?.current?.width(ref.current.offsetWidth);
      stageRef?.current?.height(ref.current.offsetHeight);
    }
  };
  // console.log(scale, 'scale');

  useEffect(() => {
    window.addEventListener('resize', setStageDims);
    setSelectedImage(state.shoot?.background_image);
    dispatch(apiListUserInformation(search, auth.token));
    if (dropCrewInCanvas) {
      // console.log('dropCrewInCanvas', dragLayerRef);
      dragLayerRef.current.children.forEach((e, i) => {
        let target = e;
        var targetRect = target.getClientRect();
        dragLayerRef.current.children.forEach(function (group) {
          // do not check intersection with itself
          if (group === target) {
            return;
          }
          if (haveIntersection(group.getClientRect(), targetRect)) {
            if (
              group.name().includes('group-container') &&
              target.name().includes('member-group')
            ) {
              const memberId = target.name().split('-')[2];
              const gearId = group.name().split('-')[2];
              let isIntersecting2 = { gear: gearId, member: memberId };
              if (gearId && memberId) {
                let currentIntersection = connections.filter(
                  c => c.gear.toString() === isIntersecting2.gear.toString(),
                );
                const newConnections = connections.filter(
                  c => c.gear.toString() !== isIntersecting2.gear.toString(),
                );
                // console.log(connections, currentIntersection, newConnections);

                if (currentIntersection.length) {
                  let found = false;
                  currentIntersection[0]['member'].forEach(c => {
                    if (c.toString() === isIntersecting2['member']) {
                      found = true;
                    }
                  });
                  if (found) {
                    return;
                  }
                  setConnections([
                    ...newConnections,
                    {
                      gear: isIntersecting2['gear'],
                      member: [
                        ...(currentIntersection.length
                          ? currentIntersection[0]['member']
                          : []),
                        isIntersecting2['member'].toString(),
                      ],
                    },
                  ]);
                }
              }
            }
            setMembersInCanvas({});
          } else {
            setMembersInCanvas({});
          }
        });
        return;
      });
      setDropCrewInCanvas(false);
    } else {
      dragLayerRef.current &&
        dragLayerRef.current.on('dragmove', function (e) {
          var target = e.target;
          var targetRect = e.target.getClientRect();
          dragLayerRef.current.children.forEach(function (group) {
            // do not check intersection with itself
            if (group === target) {
              return;
            }

            if (haveIntersection(group.getClientRect(), targetRect)) {
              if (
                group.name().includes('group-container') &&
                target.name().includes('member-group')
              ) {
                const memberId = target.name().split('-')[2];
                const gearId = group.name().split('-')[2];
                setIsIntersecting({ gear: gearId, member: memberId });
              }
            }
          });
        });
    }
    return () => {
      window.removeEventListener('resize', setStageDims);
    };
  }, [memberItemMoving]);

  useEffect(() => {
    const memberList = { ...membersInCanvas };
    const memberKeys = Object.keys(memberList);
    if (memberKeys.length) {
      connections.forEach(connection => {
        connection.member.forEach(cm => {
          delete memberList[cm];
        });
      });
      setMembersInCanvas(memberList);
    }
  }, [connections]);

  useEffect(() => {
    setStageDims();
  }, [image, ref.current]);

  useEffect(() => {
    if (sideNavState.newMember) {
      dispatch(
        apiAddMemberRequest(sideNavState.newMember, project_id, auth.token),
      );
    }
  }, [sideNavState.newMember]);

  const alertUser = e => {
    e.preventDefault();
    e.returnValue = '';
  };

  const onPublish = () => {
    let breakCondition = true;
    let all_camera_placeholder_set = true;
    Object.values(gearsInCanvas).forEach((key, index) => {
      let placeholder = key.camera_placeholder;
      if (
        (key.camera_placeholder === '0' ||
          key.camera_placeholder === undefined) &&
        breakCondition
      ) {
        let toastId = null;
        toastId = toast.loading('Please wait...');

        toast.update(toastId, {
          render: 'Please set camera(s) display number',
          type: 'error',
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
        all_camera_placeholder_set = false;
        breakCondition = false;
        return;
      }
    });
    if (all_camera_placeholder_set) {
      let data = {
        is_published: true,
      };
      dispatch(apiProjectPatchRequest(data, project_id, auth.token));
    }
  };
  // const onPublish = () => console.log('Publish Shoot Setup');

  const onSaveDraft = (type, shootImageId = null) => {
    let no_placeholder = Object.keys(gearsInCanvas).length
      ? Object.entries(gearsInCanvas).some(
          (s, i) =>
            s[1].camera_placeholder === '0' ||
            s[1].camera_placeholder === 0 ||
            s[1].camera_placeholder === null ||
            s[1].camera_placeholder === undefined ||
            !s[1].camera_placeholder,
        )
      : false;

    if (no_placeholder) {
      toast.error("Please set camera's display number first");
    } else {
      const camera_connections = generateCameraConnectionObject(
        membersInCanvas,
        gearsInCanvas,
        connections,
      );

      dispatch(
        apiShootPatchRequest(
          {
            camera_connections: camera_connections,
            selected_shoot_image: shootImageId || selectedImageId,
            scale: scale,
          },
          state.shoot.id,
          auth.token,
        ),
      );
      setIsCanvasDirty(false);
    }
  };

  const closeSideBar = () => {
    setSideNavPage('Shoot Menu');
    setOnBoardCameraForm(false);
  };

  const onCrewAdd = () => {
    setSideNavPage('Add Crew');
    setOnBoardCameraForm(true);
  };

  const onInstanceDetails = e => {
    setSideNavPage('Instance Info');
    setOnBoardCameraForm(true);
    setPopup(prev => ({
      ...prev,
      order_one: false,
      order_two: false,
      order_three: false,
    }));
  };

  const onInstanceCrewEdit = e => {
    setSideNavPage('Edit Instance Crew');
    setOnBoardCameraForm(true);

    setPopup(prev => ({
      ...prev,
      order_one: false,
      order_two: false,
      order_three: false,
    }));
  };

  const onInstanceDelete = e => {
    let gearID = instance.filter(
      f => f.id.toString() === selectedInstanceDetails.id.toString(),
    )[0].id;
    const index = instance.findIndex(object => {
      return object.id === gearID;
    });
    if (index > -1) {
      instance[index].order = 0;

      const data = {
        action_type: 'assign-instance-to-nav',
        project_id,
        air_instance_id: gearID,
        order: 0,
      };
      dispatch(apiGearAssignedRequest(auth.token, state.shoot?.project, data));
    }

    setPopup(false);
  };

  const handlePopup = e => {
    setMemberRole(5);
    setPopup(prev => ({
      ...prev,
      personell: false,
      order_one: !popup.order_one,
      order_two: !popup.order_two,
      order_three: !popup.order_three,
    }));
    setSelectedInstanceDetails(e);
  };

  const onDesignationCrewEdit = e => {
    setSideNavPage('Edit Designation Crew');
    setOnBoardCameraForm(true);
    setPopup(prev => ({
      ...prev,
      personell: false,
    }));
  };

  const handlePersonellPopup = (users, role) => {
    setPopup(prev => ({
      ...prev,
      order_one: false,
      order_two: false,
      order_three: false,
      personell: !popup.personell,
    }));
    setRole(role);
    if (role) {
      setMemberRole(
        role === 'DIRECTOR'
          ? 48
          : role === 'PRODUCER'
          ? 55
          : role === 'TECHNICAL_DIRECTOR'
          ? 62
          : role === 'AUDIO_OP'
          ? 70
          : role === 'GRFX_OP'
          ? 75
          : role === 'CLIENT'
          ? 78
          : role === 'FIELD_CREW'
          ? 78
          : 0,
      );
    }
    setDesignationMembers(users);
  };

  const InsatancePopup = e => {
    return (
      <PopupMain
        popup={popup}
        role={memberRole}
        onMouseLeave={() =>
          setPopup(prev => ({
            ...prev,
            order_one: false,
            order_two: false,
            order_three: false,
            personell: false,
            e,
          }))
        }
      >
        {!e.order.personell ? (
          <div onClick={onInstanceDetails}>
            <img src={Edit} /> <span>View Instance Details</span>
          </div>
        ) : null}
        <div
          onClick={() =>
            e.order.personell ? onDesignationCrewEdit() : onInstanceCrewEdit()
          }
        >
          <img src={Edit} />
          <span>{e.order.personell ? `Edit Personnel` : 'Edit Crew'}</span>
        </div>
        <div
          onClick={() =>
            e.order.personell ? onDeleteAllPersonell() : onInstanceDelete()
          }
        >
          <img src={Delete} /> <span>Delete</span>
        </div>
      </PopupMain>
    );
  };

  const onGearAdd = () => {
    dispatch(resetGear());
    setSideNavPage('Add Gear');
    setOnBoardCameraForm(true);
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearch(apiSearch);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [apiSearch]);

  const onSearchChange = e => {
    setApiSearch(e ? e.target.value : '');
    setSearch(e ? e.target.value : '');
  };

  const onAddMember = async member => {
    setSideNavPage('Shoot Menu');
    setOnBoardCameraForm(false);
    dispatch(addMemberToSelectedProject(member));
    setSearch('');
  };

  const onRemoveMember = user_id => {
    // setSideNavPage("Shoot Menu");
    dispatch(apiRemoveMemberRequest(user_id, project_id, auth.token));
    setEditShoot(!editShoot);
    // dispatch(apiShootGetRequest(auth.token, project_id));
  };

  const onAddCrewEnd = () => {
    setSideNavPage('Shoot Menu');
    setSearch('');
    setApiSearch('');
    onSearchChange('');
    let searchStr = '';
    dispatch(apiListUserInformation(searchStr, auth.token));
    setOnBoardCameraForm(false);
  };

  const onMemberDrag = (member, event) => {
    setSelectedId(null);
    setDragType('CREW_MEMBER');
    setMemberItemMoving(true);
    dragDataRef.current = member;
    setDragMember(member);
    // console.log('onMemberDrag here', member);
  };

  const onGearDrag = (gear, event) => {
    setDragType('GEAR');
    dragDataRef.current = gear;
  };

  const onNavMemberDrop = (e, name) => {
    if (dragDataRef.current?.id) {
      const data = {
        project_id,
        user_id: dragDataRef.current.id,
        role_name: name,
        token: auth.token,
      };
      // setIsCanvasDirty(true);
      // onSaveDraft('no-render');
      dispatch(apiUpdateUserPermission(data));
    } else if (e.dragData?.id) {
      const data = {
        project_id,
        user_id: e.dragData.id,
        role_name: name,
        token: auth.token,
      };
      dispatch(apiUpdateUserPermission(data));
    }
  };

  const onNavMemberRemove = (e, i, role) => {
    const data = {
      project_id,
      user_id: e[0].id,
      role_name: role,
      token: auth.token,
    };
    dispatch(apiRemoveUserPermissions(data));
  };

  const onInstanceDrop = (e, order, instance) => {
    // console.log('ys 2', order);
    // console.log('ys 2', order, dragDataRef.current);
    if (dragDataRef.current?.internal_record_format) {
      // toast.error('Invalid gear type. Can assign instance types only.');
      return;
    }
    if (dragDataRef.current?.name && !instance) {
      toast.error('Must assign an instance first.');
      return;
    }
    if (dragDataRef.current?.name) {
      const data = {
        action_type: 'assign-instance-to-nav',
        project_id,
        air_instance_id: instance,
        instance_operator_id: dragDataRef.current.id,
        order,
      };
      dispatch(apiGearAssignedRequest(auth.token, state.shoot?.project, data));
    } else {
      const data = {
        action_type: 'assign-instance-to-nav',
        project_id,
        air_instance_id: dragDataRef.current.id,
        order,
      };
      dispatch(apiGearAssignedRequest(auth.token, state.shoot?.project, data));
    }
    console.log('here is current', dragDataRef.current);
  };

  const onInviteClicked = type => {
    if (validateEmail(search)) {
      dispatch(apiInviteRequest(search, type, project_id));
      setSearch('');
    } else {
      toast.error('Invalid email address!');
    }
  };

  const handleImageSelection = image => {
    setSelectedImage(image.background_image);
    setSelectedImageId(image.id);
    setIsCanvasDirty(true);
    onSaveDraft('', image.id);
  };

  useEffect(() => {
    if (invite.success) {
      dispatch(resetInvite());
      setSearch('');
    }
  }, [invite]);

  useEffect(() => {
    if (sideNavPage === 'Add Crew') {
      dispatch(apiListUserInformation(search, auth.token));
    }
  }, [search]);

  const onAddGearEnd = () => {
    setSideNavPage('Shoot Menu');
    setOnBoardCameraForm(false);
    setSearch('');
    setApiSearch('');
    onSearchChange('');
  };

  const handleCameraDetailsSave = (id, placeholder, lan_ip) => {
    let check = gearsInCanvasDisplayNum.some(s => s === placeholder);
    if (check) {
      toast.error('Please select Unique Display Number !');
    } else {
      const newGearsInCanvas = { ...gearsInCanvas };
      newGearsInCanvas[id].camera_placeholder = placeholder;
      newGearsInCanvas[id].lan_ip = lan_ip;
      setGearsInCanvas(newGearsInCanvas);
      setIsCanvasDirty(true);
      setSideNavPage('Shoot Menu');
      setOnBoardCameraForm(false);
    }
  };
  // setMousePos({ x: event.clientX, y: event.clientY });

  useEffect(() => {
    if (gearsInCanvas) {
      let tempArr = [];
      let allGears = Object.entries(gearsInCanvas);
      allGears.forEach(fe =>
        fe[1].camera_placeholder ? tempArr.push(fe[1].camera_placeholder) : 0,
      );
      setGearsInCanvasDisplayNum(tempArr);
    }
  }, [gearsInCanvas]);

  const handleImageDragEnd = e => {
    // console.log('abc');
  };

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
    const currentStageRef = stageRef.current;

    if (currentStageRef) {
      const stage = currentStageRef.getStage();
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: ref.current.offsetWidth / 2 / oldScale - stage.x() / oldScale,
        y: ref.current.offsetHeight / 2 / oldScale - stage.y() / oldScale,
      };

      const unboundedNewScale = oldScale;
      let newScale = unboundedNewScale;
      newScale = Math.min(10.0, Math.ceil(oldScale * 1.1 * 10) / 10);

      const newPosition = {
        x:
          -(mousePointTo.x - ref.current.offsetWidth / 2 / newScale) * newScale,
        y:
          -(mousePointTo.y - ref.current.offsetHeight / 2 / newScale) *
          newScale,
      };

      setScale(newScale);
      setPosition(newPosition);
    }
    // setStageDims();
    // scale < 10 &&
    //   setScale(prevValue =>
    //     Math.min(10.0, Math.ceil(prevValue * 1.1 * 10) / 10),
    //   );
    // setStageDims();
    // setIsCanvasDirty(true);
  };
  const handleZoomOut = () => {
    const currentStageRef = stageRef.current;

    if (currentStageRef) {
      const stage = currentStageRef.getStage();
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: ref.current.offsetWidth / 2 / oldScale - stage.x() / oldScale,
        y: ref.current.offsetHeight / 2 / oldScale - stage.y() / oldScale,
      };

      const unboundedNewScale = oldScale;
      let newScale = unboundedNewScale;
      newScale = Math.max(0.1, Math.floor(oldScale * 0.9 * 10) / 10);

      const newPosition = {
        x:
          -(mousePointTo.x - ref.current.offsetWidth / 2 / newScale) * newScale,
        y:
          -(mousePointTo.y - ref.current.offsetHeight / 2 / newScale) *
          newScale,
      };

      setScale(newScale);
      setPosition(newPosition);
    }
    // setStageDims();
    // setScale(prevValue => Math.max(0.1, Math.floor(prevValue * 0.9 * 10) / 10));
    // // setIsCanvasDirty(true);
    // setStageDims();
  };
  const handleCentered = () => {
    setStageDims();
    setScale(scale + 1 - 1);
    setStageDims();
  };

  const handleImageSize = () => {
    if (isCanvasDirty) {
      onSaveDraft();
    }

    setStageDims();
    dispatch(toggleBGImageSize());
    dispatch(toggleSidePan());
    setStageDims();
  };
  const handleCenteredDone = () => {
    dispatch(toggleBGImageSize());
    onSaveDraft();
    setStageDims();
  };

  const onDropInCanvas = event => {
    event.preventDefault();
    // register event position
    stageRef.current.setPointersPositions(event);
    let { x, y } = stageRef.current.getRelativePointerPosition();

    setMemberItemMoving(false);
    if (
      dragType === 'CREW_MEMBER' ||
      event?.dragData?.dragType === 'CREW_MEMBER'
    ) {
      setDropCrewInCanvas(true);
      // setDragMember(prev => ({
      //   ...prev,
      //   // targetRect: { x: x, y: y, width: 40, height: 40 },
      // }));
      if (Object.keys(gearsInCanvas).length === 0) {
        setMembersInCanvas({});
        return;
      }
      setMembersInCanvas(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        newState[
          dragDataRef.current.id
            ? dragDataRef.current.id
            : memberItemMovingData.id
        ] = {
          x: x,
          y: y,
          data: dragDataRef.current
            ? dragDataRef.current
            : memberItemMovingData,
        };
        return newState;
      });
      // setMembersInCanvas({});
    } else if (dragType === 'GEAR') {
      if (Object.hasOwn(dragDataRef.current, 'order')) {
        // toast.error('Invalid gear type. Can assign Cameras types only.');
        return;
      }
      setGearsInCanvas(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        newState[dragDataRef.current?.id] = {
          x: x,
          y: y,
          data: dragDataRef.current,
        };
        return newState;
      });
      setConnections(prev => {
        let found = false;
        prev.forEach(c => {
          if (c.gear.toString() === dragDataRef.current.id.toString()) {
            found = true;
            return;
          }
        });
        if (!found) {
          return [
            ...prev,
            {
              gear: parseInt(dragDataRef.current.id),
              member: [],
            },
          ];
        }
        return [...prev];
      });
      setMembersInCanvas({});
    }
    setIsCanvasDirty(true);
  };

  const onCanvasItemDragMove = (event, type, id) => {
    // register event position
    if (type === 'CREW_MEMBER') {
      setMembersInCanvas(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        newState[id].x = event.target.x();
        newState[id].y = event.target.y();
        return newState;
      });
    } else if (type === 'GEAR') {
      setGearsInCanvas(prev => {
        const newState = JSON.parse(JSON.stringify(prev));

        newState[id].x = event.target.x();
        newState[id].y = event.target.y();

        return newState;
      });
    }

    setIsCanvasDirty(true);
  };

  const onGearTransformEnd = (id, e) => {
    setGearsInCanvas(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      newState[id].rotation = e.currentTarget.rotation();
      newState[id].camera_image_x = e.currentTarget.x();
      newState[id].camera_image_y = e.currentTarget.y();
      return newState;
    });
    setIsCanvasDirty(true);
  };

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);

      setPopupData(prev => {
        return {
          ...prev,
          show: false,
        };
      });
    }
  };

  const handleContextMenu = (e, type, data) => {
    e.evt.preventDefault();
    setPopupData({
      x: e.evt.pageX,
      y: e.evt.pageY,
      show: true,
      data: data,
      type,
    });
  };

  const onPopupClose = () => {
    setPopupData(prev => {
      return {
        ...prev,
        show: false,
      };
    });
  };

  const onCanvasItemDelete = (type, id) => {
    // console.log('delete', type, id);
    if (type === 'CREW_MEMBER') {
      setMembersInCanvas(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        delete newState[id];
        return newState;
      });
    } else if (type === 'GEAR') {
      setGearsInCanvas(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        delete newState[id];
        return newState;
      });
    }
    let newArr = connections;
    // console.log('cameraData newArr 0', newArr);
    // f => console.log('cameraData newArr 1', f.gear, id),
    newArr = newArr.filter(f => parseInt(f.gear) !== id);
    // console.log('cameraData newArr 2', newArr);
    setConnections(newArr);

    // setConnections(
    //   connections.filter(c => {
    //     if (type === 'CREW_MEMBER') {
    //       return c.member !== id;
    //     } else if (type === 'GEAR') {
    //       return c.gear !== id;
    //     }
    //     return true;
    //   }),
    // );

    setPopupData(prev => {
      return {
        ...prev,
        show: false,
      };
    });

    setIsCanvasDirty(true);
  };

  const handleGearClick = id => {
    setSelectedId(id);
    // console.log('gearsInCanvas gear click', id);
  };

  // function haveIntersection(r1, r2) {
  //   return !(
  //     r2.x > r1.x + r1.width ||
  //     r2.x + r2.width < r1.x ||
  //     r2.y > r1.y + r1.height ||
  //     r2.y + r2.height < r1.y
  //   );
  // }

  function haveIntersection(r1, r2) {
    if (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    ) {
      return true; // the rectangles are overlapping
    } else {
      return false; // the rectangles are not overlapping
    }
  }

  const handleCameraDetails = gear => {
    setOnBoardCameraForm(true);
    setSelectedGearDetails({
      ...gear,
      placeholder: gearsInCanvas[gear.id]?.camera_placeholder,
    });
    setSideNavPage('Camera Info');

    setPopupData(prev => {
      return {
        ...prev,
        show: false,
      };
    });
  };

  const handleCameraEditMember = gear => {
    setSelectedGearDetails({
      ...gear,
      placeholder: gearsInCanvas[gear.id]?.camera_placeholder,
    });
    setSideNavPage(
      `Edit Crew  ${
        gearsInCanvas[gear.id]?.camera_placeholder
          ? `- Camera ${gearsInCanvas[gear.id]?.camera_placeholder}`
          : `- Camera 0`
      }`,
    );
    setPopupData(prev => {
      return {
        ...prev,
        show: false,
      };
    });
    setOnBoardCameraForm(true);
  };
  const deleteInstanceMember = operator => {
    const data = {
      action_type: 'remove-instance-operator',
      project_id,
      air_instance_id: selectedInstanceDetails.id,
      instance_operator_id: operator.id,
      order: selectedInstanceDetails.order,
    };
    dispatch(apiGearAssignedRequest(auth.token, state.shoot?.project, data));
    setSideNavPage('Shoot Menu');
    setOnBoardCameraForm(false);
  };

  const deleteCameraGear = data => {
    if (data.camera_id) {
      let tempData = {};
      let gears = gearsInCanvas;
      Object.keys(gears).forEach((e, i) => {
        if (e !== data.camera_id.toString()) {
          tempData[e.toString()] = gears[e];
        }
      });
      setGearsInCanvas(tempData);
    }
    dispatch(apiGearAssignedRequest(auth.token, state.shoot?.project, data));
  };

  const onGearEdit = data => {
    setEditGear(data);
    if ('instance_type' in data) {
      setSideNavPage('Edit Instance');
    } else {
      setSideNavPage('Edit Camera');
    }
  };
  const onGearEditApi = gear => {
    let gearId = gear.id;
    delete gear.id;
    if ('instance_size' in gear) {
      delete gear.user;
      delete gear.status;
      // console.log('inst edit', gear);
      dispatch(apiInstancePatchRequest(auth.token, gearId, gear));
      dispatch(apiGearAssignedListRequest(auth.token, state.shoot?.project));
    } else {
      // console.log('cam edit', gear);
      dispatch(apiCameraPatchRequest(auth.token, gearId, gear));
      dispatch(apiGearAssignedListRequest(auth.token, state.shoot?.project));
    }
  };

  const onCancelled = () => {
    // changeSidebar('Shoot Menu')
    setOnBoardCameraForm(false);
    setSideNavPage('Shoot Menu');
    setSearch('');
    setApiSearch('');
    onSearchChange('');
    let searchStr = '';
    dispatch(apiListUserInformation(searchStr, auth.token));
  };
  const onDeleteAllPersonell = () => {
    let allUsers = designationMembers;
    allUsers.forEach(fe => {
      onNavMemberRemove([fe], null, Role);
    });
    onSaveDraft('no-render');
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
      setScale(scale);
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
    setIsCanvasDirty(true);
  };

  const multiTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
    setIsZooming(false);
    setIsCanvasDirty(true);
  };

  const handleDragStart = e => {
    const stage = e.target.getStage();

    if (isZooming) {
      stage.stopDrag();
    }

    // console.log(stage.isDragging());
    setIsCanvasDirty(true);
  };
  const RightSideNavPage = ({
    sideNavPage,
    members,
    globalGearList,
    assignedGearList,
  }) => {
    if (sideNavPage === 'Shoot Menu') {
      return (
        <>
          {loading ? (
            <LoaderDiv style={{}}>
              <Loader />
              <p>Please wait</p>
            </LoaderDiv>
          ) : (
            !imageSize && (
              <RightNavContent
                state={state}
                onCrewAdd={onCrewAdd}
                onGearAdd={onGearAdd}
                onMemberDrag={onMemberDrag}
                onGearDrag={onGearDrag}
                handleImageSelection={handleImageSelection}
                handleMemberUnAssign={onRemoveMember}
                selectedImage={selectedImage}
                onImageSelected={onImageSelected}
                setMemberItemMoving={setMemberItemMoving}
                setMemberItemMovingData={setMemberItemMovingData}
                members={members}
                gearsInCanvas={gearsInCanvas}
                globalGearList={globalGearList}
                assignedGearList={assignedGearList}
                onImageDelete={onImageDelete}
                onGearDelete={deleteCameraGear}
                onGearEdit={onGearEdit}
                myPermission={myPermission}
                setOnBoardCameraForm={setOnBoardCameraForm}
                cam_target_key={cam_target_key}
                crew_target_key={crew_target_key}
                crew_target_key2={crew_target_key2}
                crew_target_key3={crew_target_key3}
                imageSize={imageSize}
              />
              // </LoadingOverlay>
            )
          )}
        </>
      );
    } else if (sideNavPage === 'Add Crew') {
      return (
        <AddCrewContent
          search={search}
          onAddMember={onAddMember}
          onInviteClicked={onInviteClicked}
          onAddCrewEnd={onCancelled}
          setOnBoardCameraForm={setOnBoardCameraForm}
        />
      );
    } else if (sideNavPage === 'Add Gear') {
      return (
        <LoadingOverlay
          active={gear.isLoading}
          styles={{
            overlay: base => ({
              ...base,
              background: 'transparent',
              color: '#333333',
            }),
          }}
          spinner
          text="Loading..."
        >
          <SearchAddGear
            search={search}
            globalGearList={allGears}
            // globalGearList={globalGearList}
            assignedGearList={assignedGearList}
            setOnBoardCameraForm={setOnBoardCameraForm}
            onBoardCameraForm={onBoardCameraForm}
            myPermission={myPermission}
            onCancel={onCancelled}
            onAddGear={data => {
              // console.log(data);
              setOnBoardCameraForm(false);
              setSearch('');
              setApiSearch('');
              onSearchChange('');
              data.map(m =>
                dispatch(
                  apiGearAssignedRequest(auth.token, state.shoot?.project, m),
                ),
              );
            }}
            changeSidebar={name => {
              setSideNavPage(name);
              setSearch('');
            }}
          />
        </LoadingOverlay>
      );
    } else if (sideNavPage === 'On Boarding Gear') {
      return (
        <AddNewGearContent
          auth={auth}
          onAddGearEnd={onAddGearEnd}
          setOnBoardCameraFormObj={setOnBoardCameraFormObj}
          onBoardCameraFormObj={onBoardCameraFormObj}
          setSideNavPage={setSideNavPage}
          set_onboard_air_id={set_onboard_air_id}
          formObj={formObj}
          setFormObj={setFormObj}
        />
      );
    } else if (sideNavPage.includes('Camera Packages')) {
      return (
        <CameraPackages
          onGearEditApi={onGearEditApi}
          closeSideBar={closeSideBar}
          setOnBoardCameraForm={setOnBoardCameraForm}
          onboardForm={onBoardCameraFormObj}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          availablePkgs={availableCameraPkgs}
          auth={auth}
          payment={payment}
          onAddGearEnd={onAddGearEnd}
        />
      );
    } else if (sideNavPage === 'Camera Info') {
      return (
        <GearContentDetails
          sideNavVal={sideNavPage}
          auth={auth}
          onAddGearEnd={onAddGearEnd}
          selectedGearDetails={selectedGearDetails}
          setOnBoardCameraForm={setOnBoardCameraForm}
          handleCameraDetailsSave={handleCameraDetailsSave}
          setSideNavPage={setSideNavPage}
        />
      );
    } else if (sideNavPage === 'Instance Info') {
      return (
        <GearContentDetails
          auth={auth}
          onAddGearEnd={onAddGearEnd}
          selectedGearDetails={selectedInstanceDetails}
          setOnBoardCameraForm={setOnBoardCameraForm}
          handleCameraDetailsSave={handleCameraDetailsSave}
          setSideNavPage={setSideNavPage}
        />
      );
    } else if (sideNavPage.includes('Edit Crew')) {
      const connection = connections.filter(
        c => c.gear.toString() === selectedGearDetails.id.toString(),
      );
      const memberList = members.filter(m => {
        const found = connection[0].member.filter(
          cm => cm.toString() === m.user.toString(),
        );
        return !!found.length;
      });
      return (
        <EditGearMember
          setOnBoardCameraForm={setOnBoardCameraForm}
          onDelete={(gear, newMemberList) => {
            setConnections(prev => {
              const newConnections = prev.map(c => {
                if (c.gear.toString() === gear.toString()) {
                  return {
                    ...c,
                    member: newMemberList.map(nm => nm.user),
                  };
                }
                return c;
              });
              return newConnections;
            });
            setIsCanvasDirty(true);
            setSearch('');
          }}
          gear={selectedGearDetails}
          onClose={() => {
            setSideNavPage('Shoot Menu');
            setOnBoardCameraForm(false);
            setSearch('');
          }}
          members={memberList}
          connection={connection[0]}
          search={search}
        />
      );
    } else if (sideNavPage.includes('Edit Instance Crew')) {
      return (
        <EditGearMember
          setOnBoardCameraForm={setOnBoardCameraForm}
          onDelete={deleteInstanceMember}
          gear={selectedInstanceDetails}
          onClose={() => {
            setSideNavPage('Shoot Menu');
            setOnBoardCameraForm(false);
            setSearch('');
          }}
          members={selectedInstanceDetails.user}
          connection={selectedInstanceDetails}
          search={search}
        />
      );
    } else if (sideNavPage.includes('Edit Designation Crew')) {
      return (
        <EditGearMember
          setOnBoardCameraForm={setOnBoardCameraForm}
          onDelete={(delMem, newMeb) => {
            setDesignationMembers(newMeb);
            onSaveDraft('no-render');
            delMem.forEach(fe => {
              onNavMemberRemove([fe], null, Role);
            });
          }}
          gear={selectedInstanceDetails}
          onClose={() => {
            setSideNavPage('Shoot Menu');
            setSearch('');
            setOnBoardCameraForm(false);
          }}
          members={designationMembers}
          connection={selectedInstanceDetails}
          search={search}
        />
      );
    } else if (sideNavPage.includes('Edit Instance')) {
      return (
        <EditInstance
          setSideNavPage={setSideNavPage}
          editInstance={editGear}
          onGearEditApi={onGearEditApi}
          closeSideBar={closeSideBar}
          setOnBoardCameraForm={setOnBoardCameraForm}
        />
      );
    } else if (sideNavPage.includes('Edit Camera')) {
      return (
        <EditCamera
          setSideNavPage={setSideNavPage}
          editCamera={editGear}
          onGearEditApi={onGearEditApi}
          closeSideBar={closeSideBar}
          setOnBoardCameraForm={setOnBoardCameraForm}
          project_id={project_id}
        />
      );
    }
  };
  return (
    <>
      {/* <Prompt
        when={isCanvasDirty}
        message="You have unsaved changes, are you sure you want to leave?"
      /> */}

      {myPermission?.includes(types.EDIT_SETUP_SCREEN) && (
        <div style={{ zIndex: 50 }}>
          <RouterPrompt
            when={isCanvasDirty}
            onOK={() => true}
            onCancel={() => false}
            save={onSaveDraft}
          />
        </div>
      )}
      {loading ? (
        <LoaderDiv style={{}}>
          <Loader />
          <p>
            Please wait... <br />
            It may take a few seconds for everything to load.
          </p>
        </LoaderDiv>
      ) : (
        <ShootLayout
          onPublish={onPublish}
          onSaveDraft={onSaveDraft}
          onSearchChange={onSearchChange}
          isCanvasDirty={isCanvasDirty}
          onNavToggle={setStageDims}
          rightNavTitle={sideNavPage}
          myPermission={myPermission}
          onBoardCameraForm={onBoardCameraForm}
          // search={apiSearch}
          search={search}
          selectProjectDetails={selectProjectDetails}
          imageSize={imageSize}
          rightNavContent={
            <RightSideNavPage
              sideNavPage={sideNavPage}
              globalGearList={gear?.airGearGlobalList}
              assignedGearList={gear?.airGearAssignedList}
              members={sideNavState.selectedProject?.members}
            />
          }
        >
          <CanvasItemDetailsPopup
            onClose={onPopupClose}
            onDelete={onCanvasItemDelete}
            onCameraDetails={handleCameraDetails}
            onCameraEditMembers={handleCameraEditMember}
            {...popupData}
          />

          <MainContentContainer
            ref={ref}
            onChange={() => console.log('Changed!')}
          >
            {/* <DropTarget
            targetKey={crew_target_key}
            onDragLeave={e => {
              // console.log('Drag Leave crew in canvas', position, e);
              onDropInCanvas(e);
              // e.preventDefault();
            }}
            onHit={e => {
              // console.log('Drag Crew Leave', e);
              onDropInCanvas(e);
            }}
          >
            <DropTarget
              targetKey={cam_target_key}
              onDragLeave={e => {
                // console.log('Drag Leave', position, e);
                onDropInCanvas(e);
                // e.preventDefault();
              }}
              onHit={e => {
                // alert('You put the orange in the box!');
                // console.log('onHit', e);
              }}
            > */}
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={onDropInCanvas}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: stageRef.current?.height(),
                width: stageRef.current?.width(),
              }}
              onKeyPress={e => {
                console.log(e.key);
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
                scaleX={scale}
                scaleY={scale}
                onWheel={handleWheel}
                onTouchEnd={multiTouchEnd}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                onDragStart={handleDragStart}
                onTouchMove={handleMultiTouch}
              >
                <Layer>
                  <Image
                    x={0}
                    y={0}
                    image={toggle_sidePan ? image : image}
                    width={toggle_sidePan ? image?.width : image?.width}
                    height={toggle_sidePan ? image?.height : image?.height}
                    ref={imageLayerRef}
                    // onDragStart={handleDragStart}
                    // onDragEnd={handleDragEnd}
                    onClick={() => {
                      setPopupData({ ...popupData, show: false });
                      setSelectedId(null);
                    }}
                  />
                </Layer>
                <Layer ref={dragLayerRef}>
                  {Object.keys(membersInCanvas).map((key, index) => {
                    return (
                      <CanvasItem
                        {...membersInCanvas[key]}
                        key={index}
                        onDragMoveEnd={() => {
                          setMemberItemMoving(false);
                          if (isIntersecting) {
                            let currentIntersection = connections.filter(
                              c =>
                                c.gear.toString() ===
                                isIntersecting.gear.toString(),
                            );
                            const newConnections = connections.filter(
                              c =>
                                c.gear.toString() !==
                                isIntersecting.gear.toString(),
                            );
                            console.log(
                              connections,
                              currentIntersection,
                              newConnections,
                            );

                            if (currentIntersection.length) {
                              let found = false;
                              currentIntersection[0]['member'].forEach(c => {
                                if (c.toString() === isIntersecting['member']) {
                                  found = true;
                                }
                              });
                              if (found) {
                                return;
                              }
                              setConnections([
                                ...newConnections,
                                {
                                  gear: isIntersecting['gear'],
                                  member: [
                                    ...(currentIntersection.length
                                      ? currentIntersection[0]['member']
                                      : []),
                                    isIntersecting['member'].toString(),
                                  ],
                                },
                              ]);
                              setIsIntersecting(null);
                            }
                          }
                        }}
                        onDragMoveStart={() => {
                          setMemberItemMoving(true);
                        }}
                        defaultAvatar={defaultAvatar}
                        onContextMenu={handleContextMenu}
                        myPermission={myPermission}
                        onDragMove={onCanvasItemDragMove}
                        groupName={'member-group'}
                      />
                    );
                  })}

                  <TransformerCameraItem
                    scale={scale}
                    dragLayerRef={dragLayerRef}
                    gearsInCanvas={gearsInCanvas}
                    handleGearClick={handleGearClick}
                    selectedId={selectedId}
                    onContextMenu={handleContextMenu}
                    myPermission={myPermission}
                    onDragMove={onCanvasItemDragMove}
                    onTransformEnd={onGearTransformEnd}
                    memberItemMoving={memberItemMoving}
                    memberList={sideNavState.selectedProject?.members}
                    connections={connections}
                    draggable={true}
                    cameraStatusList={onlineStatus?.cameraStatusList}
                    onlineMembers={userInformation?.onlineMembers}
                    crew_target_key={crew_target_key}
                    imageSize={imageSize}
                  />
                </Layer>
              </Stage>
            </div>
            {/* </DropTarget>
          </DropTarget> */}
            {!imageSize && (
              <ZoomToolContainer>
                <ZoomTool
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  centered={handleCentered}
                  handleImageSize={handleImageSize}
                />
              </ZoomToolContainer>
            )}

            {popup.order_one ||
            popup.order_two ||
            popup.order_three ||
            popup.personell ? (
              <InsatancePopup order={popup} />
            ) : null}
            {!imageSize && (
              <BottomUsersNavContainer>
                <BottomInstanceNav
                  instances={instance}
                  onDrop={onInstanceDrop}
                  onContextMenu={handleContextMenu}
                  popup={handlePopup}
                  myPermission={myPermission}
                  onlineMembers={userInformation?.onlineMembers}
                  crew_target_key={crew_target_key}
                  cam_target_key={cam_target_key}
                />

                <BottomUsersNav
                  onDrop={onNavMemberDrop}
                  permission_obj={permission_obj}
                  onContextMenu={handleContextMenu}
                  popup={handlePersonellPopup}
                  myPermission={myPermission}
                  onDeleteAllPersonell={onDeleteAllPersonell}
                  onlineMembers={userInformation?.onlineMembers}
                  checkDeselect={checkDeselect}
                  crew_target_key={crew_target_key}
                />
              </BottomUsersNavContainer>
            )}
            {imageSize && (
              <SetImageSizeDiv>
                <SetImageSize>
                  <SetImageSizeText>Set Background Scale</SetImageSizeText>
                  <IconDiv>
                    <SetImageIcon src={Add} onClick={handleZoomIn} />
                    <SetImageSizeText2>
                      {(scale * 100).toFixed(0)} %
                    </SetImageSizeText2>
                    <SetImageIcon src={Less} onClick={handleZoomOut} />
                  </IconDiv>
                  <SetImageIcon2 src={Done} onClick={handleCenteredDone} />
                </SetImageSize>
              </SetImageSizeDiv>
            )}
          </MainContentContainer>
        </ShootLayout>
      )}
    </>
  );
};

export default Main;
