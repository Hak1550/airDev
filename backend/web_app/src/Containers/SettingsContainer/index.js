import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInformation } from '../../Redux/actions/login';
import {
  apiGetUserInformation,
  apiPatchUserInformation,
  resetUserInformationState,
} from '../../Redux/actions/user_information';

import AccountPage from '../../Pages/AccountPage';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { AccountPageContainer } from './styles';
import { PageHeading } from '../../Components/CommonStyles';
import BillingPage from '../../Pages/BillingPage';
import SettingsNavbar from './SettingsNavbar';
import TeamPage from 'Pages/TeamPage';
import AssetsPage from '../../Pages/AssetsPage';
import ChangePasswordPage from 'Pages/ChangePasswordPage';
import { apiTeamListRequest } from 'Redux/actions/team';
import { getObjectByLowestValue } from 'Utils/permissions';
import IntegrationsPage from 'Pages/IntegrationsPage';

const SettingsContainer = () => {
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);
  const team = useSelector(state => state.team);
  const dispatch = useDispatch();
  const history = useHistory();
  const teamCount = team?.teamMembers?.count || 0;
  const role = getObjectByLowestValue(
    userInformation?.data?.organisation_data,
    'role',
  )?.role;

  useEffect(() => {
    if (auth.token) {
      dispatch(apiGetUserInformation(auth.user_information?.id, auth.token));
      dispatch(apiTeamListRequest(auth.token));
    }
  }, []);

  useEffect(() => {
    if (userInformation.success) {
      dispatch(setUserInformation(userInformation.data));
      dispatch(resetUserInformationState());
    }
  }, [userInformation]);

  const onSubmit = data => {
    dispatch(
      apiPatchUserInformation(data, auth.user_information?.id, auth.token),
    );
  };

  return (
    <DashboardLayout>
      <AccountPageContainer>
        <PageHeading>Account Details</PageHeading>
        <SettingsNavbar history={history} teamCount={teamCount} />
        <Switch>
          <Route path={'/'} exact>
            <AccountPage
              auth={auth}
              state={userInformation}
              onSubmit={onSubmit}
            />
          </Route>
          <Route path={'/settings/account-details'} exact>
            <AccountPage
              auth={auth}
              state={userInformation}
              onSubmit={onSubmit}
            />
          </Route>
          <Route path={'/settings/password'} exact>
            <ChangePasswordPage auth={auth} />
          </Route>
          {role === 1 && (
            <>
              <Route path={'/settings/team'} exact>
                <TeamPage
                  auth={auth}
                  state={userInformation}
                  // onSubmit={onSubmit}
                />
              </Route>
              <Route path={'/settings/integrations'} exact>
                <IntegrationsPage
                  auth={auth}
                  userInformation={userInformation}
                  // onSubmit={onSubmit}
                />
              </Route>
              <Route path={'/settings/assets'} exact>
                <AssetsPage
                  auth={auth}
                  state={userInformation}
                  // onSubmit={onSubmit}
                />
              </Route>
              <Route path={'/settings/billing'} exact>
                <BillingPage />
              </Route>
            </>
          )}
        </Switch>
      </AccountPageContainer>
    </DashboardLayout>
  );
};

export default SettingsContainer;
