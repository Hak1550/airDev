import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MemberContainer = styled(FlexDiv)`
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const NameAvatarDiv = styled(FlexDiv)``;

export const NameJobTitleDiv = styled(FlexDiv)`
  flex-direction: column;
  margin-left: 12px;
  align-items: flex-start;
  max-width: 200px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const ActionsDiv = styled(FlexDiv)``;

export const CrewName = styled.h1`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
  margin: 0;
  max-width: 200px;
  text-transform: capitalize;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const CrewJobTitle = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  margin: 0;
  // text-transform: capitalize;
  max-width: 200px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const ActionButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
`;
export const ActionButton2 = styled.button`
  border: none;
  outline: none;
  background: transparent;
  display: flex;
  flex-direction: row;
  width: 140px;
`;

export const AddCrewMemberBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;

  background: #f2f4f7;
  border-radius: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  text-align: center;

  color: #344054;
  outline: none;
  min-width: 70px;
  border: none;
`;
export const ContactMenuSection = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  right: 100px;
  width: 140px;
  height: 100px;
  box-shadow: 2px 2px 3px gray;
  border-radius: 8px;
`;
export const ContactMenuDiv = styled.section`
  div {
    display: flex;
    flex-direction: row;
    padding: 7px 12px;
    width: 140px;
    margin-bottom: 0px !important;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: pointer;
  }
  p {
    color: #666;
    margin-left: 7px;
    padding-bottom: 0px;
  }
`;

export const ContactMenuAnc = styled.a`
  display: flex;
  flex-direction: row;
  // background-color: yellow;
  text-decoration: none;
`;
