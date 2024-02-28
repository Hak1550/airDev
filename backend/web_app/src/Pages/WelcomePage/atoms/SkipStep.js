import {
  Container,
  FooterButton,
  Heading,
  MainContainer,
  TextLink,
} from '../styles';
import SkipFeaturedIcon from '../../../Assets/images/skipFeaturedIcon.svg';
import ArrowLeft from 'Components/Icons/ArrowLeft';
import { SubHeader } from 'Pages/CommsPage/Main/styles';

const SkipStep = ({ handleStep, setStep, setProducer }) => (
  <MainContainer>
    <TextLink
      onClick={() => setStep(prev => prev - 1)}
      className="text-decoration-none text-left fw-bold d-flex gap-2"
      style={{ width: '343px', marginBottom: '12px' }}
      to=""
    >
      <ArrowLeft /> <span>Go Back</span>
    </TextLink>
    <Container style={{ height: '300px', width: '343px' }} className="p-3">
      <img src={SkipFeaturedIcon} alt="skip" />
      <Heading className="mt-3">We’re glad you’re here!</Heading>
      <SubHeader>
        In order for us to best route you, let us know which of the following
        best describes you.
      </SubHeader>
      {/* <Form> */}
      <div className="d-grid gap-1 w-100">
        <FooterButton
          type="button"
          className="btn mt-4"
          onClick={() => {
            handleStep();
            setProducer(prev => !prev);
          }}
        >
          I am a Producer
        </FooterButton>
        <FooterButton
          type="button"
          className="btn mt-1"
          onClick={() => {
            handleStep();
            setProducer(false);
          }}
        >
          I am a Crew Member
        </FooterButton>
      </div>
      {/* </Form> */}
    </Container>
  </MainContainer>
);

export default SkipStep;
