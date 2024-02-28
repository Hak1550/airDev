import { Link, useHistory } from 'react-router-dom';
import TickFeaturedIcon from 'Assets/images/tickFeaturedIcon.svg';
import ArrowLeft from 'Components/Icons/ArrowLeft';
import { SubHeader } from 'Pages/CommsPage/Main/styles';
import {
  Container,
  FooterButton,
  Heading,
  MainContainer,
  TextLink,
} from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { apiPatchUserInformation } from 'Redux/actions/user_information';
import { useEffect } from 'react';

const ContinueAsUser = ({ setStep, setProducer, isProducer }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);

  useEffect(() => {
    if (userInformation.success) history.push('/settings/account-details');
  }, [userInformation.success]);

  return (
    <MainContainer>
      <TextLink
        onClick={() => {
          setStep(prev => prev - 1);
          setProducer(false);
        }}
        className="text-decoration-none text-left fw-bold d-flex gap-2"
        style={{ width: '343px', marginBottom: '12px' }}
        to=""
      >
        <ArrowLeft /> <span>Go Back</span>
      </TextLink>
      <Container style={{ height: '300px', width: '343px' }} className="p-3">
        <img src={TickFeaturedIcon} alt="tick" />
        <Heading className="mt-3">
          {isProducer ? 'Request Access' : 'Join the Crew!'}
        </Heading>
        <SubHeader>
          {isProducer
            ? 'To join a project as a producer, contact us!'
            : 'As a member of the crew, you will be added to the database for upcoming projects.'}
        </SubHeader>
        <div className="d-grid gap-1 w-100">
          <FooterButton
            type="button"
            className="btn mt-4"
            style={{ backgroundColor: '#7F56D9' }}
          >
            {isProducer ? (
              <a
                className="text-decoration-none"
                style={{ color: '#FFF' }}
                target="_top"
                href="mailto:AIRcloudAdmin@advancedimagerobotics.com?subject=Requested Producer access to AIRcloud"
              >
                Email
              </a>
            ) : (
              <Link
                to=""
                className="text-decoration-none"
                style={{ color: '#FFF' }}
                onClick={() =>
                  dispatch(
                    apiPatchUserInformation(
                      {
                        global_search: true,
                        first_login: false,
                      },
                      auth?.user_information?.id,
                      auth.token,
                      'You have been added to the database for upcoming projects',
                    ),
                  )
                }
              >
                Yes, add me to the list!
              </Link>
            )}
          </FooterButton>
          <FooterButton
            type="button"
            className="btn mt-1"
            onClick={() => {
              setStep(0);
              setProducer(false);
            }}
          >
            No Thanks
          </FooterButton>
        </div>
      </Container>
    </MainContainer>
  );
};

export default ContinueAsUser;
