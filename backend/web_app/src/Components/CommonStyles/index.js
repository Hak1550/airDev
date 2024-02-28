import styled from 'styled-components';
import { GRAY_900 } from '../../Config/colors';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FormErrorText = styled.div`
  color: red;
`;

export const SideMenuList = styled.ul`
  margin-top: 4px;
  width: 100%;
  padding: 0;
  padding-bottom: 16px;
`;

export const SideMenuListItem = styled.li`
  background: ${props => (props.selected ? '#F9FAFB' : '#FFFFFF')};
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  margin-top: 4px;
  cursor: pointer;
  &:hover {
    background: #f9fafb;
  }
`;

export const PageHeading = styled.h1`
  margin-bottom: 0;
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  color: ${GRAY_900};
`;

// react select custom styles
export const DropDownIconContainer = styled.span`
  display: flex;
  margin-right: 12px;
`;

export const CountryFlag = styled.img`
  display: block;
  width: 20px;
  height: 20px;
`;

export const SelectedValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const OptionContainer = styled(SelectedValueContainer)`
  padding: 10px 14px;
  &:hover {
    background: #f9fafb;
  }
`;

export const OptionText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #101828;
  display: flex;
  margin-left: 8px;
`;

export const ValueWrapper = styled.div`
  .dummy-input-wrapper {
    .Select__single-value {
      display: none;
    }
  }
`;

export const CenterDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled(FlexDiv)`
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f9f5ff;
  ${props => (props.bgImage ? `background-image: url(${props.bgImage});` : '')}
  background-size: cover;
  color: #7f56d9;
  text-transform: uppercase;
  cursor: ${props => (props.draggable ? 'move' : 'default')};
`;

export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  margin-top: 32px;
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

export const BorderBottom = styled.div`
  border-bottom: 1px solid #e4e7ec;
  margin: 20px 0px;
  width: 100%;
`;
export const BorderRight = styled.div`
  border-right: 1px solid #e4e7ec;
  margin: 0px 20px;
`;
