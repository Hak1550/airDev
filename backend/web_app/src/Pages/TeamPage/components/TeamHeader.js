import React, { useEffect, useState } from 'react';
import download from '../../../Assets/images/download.png';
import add from '../../../Assets/images/add.png';
import { toast } from 'react-toastify';
import {
  TeamAddBtn,
  TeamHeadImg,
  TeamDownLoadBtn,
  TeamHeadBtnImgP,
  TeamHeaderMain,
  TeamHeaderMainLeft,
  TeamHeaderMainLeftPara,
  TeamHeadBtnImgPa,
  TeamHeadImg2,
  TeamHeaderPart,
  TeamHeaderPartP,
} from '../styles';
import { CSVLink } from 'react-csv';
import Invite from './Invite';

const TeamHeader = ({ team, otherMemberList, count, selectAll, loading }) => {
  const [inviteView, setInviteView] = useState(false);
  const [teamMemberArr, setteamMemberArr] = useState([]);
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Role', key: 'role' },
    { label: 'Email', key: 'email' },
    { label: 'Projects', key: 'projects' },
  ];

  useEffect(() => {
    let teamMemObj = {};
    setTimeout(() => {
      // console.log('team', team);
    }, 3000);
    teamMemObj = team?.filter(f => f.isSelected);
    let newTeamMemObj = [];
    teamMemObj?.map((m, i) =>
      newTeamMemObj.push({
        projects: m?.projects.map(p => p.name),
        role: m?.role,
        name: m?.user.name,
        email: m?.user.email,
      }),
    );
    setteamMemberArr(newTeamMemObj);
  }, [selectAll, team]);

  const handleInvitation = () => {
    setInviteView(true);
  };

  const closeSideBar = () => {
    setInviteView(false);
  };

  const downloadToast = () => {
    let toastId = null;
    toastId = toast.loading('Please wait...');
    toast.update(toastId, {
      render: 'Please select collaborator first....!',
      type: 'error',
      isLoading: false,
      autoClose: 1000,
      closeOnClick: true,
    });
  };
  return (
    <TeamHeaderMain>
      <TeamHeaderPart>
        <div>
          <TeamHeaderPartP>My Collaborators</TeamHeaderPartP>
        </div>
        <TeamHeaderMainLeftPara>{count} users</TeamHeaderMainLeftPara>
      </TeamHeaderPart>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {teamMemberArr.length !== 0 ? (
          <CSVLink
            data={teamMemberArr}
            headers={headers}
            style={{ textDecoration: 'none' }}
          >
            <TeamDownLoadBtn>
              <TeamHeadImg src={download} />
              <TeamHeadBtnImgP>Download List</TeamHeadBtnImgP>
            </TeamDownLoadBtn>
          </CSVLink>
        ) : (
          <div>
            <TeamDownLoadBtn onClick={downloadToast}>
              <TeamHeadImg src={download} />
              <TeamHeadBtnImgP>Download List</TeamHeadBtnImgP>
            </TeamDownLoadBtn>
          </div>
        )}
        <TeamAddBtn onClick={handleInvitation}>
          <TeamHeadImg2 src={add} />
          <TeamHeadBtnImgPa>Invite Collaborator</TeamHeadBtnImgPa>
        </TeamAddBtn>
      </div>
      {inviteView ? (
        <Invite
          closeSideBar={closeSideBar}
          otherMemberList={otherMemberList}
          team={team}
          loading={loading}
        />
      ) : null}
    </TeamHeaderMain>
  );
};

export default TeamHeader;
