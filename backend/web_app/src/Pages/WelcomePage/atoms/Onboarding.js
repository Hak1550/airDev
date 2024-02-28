import { FormErrorText, ModalFooter } from 'Components/CommonStyles';
import { SubHeader } from 'Pages/CommsPage/Main/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrganization,
  resetOnboarding,
  verifyAirId,
} from 'Redux/actions/onboarding';
import CompanyLogo from '../../../Assets/images/companyLogo.svg';
import TickFeaturedIcon from 'Assets/images/tickFeaturedIcon.svg';
import {
  Container,
  Footer,
  FooterButton,
  Form,
  Heading,
  MainContainer,
  TextLink,
} from '../styles';
import Modal from 'Components/Modal';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { apiPatchUserInformation } from 'Redux/actions/user_information';

const Onboarding = ({ handleStep, handleModal }) => {
  const [isDisabled, setDisabled] = useState(true);
  const [errMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [airID, setAirId] = useState('');
  const [orgName, setOrgName] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const onboarding = useSelector(state => state.onboarding);
  const auth = useSelector(state => state.auth);

  const handleCreateOrganisation = () => {
    dispatch(createOrganization({ air_id: airID, name: orgName }, auth.token));
  };

  const modalData = {
    title: 'Camera Added Successfully!',
    message: (
      <>
        <SubHeader>
          But there is one more thing, what should we call your new
          Organization?
        </SubHeader>
        <div className="text-start mt-4">
          <label className="form-label">Organization Name</label>
          <input
            type="text"
            className="form-control"
            id="organization"
            placeholder="Enter Organization Name"
            onChange={e => setOrgName(e.target.value)}
          />
        </div>
      </>
    ),
  };

  const modalFooter = (
    <ModalFooter variant="primary">
      <Button onClick={() => setShowModal(false)} variant="light">
        Cancel
      </Button>
      <Button
        onClick={handleCreateOrganisation}
        variant="primary"
        disabled={orgName.length <= 0}
      >
        Confirm
      </Button>
    </ModalFooter>
  );

  const checkCameraValidity = e => {
    const val = e.target.value
      .replace(/^([A-Za-z0-9]{4})$/g, '$1-')
      .replace(/^([A-Za-z0-9]{4}-[A-Za-z0-9]{4})$/g, '$1-');
    setAirId(val);
    if (val.length === 14) {
      setAirId(val);
      dispatch(verifyAirId(val, auth.token));
    } else {
      setDisabled(true);
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (onboarding?.data?.exist) {
      setDisabled(false);
      setErrorMessage('');
      dispatch(resetOnboarding());
    } else if (onboarding?.data?.exist === false)
      setErrorMessage('AIR ID not available. Please try with another one');
    else if (onboarding?.error) setErrorMessage(onboarding?.error);
    else setErrorMessage('');
  }, [onboarding.data]);

  useEffect(() => {
    if (onboarding.orgSuccess) {
      history.push('/settings/assets');
      dispatch(resetOnboarding());
      dispatch(
        apiPatchUserInformation(
          { first_login: false },
          auth.user_information?.id,
          auth.token,
          null,
          false,
        ),
      );
    }
  }, [onboarding.orgData]);

  return (
    <MainContainer>
      <Container>
        <img src={CompanyLogo} alt="Company Logo" />
        <Heading>Welcome to AIR Cloud</Heading>
        <SubHeader>
          To get started with your new account, please enter your AIR Camera ID
          below and click confirm.
        </SubHeader>
        <Form onSubmit={e => e.preventDefault()}>
          <div className="d-grid gap-3">
            <input
              type="text"
              className="form-control"
              id="camera_id"
              placeholder="0000-0000-0000"
              onChange={checkCameraValidity}
              maxLength={14}
              value={airID}
            />
            {errMessage && airID?.length > 0 && (
              <FormErrorText className="form-text">{errMessage}</FormErrorText>
            )}
            <button
              type="button"
              className="btn btn-primary"
              disabled={isDisabled}
              onClick={() => setShowModal(true)}
            >
              Confirm
            </button>
          </div>
        </Form>
        <SubHeader className="form-text text-center">
          Don’t have a Camera?{' '}
          <TextLink to="" onClick={handleStep}>
            Skip this step
          </TextLink>
        </SubHeader>
      </Container>
      <Footer>
        <SubHeader>
          Note: Your AIR Camera ID can be found on the front cover of the
          manual, as well as the outside edge of your box.{' '}
        </SubHeader>
        <FooterButton type="button" className="btn" onClick={handleModal}>
          Launch Tutorial
        </FooterButton>
      </Footer>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        icon={TickFeaturedIcon}
        title={modalData?.title}
        body={modalData?.message}
        footer={modalFooter}
      />
    </MainContainer>
  );
};

export default Onboarding;
