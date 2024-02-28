import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
`;

export const GearContainer = styled(FlexDiv)`
  justify-content: flex-start;
  margin-bottom: 12px;
  opacity: ${props => props.is_deactivated && 0.3};
  padding: 2px;
  border-radius: 5px;
`;

export const GearIcon = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f9f5ff;
  cursor: ${props => (props.disabled ? 'pointer' : 'move')};
  opacity: ${props => (props.disabled ? '0.3' : '1')};
`;

export const NameDescriptionDiv = styled(FlexDiv)`
  flex-direction: column;
  margin-left: 12px;
  align-items: flex-start;
  min-width: 100px;
  max-width: 130px;
  opacity: ${props => (props.disabled ? '0.3' : '1')};
`;

export const GearName = styled.h1`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  margin: 0;
`;

export const GearDescription = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  margin: 0;
`;

export const ActionButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
`;

export const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;

  width: 75px;
  height: 28px;

  background: #f2f4f7;
  border-radius: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  text-align: center;

  color: #344054;
  outline: none;
  border: none;
  margin-left: auto;
  margin-top: 6px;
`;

export const AddButton2 = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;

  width: 65px;
  height: 28px;

  background: #f2f4f7;
  border-radius: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  text-align: center;

  color: red;
  outline: none;
  border: none;
  margin-left: auto;
  margin-top: 6px;
`;
