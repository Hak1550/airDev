import DocumentCard from '../../../Components/DocumentCard';
import { Header, MainContainer, SubHeader } from './styles';
import discord from '../../../Assets/images/discord.svg';
import slack from '../../../Assets/images/slack.svg';
import unityIntercom from '../../../Assets/images/unityIntercom.svg';
import {
  CloseIcon,
  NavTitle,
  RightNavContainer,
  SideBarContent,
} from 'Layouts/ProjectLayout/styles';
import X from 'Components/Icons/X';
import { useState } from 'react';
import AddChannels from 'Components/AddChannels';
import { useEffect } from 'react';
import { getObjectByLowestValue } from 'Utils/permissions';

const Main = ({ state, auth, userInformation }) => {
  const connectedApps = [
    {
      type: 'discord',
      title: 'Discord',
      subTitle: '',
      description: 'Everything you need for work, all in one place.',
      image: discord,
      btnTitle: 'Open Discord',
      url: null,
    },
    {
      type: 'unity_intercom',
      title: 'Unity Intercom',
      subTitle: '',
      description: 'Plan, track, and release great software.',
      image: unityIntercom,
      btnTitle: 'Open Unity',
      url: null,
    },
    {
      type: 'slack',
      title: 'Slack',
      subTitle: '',
      description: 'Send notifications to channels and create projects.',
      image: slack,
      btnTitle: 'Open Slack',
      url: null,
    },
  ];
  const SideNavPageType = {
    discord: {
      title: 'Edit Discord',
      subTitle: 'Select a default Discord Server for this organization.',
    },
    unity_intercom: {
      title: 'Edit Unity',
      subTitle: 'Select a default unity server for this organization.',
    },
    slack: {
      title: 'Edit Slack',
      subTitle: 'Select a default slack channel for this organization.',
    },
  };
  const [showRightNav, setShowRightNav] = useState(false);
  const [sideNavPage, setSideNavPage] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const onRightNavClose = () => {
    setShowRightNav(false);
    setSelectedData(null);
  };

  const organisation_data = getObjectByLowestValue(
    userInformation?.data?.organisation_data,
    'role',
  );

  useEffect(() => {
    if (state.projectComms) {
      state.projectComms.forEach(item => {
        const channel = connectedApps.findIndex(
          app =>
            app.type === item.type &&
            item.type !== 'multi_view' &&
            item.type !== 'program_feed',
        );
        console.log('channel : ', channel);
        if (channel !== -1) {
          connectedApps[channel].url = item?.url;
          connectedApps[channel].id = item?.id;
        }
      });
      setChannelData(connectedApps);
    } else setChannelData(connectedApps);
  }, [state.projectComms]);

  return (
    <MainContainer>
      <Header>Integrations and connected apps</Header>
      <br />
      <SubHeader>
        Supercharge your workflow and connect the tool you use every day.
      </SubHeader>
      <div className="row" style={{ marginTop: '48px' }}>
        {channelData &&
          channelData.map((app, index) => (
            <div
              className="col-lg-6 col-xl-4"
              style={{ marginBottom: '12px' }}
              key={index}
            >
              <DocumentCard
                btnTitle={app.btnTitle}
                url={app.url}
                title={app.title}
                subTitle={app.subTitle}
                description={app.description}
                image={app.image}
                deleteAction={
                  <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => {
                      setSideNavPage(app.type);
                      setShowRightNav(true);
                      if (app.id) {
                        setSelectedData(
                          state.projectComms.find(item => item.id === app.id),
                        );
                      }
                    }}
                    rel="noopener noreferrer"
                  >
                    Edit
                  </button>
                }
              />
            </div>
          ))}
      </div>
      {showRightNav && (
        <RightNavContainer style={{ position: 'fixed', top: '0', right: '0' }}>
          <CloseIcon onClick={onRightNavClose}>
            <X />
          </CloseIcon>

          <NavTitle>
            {SideNavPageType[sideNavPage]?.title}
            <br />
            <span>{SideNavPageType[sideNavPage]?.subTitle}</span>
          </NavTitle>

          <SideBarContent>
            <AddChannels
              selectedData={selectedData}
              onRightNavClose={onRightNavClose}
              auth={auth}
              organisation_data={organisation_data}
              sideNavPage={sideNavPage}
            />
          </SideBarContent>
        </RightNavContainer>
      )}
    </MainContainer>
  );
};
export default Main;
