import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Camera from '../Icons/Camera';
import Instance from '../Icons/Instance';

import { OutlinedButton } from '../IconButton/styles';
import GearListItem from '../GearListItem';
import * as types from 'Config/permissionConstant';

import {
  AddContainer,
  DoneButton,
  InviteButton,
  MembersSearchList,
  NavFooter,
  NoCrewMemberFoundCard,
  NoUserFoundText,
} from './styles';
import { AddCrewContentContainer } from 'Components/AddCrewContent/styles';

function searchResult(search, cameras, instances) {
  const result = [];
  cameras
    ?.filter(
      camera =>
        camera.nick_name?.toLowerCase().includes(search.toLowerCase()) ||
        camera.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
        camera.air_id?.toLowerCase().includes(search.toLowerCase()),
    )
    .forEach(camera => {
      result.push({
        ...camera,
        type: 1,
      });
    });
  instances
    ?.filter(
      instance =>
        instance.nick_name?.toLowerCase().includes(search.toLowerCase()) ||
        instance.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
        instance.air_id?.toLowerCase().includes(search.toLowerCase()),
    )
    .forEach(instance => {
      result.push({
        ...instance,
        type: 2,
      });
    });

  return result;
}

const SearchAddGear = ({
  search,
  globalGearList,
  assignedGearList,
  onAddGear,
  changeSidebar,
  myPermission,
  setOnBoardCameraForm,
  onBoardCameraForm,
  onCancel,
}) => {
  const auth = useSelector(state => state.auth);
  const [result, setResult] = useState([]);
  const [gearList, setGearList] = useState([]);
  const [globalGearListState, setGlobalGearListState] = useState([]);
  const [assignedGearListState, setAssignedGearListState] = useState([]);
  useEffect(() => {
    const cameras = globalGearList?.camera?.filter(
      camera =>
        !assignedGearList?.camera?.filter(c => c.id === camera.id).length,
    );
    const instances = globalGearList?.instance?.filter(
      instance =>
        !assignedGearList?.instance?.filter(i => i.id === instance.id).length,
    );

    setResult(
      searchResult(search, cameras ? cameras : [], instances ? instances : []),
    );
  }, [search, globalGearList, assignedGearList]);

  // console.log('camera localRes', result);
  const onAdd = gear => {
    // console.log('geargear', gear);
    const data = {
      action_type: gear.type === 1 ? 'add-camera' : 'add-instance',
    };
    let localRes = [...result];
    let newGearList;
    if (gear.type === 1) {
      data['camera_id'] = gear.camera.id;
      newGearList = localRes.filter(
        f => f?.camera?.air_id !== gear.camera.air_id,
      );
      // console.log('newGearList', newGearList);
    } else {
      data['instance_id'] = gear.id;
      newGearList = localRes.filter(f => f.air_id !== gear.air_id);
      // console.log('newGearList', newGearList);
    }
    gearList.push(data);
    setResult(newGearList);

    // onAddGear(data);
  };
  useEffect(() => {
    let tempArr1 = [];
    let tempArr2 = [];
    let newOne = Object.entries(assignedGearList);
    newOne.forEach(fe => [tempArr1.push(fe[1])]);
    setAssignedGearListState(tempArr1.flat(1));
  }, []);
  return (
    <AddCrewContentContainer>
      <MembersSearchList>
        {result.length !== 0 ? (
          result
            .sort((a, b) =>
              a.nick_name.toLowerCase() > b.nick_name.toLowerCase() ? 1 : -1,
            )
            .map(gear => (
              <GearListItem
                data={gear}
                icon={gear.type == 1 ? <Camera /> : <Instance />}
                onDragStart={() => {}}
                add
                onAdd={() => onAdd(gear)}
                key={`gear-${gear.air_id ? gear.air_id : gear.camera.air_id}`}
                assignedGearList={assignedGearListState}
              />
            ))
        ) : (
          <NoCrewMemberFoundCard>
            <NoUserFoundText>No Gear Found.</NoUserFoundText>
            {myPermission?.includes(types.ONBOARD_CAMERA) && (
              <InviteButton
                onClick={() => {
                  changeSidebar('On Boarding Gear');
                  setOnBoardCameraForm(true);
                }}
                className="btn btn-sm"
              >
                <span style={{ marginLeft: '5px' }}>+ On-board New Gear</span>
              </InviteButton>
            )}
          </NoCrewMemberFoundCard>
        )}
      </MembersSearchList>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onCancel}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={() => {
            onAddGear(gearList);
            changeSidebar('Shoot Menu');
          }}
        >
          Done
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default SearchAddGear;
