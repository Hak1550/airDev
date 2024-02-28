import React, { useState, useEffect, useRef } from 'react';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import InsIcon from '../../../Assets/images/GearInsIcon.png';
import CameraIcon from '../../../Assets/images/GearCamIcon.png';
import moment from 'moment';
import {
  Collabolators,
  CollabolatorsAvatar,
  EachCollabolatorProject,
  EachCollabolators,
  EachCollabolatorsP,
  EachCollabolatorsP1,
  EachCollabolatorsP2,
  EachCollabolatorsP2Div,
  EachCollabolatorsP3,
  EachCollabolatorsP3P,
  EachCollabolatorsP4,
  EachCollabolatorsP5,
  EachCollabolatorsP5P,
  EachCollabolatorsP6P,
  MainSelectImg,
} from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { allCollabolators } from 'Redux/actions/team';
import GearList from './GearList';

const GearsList = props => {
  let {
    onChange,
    editGear,
    gears,
    name_filter,
    device_filter,
    project_filter,
    indexOfLastPost,
    indexOfFirstPost,
    filterAssets,
    state,
  } = props;
  let filterByDevice = device_filter ? parseInt(device_filter) : 0;

  const [gearsList, setGearList] = useState([]);
  useEffect(() => {
    if (gears) {
      const currentPosts = gears?.slice(indexOfFirstPost, indexOfLastPost);
      let inst = [];
      let cam = [];
      currentPosts.forEach(f => {
        f.instance_type ? inst.push(f) : cam.push(f);
      });
      cam.forEach(fe => (fe['instance_type'] = 'Air 1 Camera'));
      let newArr2 = inst.concat(cam);
      setGearList(newArr2);
    }
  }, [gears, indexOfFirstPost, indexOfLastPost]);

  useEffect(() => {
    if (gearsList.length > 0) {
      let newArr = gearsList;
      if (
        filterAssets.heading === 'name' &&
        filterAssets.arrowDirection === 'up'
      ) {
        newArr = newArr.sort((a, b) =>
          a.nick_name.toLowerCase() > b.nick_name.toLowerCase() ? 1 : -1,
        );
      } else if (
        filterAssets.heading === 'name' &&
        filterAssets.arrowDirection === 'down'
      ) {
        newArr = newArr.sort((a, b) =>
          a.nick_name.toLowerCase() < b.nick_name.toLowerCase() ? 1 : -1,
        );
      } else if (
        filterAssets.heading === 'type' &&
        filterAssets.arrowDirection === 'up'
      ) {
        newArr = newArr.sort((a, b) =>
          a.instance_type.toLowerCase() > b.instance_type.toLowerCase()
            ? 1
            : -1,
        );
      } else if (
        filterAssets.heading === 'type' &&
        filterAssets.arrowDirection === 'down'
      ) {
        newArr = newArr.sort((a, b) =>
          a.instance_type.toLowerCase() < b.instance_type.toLowerCase()
            ? 1
            : -1,
        );
      } else if (
        filterAssets.heading === 'price' &&
        filterAssets.arrowDirection === 'up'
      ) {
        newArr = newArr.sort((a, b) =>
          a?.package_info?.price > b?.package_info?.price ? 1 : -1,
        );
      } else if (
        filterAssets.heading === 'price' &&
        filterAssets.arrowDirection === 'down'
      ) {
        newArr = newArr.sort((a, b) =>
          a?.package_info?.price < b?.package_info?.price ? 1 : -1,
        );
      } else if (
        filterAssets.heading === 'exp_date' &&
        filterAssets.arrowDirection === 'up'
      ) {
        newArr = newArr.sort((a, b) => (a.end_date > b.end_date ? 1 : -1));
      } else if (
        filterAssets.heading === 'exp_date' &&
        filterAssets.arrowDirection === 'down'
      ) {
        newArr = newArr.sort((a, b) => (a.end_date < b.end_date ? 1 : -1));
      }
      setGearList(newArr);
    }
  }, [filterAssets]);
  return (
    <Collabolators>
      {gearsList
        ?.filter(
          f =>
            f?.nick_name.toLowerCase().includes(name_filter.toLowerCase()) ||
            f.camera?.nick_name
              .toLowerCase()
              .includes(name_filter.toLowerCase()),
        )
        .filter(f =>
          filterByDevice === 1
            ? 'camera' in f
            : filterByDevice === 2
            ? f?.instance_type === 'VIMIX_MAIN'
            : filterByDevice === 3
            ? f?.instance_type === 'VIMIX_REPLY'
            : filterByDevice === 4
            ? f?.instance_type === 'SRT_GATEWAY'
            : f,
        )
        .filter(f =>
          state.category_filter
            ? state.category_filter.toLowerCase() === 'available'
              ? f?.is_available
              : state.category_filter.toLowerCase() === 'engaged'
              ? !f?.is_available
              : f
            : f,
        )

        .map((user, index) => {
          return (
            <EachCollabolators key={index} is_deactivated={user.is_deactivated}>
              <EachCollabolatorsP1>
                <MainSelectImg
                  src={user?.isSelected ? tick : CheckboxBase}
                  // onClick={() => (user.isSelected = !user.isSelected)}
                  onClick={() => onChange(user, index)}
                />
                <CollabolatorsAvatar
                  src={
                    user?.instance_type === 'Air 1 Camera'
                      ? CameraIcon
                      : InsIcon
                  }
                  is_deactivated={user.is_deactivated}
                />
                <div>
                  <EachCollabolatorsP is_deactivated={user.is_deactivated}>
                    {user?.camera ? user?.camera?.nick_name : user?.nick_name}
                  </EachCollabolatorsP>
                  <EachCollabolatorsP6P is_deactivated={user.is_deactivated}>
                    {user?.camera?.air_id ? user?.camera?.air_id : user?.air_id}
                  </EachCollabolatorsP6P>
                </div>
              </EachCollabolatorsP1>
              <EachCollabolatorsP2>
                <EachCollabolatorsP2Div is_deactivated={user.is_deactivated}>
                  <div>
                    <p>{user?.instance_type}</p>
                  </div>
                </EachCollabolatorsP2Div>
              </EachCollabolatorsP2>
              <EachCollabolatorsP3>
                <EachCollabolatorsP3P is_deactivated={user.is_deactivated}>
                  {user?.package_info?.price &&
                    `$${user?.package_info?.price / 100}`}{' '}
                  {user?.package_info?.price_supporting_text}
                </EachCollabolatorsP3P>
              </EachCollabolatorsP3>
              <EachCollabolatorsP4 is_deactivated={user.is_deactivated}>
                {user?.end_date && moment(user.end_date).format('MMM Do, YYYY')}
              </EachCollabolatorsP4>
              <EachCollabolatorsP5
                onClick={
                  !user.is_deactivated ? () => editGear(user, index) : null
                }
              >
                <EachCollabolatorsP5P is_deactivated={user.is_deactivated}>
                  Edit
                </EachCollabolatorsP5P>
              </EachCollabolatorsP5>
            </EachCollabolators>
          );
        })}
    </Collabolators>
  );
};

export default GearsList;
