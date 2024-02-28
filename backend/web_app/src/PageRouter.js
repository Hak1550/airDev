import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CameraControlContainer from './Containers/CameraControlContainer';
import CommsContainer from './Containers/CommsContainer';
import ForgetPasswordContainer from './Containers/ForgetPasswordContainer';
import LoginContainer from './Containers/LoginContainer';
import MultiviewContainer from './Containers/MultiviewContainer';
import PostSetupContainer from './Containers/PostSetupContainer';
import ProgramFeedContainer from './Containers/ProgramFeedContainer';
import ProjectOverviewContainer from './Containers/ProjectOverviewContainer';
import SignupContainer from './Containers/SignupContainer';
import RoutingContainer from './Containers/RoutingContainer';
import ShootSetupContainer from './Containers/ShootSetupContainer';
import VirtualWorkstationContainer from './Containers/VirtualWorkstationContainer';
import WelcomeContainer from './Containers/WelcomeContainer';
// import ForgetPasswordConfirmContainer from './Containers/ForgetPasswordConfirmContainer';
import CameraControlRouterContainer from './Containers/CameraControlRoutingContainer';
import SettingsContainer from './Containers/SettingsContainer';
import ArchiveProjectsContainer from 'Containers/ArchiveProjectsContainer';
import MediaContainer from 'Containers/MediaContainer';
import ForgetPasswordConfirmContainer from 'Containers/ForgetPasswordConfirmContainer';
import NotFound from 'Pages/NotFoundPage';

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginContainer} exact />
        <Route path="/signup" component={SignupContainer} exact />
        <Route
          path="/forget-password"
          component={ForgetPasswordContainer}
          exact
        />
        <Route
          path="/reset-password"
          component={ForgetPasswordConfirmContainer}
          exact
        />
        <Route path="/" component={WelcomeContainer} exact />
        <Route path="/settings" component={SettingsContainer} />

        <Route path="/media" component={MediaContainer} />
        {/* default page */}
        {/* <Route path="/" component={SettingsContainer} exact /> */}
        <Route
          path="/project/overview/:project_id"
          component={ProjectOverviewContainer}
          exact
        />
        {/* <Route
          path="/launchpad"
          component={CameraControlRouterContainer}
          exact
        /> */}
        <Route
          path="/project/launchpad/:project_id"
          component={CameraControlContainer}
          exact
        />
        <Route
          path="/project/comms/:project_id"
          component={CommsContainer}
          exact
        />
        <Route
          path="/project/multiview/:project_id"
          component={MultiviewContainer}
          exact
        />
        <Route
          path="/project/post-setup/:project_id"
          component={PostSetupContainer}
          exact
        />
        <Route
          path="/project/program-feed/:project_id"
          component={ProgramFeedContainer}
          exact
        />
        <Route
          path="/project/routing/:project_id"
          component={RoutingContainer}
          exact
        />
        <Route
          path="/project/shoot-setup/:project_id"
          component={ShootSetupContainer}
          exact
        />
        <Route
          path="/project/virtual-workstation/:project_id"
          component={VirtualWorkstationContainer}
          exact
        />
        <Route
          path="/archive-projects"
          component={ArchiveProjectsContainer}
          exact
        />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        draggable={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default PageRouter;
