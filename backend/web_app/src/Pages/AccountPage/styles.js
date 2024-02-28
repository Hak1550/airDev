import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GRAY_200, GRAY_500, GRAY_700, GRAY_900 } from '../../Config/colors';

export const AccountPageContainer = styled.div`
  padding: 32px;
`;

export const TopNav = styled.div`
  width: 100%;
  margin-top: 24px;
  border-bottom: 1px solid ${GRAY_200};
  display: flex;
  flex-direction: row;
`;

export const NavItem = styled(Link)`
  padding-bottom: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  margin-right: 24px;
  color: ${props => (props.selected ? '#6941C6' : GRAY_500)};
  ${props => (props.selected ? 'border-bottom: 2px solid #6941C6;' : '')};
`;

export const FormHeader = styled.div`
  border-bottom: 1px solid ${GRAY_200};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 20px;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 20px;
`;

export const FormHeaderTitleColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormHeaderButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FormTitle = styled.h2`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: ${GRAY_900};
  margin-bottom: 0;
`;

export const FormDescription = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${GRAY_500};
`;

export const SaveButton = styled.button`
  margin-left: 12px;
`;

export const FormContent = styled.div``;

export const FormRow = styled.div`
  padding-bottom: 20px;
  margin-top: 25px;
  border-bottom: 1px solid ${GRAY_200};
  --bs-gutter-x: 0;
`;

export const FormLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${GRAY_700};
  padding-right: 32px;
`;

export const FormLableDescription = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
`;

export const AvatarImg = styled.img`
  display: block;
  width: 100%;
  max-width: 64px;
  height: 64px;
  width: 64px;
  border-radius: 50%;
`;
