import React, { useState, useRef } from 'react';
import filename from '../../Utils/filename';
import Accordion from '../Accordion';
import GearListItem from '../GearListItem';
import Modal from '../Modal';
import { Button } from 'react-bootstrap';
import errorIcon from '../../Assets/icons/errorIcon.svg';

import Camera from '../Icons/Camera';
import Instance from '../Icons/Instance';
import { ModalFooter } from '../CommonStyles';
import { CrewMemberListItem } from '../MemberListItem';
import SitePlanListItem from '../SitePlanListItem';
import { RightNavContentContainer } from './styles';
import * as types from 'Config/permissionConstant';

const RightNavContent = ({
  state,
  members,
  assignedGearList,
  onCrewAdd,
  onGearAdd,
  onImageSelected,
  onMemberDrag,
  onGearDrag,
  handleImageSelection,
  selectedImage,
  handleMemberUnAssign,
  membersTitle = 'Crew',
  onImageDelete,
  onGearDelete,
  gearsInCanvas,
  onGearEdit,
  myPermission,
  setOnBoardCameraForm,

  cam_target_key,
  crew_target_key,
  setMemberItemMoving,
  setMemberItemMovingData,
}) => {
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalOperation, setModalOperation] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [data, setData] = useState(null);
  const [camData, setCamData] = useState(null);
  const [insData, setInsData] = useState(null);
  const [backData, setBackData] = useState(null);

  const backgroundImageRef = useRef();

  const onSitePlanEdit = id => {
    setEditId(id);
    backgroundImageRef.current?.click();
  };

  const onMessageCrewMember = id => console.log(id);
  const onMailCrewMember = id => console.log(id);
  const handleEdit = e => {
    onImageSelected(e, editId);
    setEditId(null);
  };

  const handleAdd = e => {
    setEditId(null);
    backgroundImageRef.current?.click();
  };

  const handleImageSelectionId = id => {
    const image = state.shoot?.background_image_list?.filter(
      image => image.id === id,
    )[0];
    handleImageSelection(image);
  };

  const handleMemberDelete = (id, name) => {
    setShowModal(true);
    setModalOperation('member-delete');
    setModalData({
      title: name,
      message: 'Are you sure you want to unassign this member?',
    });
    setData(id);
    setOnBoardCameraForm(false);
  };

  const handleCameraDelete = (id, name) => {
    setShowModal(true);
    setModalOperation('camera-delete');
    setModalData({
      title: 'Delete Camera',
      message:
        'Are you sure you want to delete this camera? This action cannot be undone.',
    });
    setData(id);
    setOnBoardCameraForm(false);
  };

  const handleInstanceDelete = (id, name) => {
    setShowModal(true);
    setModalOperation('instance-delete');
    setModalData({
      title: 'Delete Instance',
      message:
        'Are you sure you want to delete this instance? This action cannot be undone.',
    });
    setData(id);
    setOnBoardCameraForm(false);
  };

  const handleBackgroundDelete = (id, project, name) => {
    setShowModal(true);
    setModalOperation('background-delete');
    setModalData({
      title: `Delete ${name}`,
      message:
        'Are you sure you want to remove this site plan background image? This action cannot be undone.',
    });
    setData(id);
    setOnBoardCameraForm(false);
  };

  const executeModalOperation = () => {
    if (modalOperation === 'member-delete') {
      handleMemberUnAssign(data);
    } else if (modalOperation === 'camera-delete') {
      const detail = {
        action_type: 'delete-camera',
        camera_id: data,
      };
      onGearDelete(detail);
    } else if (modalOperation === 'instance-delete') {
      const detail = {
        action_type: 'delete-instance',
        instance_id: data,
      };
      onGearDelete(detail);
    } else if (modalOperation === 'background-delete') {
      onImageDelete(data, state.shoot.project);
    }
  };

  const modalFooter = (
    <ModalFooter>
      <Button onClick={() => setShowModal(false)} variant="light">
        No, Cancel
      </Button>
      <Button onClick={executeModalOperation} variant="danger">
        Yes, Delete
      </Button>
    </ModalFooter>
  );
  return (
    <RightNavContentContainer>
      <Accordion
        title={membersTitle}
        onAdd={onCrewAdd}
        myPermission={myPermission}
      >
        {members
          // ?.sort((a, b) =>
          //   a?.first_name?.toLowerCase() > b?.first_name?.toLowerCase()
          //     ? 1
          //     : -1,
          // )
          .map((m, index) => (
            <CrewMemberListItem
              key={index}
              id={m.user}
              name={
                m?.first_name ? `${m?.first_name} ${m?.last_name}` : m?.email
              }
              avatar={m?.profile_image}
              email={m?.user_details?.email.toLowerCase()}
              phone={m?.phone}
              user_details={m?.user_details}
              job_title="Camera Operator"
              onDragStart={onMemberDrag}
              onMessage={onMessageCrewMember}
              onMail={onMailCrewMember}
              handleMemberDelete={handleMemberDelete}
              myPermission={myPermission}
              crew_target_key={crew_target_key}
              setMemberItemMoving={setMemberItemMoving}
              setMemberItemMovingData={setMemberItemMovingData}
            />
          ))}
      </Accordion>
      {assignedGearList && (
        <Accordion title="Gear" onAdd={onGearAdd} myPermission={myPermission}>
          {assignedGearList?.cameras
            // ?.sort((a, b) =>
            //   a.nick_name.toLowerCase() > b.nick_name.toLowerCase() ? 1 : -1,
            // )
            ?.map((g, index) => {
              return (
                <GearListItem
                  key={index}
                  data={g}
                  // icon={<Camera />}
                  icon={<Camera />}
                  onDragStart={e =>
                    !!gearsInCanvas[g.id] ? () => {} : onGearDrag(e)
                  }
                  onGearEdit={() => onGearEdit(g)}
                  disabled={!!gearsInCanvas[g.id]}
                  myPermission={myPermission}
                  handleCameraDelete={handleCameraDelete}
                  cam_target_key={cam_target_key}
                />
              );
            })}
          {assignedGearList?.instances
            // ?.sort((a, b) =>
            //   a.nick_name.toLowerCase() > b.nick_name.toLowerCase() ? 1 : -1,
            // )
            ?.map((g, index) => (
              <GearListItem
                key={index}
                data={g}
                icon={<Instance />}
                onDragStart={onGearDrag}
                onGearEdit={() => onGearEdit(g)}
                disabled={g.order === 1 || g.order === 2 || g.order === 3}
                myPermission={myPermission}
                // disabled={!!g.order}
                handleInstanceDelete={handleInstanceDelete}
              />
            ))}
        </Accordion>
      )}

      {state?.shoot && (
        <Accordion
          title="Site Plan"
          onAdd={handleAdd}
          myPermission={myPermission}
        >
          {state?.shoot?.background_image_list?.map((shoot_image, i) => {
            return (
              <SitePlanListItem
                id={shoot_image.id}
                key={shoot_image.id}
                // name={`${filename(shoot_image.background_image)}`}
                name={shoot_image?.image_name}
                selected={selectedImage === shoot_image.background_image}
                handleImageSelectionId={handleImageSelectionId}
                onEdit={onSitePlanEdit}
                // onImageDelete={id => onImageDelete(id, state.shoot.project)}
                myPermission={myPermission}
                handleBackgroundDelete={id =>
                  handleBackgroundDelete(
                    id,
                    state.shoot.project,
                    shoot_image.image_name,
                    // `${filename(shoot_image.background_image)}`,
                  )
                }
              />
            );
          })}
          {myPermission?.includes(types.EDIT_SETUP_SCREEN) && (
            <input
              type="file"
              ref={backgroundImageRef}
              onChange={handleEdit}
              style={{ display: 'none' }}
            />
          )}
        </Accordion>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        icon={errorIcon}
        title={modalData?.title}
        body={modalData?.message}
        footer={modalFooter}
      />
    </RightNavContentContainer>
  );
};

export default RightNavContent;
