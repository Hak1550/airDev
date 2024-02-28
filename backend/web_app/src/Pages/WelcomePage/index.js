import { useState } from 'react';
import ModalVideo from 'react-modal-video';

import DashboardLayout from '../../Layouts/DashboardLayout';
import CameraLayout from '../../Layouts/CameraControlLayout';
import Onboarding from './atoms/Onboarding';
import SkipStep from './atoms/SkipStep';
import ContinueAsUser from './atoms/ContinueAsUser';
import WelcomeModal from './atoms/WelcomeModal';
import 'react-modal-video/scss/modal-video.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showWelcomeModal, updateTutorialState } from 'Redux/actions/tutorial';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import InvitedOnboarding from './atoms/InvitedOnboarding';
import Loader from 'Components/Loader';
import {
  apiPatchUserInformation,
  resetUserInformationState,
} from 'Redux/actions/user_information';

const WelcomePage = () => {
  const links = [
    {
      title: 'Welcome',
      href: `/`,
    },
  ];
  const dispatch = useDispatch();
  const history = useHistory();
  const isShowWelcomeModal = useSelector(
    state => state.tutorial?.showWelcomeModal,
  );
  const projectState = useSelector(state => state.project);
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);
  const tutorialState = useSelector(state => state.tutorial);
  const showModal = userInformation?.data?.tutorial;

  const [showTutorial, setShowTutorial] = useState(false);

  const [step, setStep] = useState(0);
  const [isProducer, setProducer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (auth?.user_information?.first_login === false) {
      history.push('/settings/account-details');
    }
    dispatch(showWelcomeModal(showModal));
  }, [auth?.user_information?.first_login]);

  useEffect(() => {
    if (showModal && isShowWelcomeModal) setShowTutorial(true);
    else setShowTutorial(false);
  }, [showModal, isShowWelcomeModal]);

  useEffect(() => {
    if (userInformation.success === true) {
      dispatch(showWelcomeModal(true));
      dispatch(resetUserInformationState());
    }
  }, [userInformation.success]);

  useEffect(() => {
    if (projectState?.projectList?.length > 0) {
      dispatch(showWelcomeModal(false));
    } else if (!tutorialState.isTour) {
      dispatch(showWelcomeModal(true));
    }
  }, [projectState.projectList]);

  const handleModal = () => {
    dispatch(showWelcomeModal(!isShowWelcomeModal));
    dispatch(
      apiPatchUserInformation(
        { tutorial: !showModal },
        auth.user_information?.id,
        auth?.token,
        null,
        false,
      ),
    );
  };
  const handleShowVideo = () => {
    setShowVideo(prev => !prev);
  };
  const handleStep = () => {
    setStep(prev => prev + 1);
  };
  const handleBeginTutorial = () => {
    const tutorialPayload = {
      ...tutorialState,
      run: true,
      stepIndex: 0,
      showWelcomeModal: false,
    };
    dispatch(showWelcomeModal(false));
    dispatch(updateTutorialState(tutorialPayload));
  };
  const showView = () => {
    switch (step) {
      case 0:
        return userInformation?.data?.organisation_data &&
          userInformation?.data?.organisation_data?.length > 0 ? (
          <InvitedOnboarding
            handleBeginTutorial={handleModal}
            totalProject={projectState?.projectList?.length}
          />
        ) : (
          <Onboarding handleStep={handleStep} handleModal={handleModal} />
        );
      case 1:
        return (
          <SkipStep
            handleStep={handleStep}
            setProducer={setProducer}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <ContinueAsUser
            setStep={setStep}
            setProducer={setProducer}
            isProducer={isProducer}
          />
        );
      default:
        break;
    }
  };
  return (
    <DashboardLayout>
      {userInformation?.isLoading ? (
        <Loader />
      ) : (
        <CameraLayout links={links} projectName={'AIR Cloud'}>
          {projectState.projectList ? showView() : <Loader />}
          {projectState.projectList && showTutorial ? (
            <WelcomeModal
              show={showModal}
              handleModal={handleModal}
              handleShowVideo={handleShowVideo}
              handleBeginTutorial={handleBeginTutorial}
            />
          ) : null}
          <ModalVideo
            channel="youtube"
            isOpen={showVideo}
            videoId="PQ3Zbhofcyo"
            onClose={handleShowVideo}
          />
        </CameraLayout>
      )}
    </DashboardLayout>
  );
};

export default WelcomePage;
