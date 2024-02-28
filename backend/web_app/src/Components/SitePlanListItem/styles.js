import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PlanContainer = styled(FlexDiv)`
  justify-content: space-between;
  margin-bottom: 12px;
  cursor: pointer;
`;

export const NameDiv = styled(FlexDiv)``;

export const NameAvatarDiv = styled(FlexDiv)``;

export const ActionsDiv = styled(FlexDiv)``;

export const Avatar = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f9f5ff;
  margin-right: 5px;
`;

export const AvatarHighlighted = styled(Avatar)`
  border: 2px solid #7f56d9;
`;

export const PlanName = styled.h1`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  margin: 0;
`;

export const PlanNameHighlighted = styled(PlanName)`
  color: #7f56d9;
`;

export const ActionButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
`;
