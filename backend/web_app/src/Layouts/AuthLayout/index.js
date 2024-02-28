import React from 'react';
import Mail from '../../Components/Icons/Mail';
import LogoMark from '../../Components/LogoMark';
import HomePageImg from '../../Assets/images/HomePageImg.svg';
import {
  IllustrationColumn,
  FormColumn,
  Header,
  ContentWrapper,
  Footer,
  GrayText,
  AuthFormContainer,
  Heading,
  Description,
} from './styles';
import moment from 'moment';

const AuthLayout = ({ children, title = '', description = '' }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <FormColumn className="col-12 col-md-6 min-vh-100">
          <Header>
            <LogoMark />
          </Header>

          <ContentWrapper>
            <AuthFormContainer>
              <Heading>{title}</Heading>
              <Description>{description}</Description>
              <div>{children}</div>
            </AuthFormContainer>
          </ContentWrapper>

          <Footer>
            <GrayText>© AIR Cloud {moment(new Date()).year()}</GrayText>
            <GrayText>
              <Mail /> <span>help@aircloud.com</span>
            </GrayText>
          </Footer>
        </FormColumn>

        <IllustrationColumn className="col-12 col-md-6 d-none d-sm-none d-md-block min-vh-100">
          <img
            src={HomePageImg}
            alt="homepage"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </IllustrationColumn>
      </div>
    </div>
  );
};

export default AuthLayout;
