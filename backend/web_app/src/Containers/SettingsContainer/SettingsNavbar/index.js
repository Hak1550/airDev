import { TeamHeaderMainLeftPara } from 'Pages/TeamPage/styles';
import { useSelector } from 'react-redux';
import { NavItem, NavItemDetails, TeamCount, TopNav } from '../styles';

const SettingsNavbar = ({ history, teamCount }) => {
  const userInformation = useSelector(state => state.userInformation);
  return (
    <TopNav>
      <NavItemDetails
        to="/settings/account-details"
        selected={
          history.location.pathname.includes('/settings/account-details') ||
          history.location.pathname === '/'
        }
      >
        My Details
      </NavItemDetails>
      <NavItem
        to="/settings/password"
        selected={history.location.pathname.includes('/settings/password')}
      >
        Password
      </NavItem>
      {userInformation?.data?.global_role === 4 ? (
        <>
          <NavItem to="#" style={{ cursor: 'not-allowed', color: 'darkgray' }}>
            Team <TeamCount>{teamCount}</TeamCount>
          </NavItem>
          <NavItem to="#" style={{ cursor: 'not-allowed', color: 'darkgray' }}>
            Integrations
          </NavItem>
          <NavItem to="#" style={{ cursor: 'not-allowed', color: 'darkgray' }}>
            Assets
          </NavItem>
          <NavItem to="#" style={{ cursor: 'not-allowed', color: 'darkgray' }}>
            Billing
          </NavItem>
        </>
      ) : (
        <>
          <NavItem
            to="/settings/team"
            selected={history.location.pathname.includes('/settings/team')}
          >
            Team{' '}
            {!history.location.pathname.includes('/settings/team') ? (
              <TeamCount>{teamCount}</TeamCount>
            ) : (
              ''
            )}
          </NavItem>
          <NavItem
            to="/settings/integrations"
            selected={history.location.pathname.includes(
              '/settings/integrations',
            )}
          >
            Integrations
          </NavItem>
          <NavItem
            to="/settings/assets"
            selected={history.location.pathname.includes('/settings/assets')}
          >
            Assets
          </NavItem>
          <NavItem
            to="/settings/billing"
            selected={history.location.pathname.includes('/settings/billing')}
          >
            Billing
          </NavItem>
        </>
      )}
    </TopNav>
  );
};

export default SettingsNavbar;
