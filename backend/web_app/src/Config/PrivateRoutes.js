import SettingsContainer from 'Containers/SettingsContainer';
import AccountPage from 'Pages/AccountPage';
import AssetsPage from 'Pages/Assets';
import BillingPage from 'Pages/BillingPage';
import ChangePasswordPage from 'Pages/ChangePasswordPage';
import TeamPage from 'Pages/TeamPage';
import ArchiveProjectsContainer from '../Containers/ArchiveProjectsContainer';

export const privateRoutes = {
  ARCHIVED_PROJECTS: {
    path: '/archive-projects',
    component: ArchiveProjectsContainer,
    exact: true,
  },
  MY_MEDIA: {
    path: '/media',
    component: null,
    exact: false,
  },
  HELP_ARTICLES: {
    path: '/media',
    component: null,
    exact: false,
  },
  ACCOUNTS: {
    path: '/settings',
    component: SettingsContainer,
    exact: false,
  },
  MY_DETAILS: {
    path: '/settings/account-details',
    component: AccountPage,
    exact: true,
  },
  CHANGE_PASSWORD: {
    path: '/settings/password',
    component: ChangePasswordPage,
    exact: true,
  },
  TEAM: {
    path: '/settings/team',
    component: TeamPage,
    exact: true,
  },
  ASSETS: {
    path: '/settings/assets',
    component: AssetsPage,
    exact: true,
  },
  INTEGRATIONS: {
    path: '/settings/integrations',
    component: null,
    exact: true,
  },
  BILLING: {
    path: '/settings/billing',
    component: BillingPage,
    exact: true,
  },
};
