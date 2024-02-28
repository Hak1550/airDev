import styled from 'styled-components';
import { OutlinedButton } from '../../Components/IconButton/styles';
import { GRAY_200, GRAY_900 } from '../../Config/colors';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProjectCover = styled.div`
  height: 240px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
`;

export const ProjectTitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const ProjectDetailsContainer = styled.div`
  padding: 0 32px 0 32px;
  margin-top: -30px;
`;

export const ProjectThumbnail = styled.div`
  background: url(${props => props.bgImage}) round;
  min-width: 160px;
  min-height: 160px;
  background-size: cover;
  border: 4px solid #ffffff;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
  border-radius: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 58px;
  background-color: ${GRAY_200};
  color: ${GRAY_900};
  cursor: pointer;
  object-fit: cover;

  &:hover .alpha-logo {
    display: none;
  }

  &:hover .edit-icon {
    display: block;
  }
`;

export const ProjectTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;

export const ProjectTitle = styled.h1`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  color: #101828;
  margin-bottom: 5px;
`;

export const ProjectLabel = styled.span`
  margin-left: 20px;
  padding: 4px 12px 4px 24px;

  background: ${props => (props.status ? '#ecfdf3' : '#F2F4F7')};
  border-radius: 16px;

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${props => (props.status ? '#027a48' : '#344054')};
  position: relative;

  &:before {
    position: absolute;
    content: '';
    width: 6px;
    height: 6px;
    left: 11px;
    top: 11px;
    border-radius: 50%;

    /* Success/500 */

    background: ${props => (props.status ? '#12b76a' : '#667085')};
  }
`;

export const CompanyName = styled.h2`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #667085;
`;

export const ProjectSummaryRow = styled.div`
  margin-top: 25px;
`;

export const NoteHeading = styled.h2`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

export const NoteText = styled.p`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #667085;
`;

export const ProjectProperty = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  /* Gray/500 */

  color: #667085;
  margin-bottom: 8px;
`;

export const ProjectPropertyValue = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #344054;
`;

export const MoreButton = styled(OutlinedButton)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export const ViewMapButton = styled.a`
  color: #6941c6;
  text-decoration: none;
`;

export const DropdownOption = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 15px;
  &:hover {
    background-color: #f9fafb;
    span {
      color: ${GRAY_900};
    }
  }
  span {
    padding: 10px 15px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #667085;
  }
`;

export const ProjectMembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 40px;
  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #667085;
    margin-bottom: 8px;
  }
`;

export const ProjectMembersProfile = styled.div`
  display: flex;
`;

export const Avatar = styled(FlexDiv)`
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #f9f5ff;
  border: 2px solid #ffffff;
  ${props => (props.bgImage ? `background-image: url(${props.bgImage});` : '')}
  background-size: cover;
  color: #7f56d9;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 6px;
  margin-left: -12px;
`;

export const ProjectDates = styled.div`
  background: ${props => (props.disabled ? '#f9fafb' : '#FFFFFF')};
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  width: 248px;
  height: 40px;
  padding: 10px 8px 10px 16px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  span {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    color: #344054;
    padding-left: 8px;
  }
  &:focus-visible,
  &:active,
  &:target,
  &:visited {
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #f2f4f7;
  }
`;

export const CalendarFooter = styled.div`
  width: 328px;
  display: flex;
  margin-top: 440px;
  position: absolute;
  z-index: 9999;
  border-top: 1px solid #e4e7ec;
  padding: 16px 24px;
  button {
    width: 49%;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    background: ${props =>
      props.variant === 'primary' ? '#7F56D9' : '#d92d20'};
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  button:first-child {
    margin-right: 12px;
    border: 1px solid #d0d5dd;
    background: #ffffff;
    color: #344054;
  }
`;
