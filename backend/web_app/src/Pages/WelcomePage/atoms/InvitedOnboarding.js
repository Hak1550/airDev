import { Link } from 'react-router-dom';
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

const InvitedOnboarding = ({ handleBeginTutorial, totalProject }) => {
  return (
    <MainContainer>
      <Container style={{ height: '276px', width: '400px' }} className="p-4">
        <img src={TickFeaturedIcon} alt="tick" />
        <Heading className="mt-3">You’ve been added to the team!</Heading>
        <SubHeader>
          Thanks for accepting the invite. You’ve now been added to{' '}
          {totalProject} Projects.
        </SubHeader>
        <div className="d-grid gap-1 w-100">
          <FooterButton
            type="button"
            className="btn"
            style={{
              backgroundColor: '#7F56D9',
              color: '#FFF',
              marginTop: '32px',
            }}
            onClick={handleBeginTutorial}
          >
            Begin Tutorial
          </FooterButton>
        </div>
      </Container>
    </MainContainer>
  );
};

export default InvitedOnboarding;
