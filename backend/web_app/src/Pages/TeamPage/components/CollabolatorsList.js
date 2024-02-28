import React, { useState, useEffect, useRef } from 'react';
import tick from '../../../Assets/images/tick-square.png';
import CheckboxBase from '../../../Assets/images/checkboxBase.png';
import TeamAvatar from '../../../Assets/images/avatar.png';
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
  MainSelectImg,
} from '../styles';
import Loader from 'Components/Loader';

const CollaboratorsList = ({ onChange, editCollaborator, team, loading }) => {
  return (
    <Collabolators>
      {loading ? (
        <Loader />
      ) : (
        team?.map((user, index) => {
          return (
            <EachCollabolators key={index}>
              <EachCollabolatorsP1>
                <MainSelectImg
                  src={user?.isSelected ? tick : CheckboxBase}
                  // onClick={() => (user.isSelected = !user.isSelected)}
                  onClick={() => onChange(user)}
                />
                <CollabolatorsAvatar
                  src={
                    user?.user_info.profile_image
                      ? user?.user_info.profile_image
                      : TeamAvatar
                  }
                />
                <EachCollabolatorsP>
                  {user?.user_info.first_name} {user?.user_info.last_name}
                </EachCollabolatorsP>
              </EachCollabolatorsP1>
              <EachCollabolatorsP2>
                <EachCollabolatorsP2Div>
                  <div>
                    <p>{user?.role}</p>
                  </div>
                </EachCollabolatorsP2Div>
              </EachCollabolatorsP2>
              <EachCollabolatorsP3>
                <EachCollabolatorsP3P>{user?.user.email}</EachCollabolatorsP3P>
              </EachCollabolatorsP3>
              <EachCollabolatorsP4>
                {user?.projects.map((m, i) => (
                  <EachCollabolatorProject>
                    <div key={i}>
                      <p>{m.name}</p>
                    </div>
                  </EachCollabolatorProject>
                ))}
              </EachCollabolatorsP4>
              <EachCollabolatorsP5
                onClick={() => {
                  editCollaborator(user, index);
                }}
              >
                <EachCollabolatorsP5P>Edit</EachCollabolatorsP5P>
              </EachCollabolatorsP5>
            </EachCollabolators>
          );
        })
      )}
    </Collabolators>
  );
};

export default CollaboratorsList;
