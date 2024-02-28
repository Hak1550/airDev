import * as types from '../constants/tutorial';

const INITIAL_STATE = {
  run: false,
  stepIndex: 0,
  tourActive: false,
  isTour: false,
  steps: [
    {
      content: 'This sidebar is your primary navigation menu.',
      target: '.side-menu',
      title: 'Primary Navigation Menu',
      disableBeacon: true,
    },
    {
      content: 'This is where media from your Projects will be stored.',
      target: '.media',
      title: 'Media',
      disableBeacon: true,
    },
    {
      content:
        'When projects are completed, they can be archived for later reference.',
      target: '.archive',
      title: 'Archived Projects',
      disableBeacon: true,
    },
    {
      content:
        'This is where you visit the AIR Cloud knowledge base for Frequently Asked Questions and support articles.',
      target: '.help-desk',
      title: 'Help Desk',
      disableBeacon: true,
    },
    {
      content:
        'This is where you can change your personal details. If are an Admin or Producer, it is also where you manage your AIR gear, vCPU configurations and project collaborators.',
      target: '.account-settings',
      title: 'Account Settings',
      disableBeacon: true,
    },
    {
      content:
        'Your active projects will appear here. Let’s take a look at a sample project.',
      target: '.sample-project',
      title: 'Sample Project',
      disableBeacon: true,
    },
    {
      content:
        'This is the home for your project. It showcases important information about the project like; dates, locations, personnel, documents and contact info.',
      target: '.overview',
      title: 'Project Overview',
      disableBeacon: true,
      placement: 'right',
    },
    {
      content:
        'This is where producers/directors upload the location site plan, position cameras, provision vCPUs, and assign crew to their various roles.',
      target: '.shoot-setup',
      title: 'Shoot Setup',
      disableBeacon: true,
    },
    {
      content:
        'This is where everyone can see the site plan. Remote operators can launch their AIR camera control app from this screen. TDs and Replay Ops also use this screen to connect to their cloud based vCPUs. Camera routing and permissions are all handled automatically by the AIRcloud.',
      target: '.launchpad',
      title: 'Launchpad',
      disableBeacon: true,
    },
    {
      content:
        'This is home for the direct links to your real-time voice communication channels.',
      target: '.comms',
      title: 'Comms',
      disableBeacon: true,
    },
    {
      content: 'This is where the master program output is available for view.',
      target: '.program-feed',
      title: 'Program Feed',
      disableBeacon: true,
    },
    {
      content:
        'This is where you can see multiple cameras displayed on a single screen.',
      target: '.multiview',
      title: 'Multiview',
      disableBeacon: true,
    },
  ],
  showWelcomeModal: true,
};

export default function tutorialReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_TUTORIAL_STATE:
      return {
        ...action.data,
      };
    case types.SHOW_WELCOME_MODAL:
      return {
        ...state,
        showWelcomeModal: action.data,
      };
    default:
      return state;
  }
}
