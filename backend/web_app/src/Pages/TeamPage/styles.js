import styled from 'styled-components';
import { GRAY_200, GRAY_500, GRAY_700, GRAY_900 } from '../../Config/colors';

export const CollaboratorsContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  width: 99%;
  min-width: 700px;
  max-width: 99%;
  // border: 1px solid red;
  min-height: 600px;
  overflow-y: scroll;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  margin-left: -30px;
`;

export const TeamHeaderMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TeamHeaderPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  div {
    height: 30px;
    justify-content: center;
  }
`;
export const TeamHeaderPartP = styled.p`
  font-weight: 500;
  margin-right: 10px;
  font-size: 18px;
  color: #101828;
  font-family: Inter;
  margin-bottom: 0px !important;
`;

export const TeamHeaderMainLeftPara = styled.p`
  display: flex;
  border-radius: 16px;
  font-size: 12px;
  text-align: center;
  justify-content: center;
  color: #6941c6;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  // line-height: 18px;
  margin-bottom: 5px !important;
  background-color: #f3f0fb;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const TeamDownLoadBtn = styled.button`
  width: 164px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  border: 1px solid #d0d5dd;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #fff;
`;

export const TeamAddBtn = styled.button`
  width: 184px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  border: 1px solid #d0d5dd;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #7f56d9;
  margin-left: 10px;
`;

export const TeamHeadImg = styled.img`
  width: 18.34px;
  height: 15.01px;
  margin-right: 10px;
`;
export const TeamHeadImg2 = styled.img`
  width: 11.67px;
  height: 11.67px;
  margin-right: 10px;
`;

export const TeamHeadBtnImgP = styled.p`
  color: #344054;
  align-self: center;
  margin-bottom: 0px !important;
  text-decoration: none !important;
  font-size: 14px;
  font-weight: 500;
  font-family: Inter;
  // font-style: none;
`;
export const TeamHeadBtnImgPa = styled.p`
  color: #fff;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  align-self: center;
  margin-bottom: 0px !important;
`;
export const TeamTableMainDiv = styled.div``;
export const TeamSearchMainDiv = styled.div`
  width: 100%;
  // min-height:600px
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #e4e7ec;
  // border: 1px solid blue;

  /* Shadow/md */
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  background-color: 'red';
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  // overflow-y: scroll;
  overflow-x: scroll;
  &:-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
export const TeamSearchHeadDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 75px;
  // border: 1px solid grey;
`;
export const TeamSearchHeadDivLeft = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
export const TeamSearchHeadDivRight = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const TeamSearchHeadPart1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  // border: 1px solid gray;
  min-width: 170px;
  margin-left: 20px;
`;
export const TeamSearchHeadPart1Div = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const TeamSearchHeadPart2Div = styled.section`
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  p {
    color: #344054;
    font-size: 14px;
    font-weight: 500;
    font-family: Inter;
  }
  input {
    border: none;
    outline: none;
    width: 100%;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    color: #667085;
  }
`;

export const TeamSearchHeadPart1DivHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  height: 44px;
  padding-left: 20px;
  border: 1px solid #6665;
  border-radius: 8px;
  margin-top: -10px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  input {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;
export const TeamSearchClearFilterDiv = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // width: 128px;
  // height: 44px;
  // border: 1px solid lightblue;
  // border-radius: 7px;
  cursor: pointer;

  margin-right: 10px;
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  gap: 8px;

  width: 138px;
  height: 44px;

  /* White */
  background: #ffffff;

  /* Gray/300 */
  border: 1px solid #d0d5dd;

  /* Shadow/xs */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const TeamSearchClearFilterP = styled.p`
  color: #3e4a5d;
  font-weight: 500;
  font-size: 15.5px;
  line-height: 24px;
  font-family: Inter;
  font-weight: 500;
  margin-bottom: 0px !important;
`;

export const SearchImg = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;
export const TeamSearchHeadPart2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  max-width: 180px;
  min-width: 100px;
  // margin-left: -10px;
  // min-width: 210px;
`;
export const TeamSearchHeadPart3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin-left: 10px;
  // border: 1px solid #6665;
`;

export const TeamSearchHeadPart2DivHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 40px;
  border: 1px solid #6665;
  border-radius: 10px;
  margin-top: -10px;
  justify-content: center;
`;
export const TeamSearchHeadPart2DivHead2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: -10px;
  justify-content: flex-start;
`;
export const TeamSearchHeadPart2DivHead3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: -10px;
  justify-content: flex-start;
`;

// ==================================== Collaborators Heading =======================================
export const SearchHeadingDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid #6665;
  border-bottom: 1px solid #6665;
  background-color: #f9fafb;
  height: 44px;
  width: 100%;
  margin-top: 10px;
`;
export const SearchHeadingDivP1 = styled.div`
  width: 30%;
  min-width: 200px;
  max-width: 470px;
  // border-bottom: 1px solid #6665;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
export const SearchHeadingDivP1pa = styled.div`
  color: #667085;
  margin-bottom: 0px;
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`;
export const MainSelectImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;
export const MainSelectImg3 = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  // cursor: pointer;
`;

export const MainSelectImg2 = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 30px;
  cursor: pointer;
`;

export const SearchHeadingDivP2 = styled.div`
  min-width: 100px;
  width: 15%;
  max-width: 230px;
  // border-bottom: 1px solid #6665;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
`;
export const SearchHeadingDivP3 = styled.div`
  width: 22%;
  min-width: 160px;
  max-width: 380px;
  // border-bottom: 1px solid #6665;

  align-items: center;
  justify-content: flex-start;
  padding-left: 5px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
export const SearchHeadingDivP4 = styled.div`
  min-width: 60px;
  width: 25%;
  max-width: 400px;
  // border-bottom: 1px solid #6665;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
`;
export const SearchHeadingDivP5 = styled.div`
  width: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
`;
// ==================================== Collaborators List =======================================
export const Collabolators = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  min-height: 432px;
`;
export const EachCollabolators = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #3333;
  justify-content: flex-start;
  height: 70px;
`;
export const EachCollabolatorProject = styled.section`
  div {
    background-color: #f9f5ff;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    height: 22px;
    padding-left: 7px;
    padding-right: 7px;
  }

  p {
    font-size: 11px;
    text-align: center;
    margin-bottom: 0px;
    color: #6941c6;
  }
`;

export const CollabolatorsAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 10px;
`;
export const EachCollabolatorsP1 = styled.div`
  width: 28%;
  min-width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
`;
export const EachCollabolatorsP = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  /* identical to box height, or 143% */

  /* Gray/900 */
  color: #101828;
`;

export const EachCollabolatorsP2 = styled.div`
  width: 15%;
  min-width: 110px;
  display: flex;
  // min-width: 120px;
  // border: 1px solid grey;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 20px;
`;
export const EachCollabolatorsP2Div = styled.section`
  // border: 1px solid gray;
  div {
    width: 80px;
    height: 30px;
    background-color: #f2f4f7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
  }
  p {
    margin-bottom: 0px;
    color: #344054;
    font-size: 14px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;
export const EachCollabolatorsP3 = styled.div`
  width: 25%;
  min-width: 170px;
  display: flex;
  flex-direction: row;
  align-items: center;
  // border: 1px solid gray;
  justify-content: flex-start;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
export const EachCollabolatorsP3P = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-family: Inter;
  margin-bottom: 0px;
  color: #667085;
`;
export const EachCollabolatorsP4 = styled.div`
  width: 20%;
  height: 92%;
  min-width: 80px;
  // border: 1px solid gray;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  // padding-left: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  &:-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
export const EachCollabolatorsP5 = styled.div`
  width: 14%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  // border: 1px solid gray;
  padding-right: 20px;
`;
export const EachCollabolatorsP5P = styled.p`
  color: #6941c6;
  cursor: pointer;
  margin-bottom: 0px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
`;

// ============================================ Footer ======================================
export const SearchFooterMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  height: 68px;
  width: 100%;
  border-bottom: 1px solid #e4e7ec;
  border-left: 1px solid #e4e7ec;
  border-right: 1px solid #e4e7ec;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-top: 10px;
  background-color: #fff;
  // margin-top: -5px;
  z-index: 5;
`;
export const SearchFooterDiv1 = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
`;
export const SearchFooterDiv2 = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const SearchFooterDiv3 = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  cursor: pointer;
`;

export const SearchFooterBtn = styled.button`
  margin-bottom: 10px;

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 14px;
  gap: 8px;

  width: 114px;
  height: 36px;

  /* White */
  background: #ffffff;

  /* Gray/300 */
  border: 1px solid #d0d5dd;

  /* Shadow/xs */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const SearchFooterBtn2 = styled.button`
  margin-bottom: 10px;

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 14px;
  gap: 8px;

  width: 88px;
  height: 36px;

  /* White */
  background: #ffffff;

  /* Gray/300 */
  border: 1px solid #d0d5dd;

  /* Shadow/xs */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SearchFooterArrow = styled.img`
  width: 11.67px;
  height: 11.67px;
  margin-right: 5px;
`;
export const SearchFooterArrow2 = styled.img`
  width: 11.67px;
  height: 11.67px;
  margin-left: 5px;
`;
export const SearchFooterBtnP = styled.p`
  width: 58px;
  height: 20px;
  font-family: Inter;

  /* Text sm/Medium */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  /* identical to box height, or 143% */

  /* Gray/700 */
  color: #344054;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-bottom: 0px !important;
`;
export const SearchFooterBtnP2 = styled.p`
  width: 32px;
  height: 20px;

  /* Text sm/Medium */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  /* identical to box height, or 143% */

  /* Gray/700 */
  color: #344054;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 0px !important;
`;

// ======================================== Right Nav ===========================================
export const RightNavContainer = styled.div`
  max-width: 400px;
  width: 40vw;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  display: flex;
  flex-direction: column;
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
`;
export const RightNavContainerXDiv = styled.div`
  width: 100%;
`;
export const RightNavContainerX = styled.div`
  width: 50;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  cursor: pointer;
  margin-top: 20px;
  /* position: relative; */
  right: 10px;
`;
export const RightNavContainerXPar = styled.img`
  width: 10px;
  height: 10px;
  cursor: pointer;
`;
export const RightNavContainerXPar2 = styled.img`
  width: 10px;
  height: 5px;
  margin-right: 40px;
  cursor: pointer;
  transition: transform 20s ease;
`;
export const RightNavContainerXPar2Transform = styled.img`
  width: 10px;
  height: 5px;
  margin-right: 40px;
  cursor: pointer;
  transform: rotate(180deg);
  transition: all 1s ease-out;
`;
export const RightNavContainerXPar3 = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 20px;
  cursor: pointer;
`;

export const RightNavContainerFoot = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 70px;
  border-top: 0.5px solid lightblue;
  z-index: 10;
  background-color: #fff;
`;
export const RNCFBtn = styled.button`
  width: 79px;
  height: 40px;
  display: flex;
  align-items: center !important;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center !important;
  border: 1px solid #d0d5dd;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #d0d5dd;

  /* Shadow/xs */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;
export const RNCFBtn2 = styled.button`
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center !important;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center !important;
  border: 1px solid #7f56d9;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #7f56d9;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  margin-left: 20px;
  margin-right: 20px;
`;
export const OptionsValueContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// ======================================== Right Invite Nav ===========================================
export const SideBarMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 1000px;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
export const SideBarMainDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
`;
export const SDMHeadingDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin-top: 20px;
`;
export const SDMHeading = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;

  /* identical to box height, or 150% */

  /* Gray/900 */
  color: #101828;

  /* margin-top: -10px !important; */
  margin-bottom: 0px !important;
`;
export const SDMHeadingP = styled.p`
  margin-bottom: 0px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  /* identical to box height, or 143% */

  /* Gray/700 */
  color: #344054;
`;
export const SBMSDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #6667;
  border-radius: 10px;
  width: 100%;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;
export const SBMSDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #6667;
  border-radius: 10px;
  width: 90%;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  background-color: #f9fafb;
  margin-top: 10px;
  cursor: pointer;
`;
export const SBMSDiv3 = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  width: 100%;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  background-color: #f9fafb;
  margin-top: 10px;
  padding-left: 10px;
  cursor: pointer;
`;
export const SBMSDiv3a = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  background-color: #f9fafb;
  margin-top: 10px;
  cursor: pointer;
`;

export const SBMSImg = styled.img`
  width: 16.67px;
  height: 16.67px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const SBMSImg2 = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const SBMSInput = styled.input`
  display: flex;
  border: none;
  outline: none;
  width: 80%;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
`;
export const SBMSInput2 = styled.input`
  display: flex;
  border: none;
  outline: none;
  width: 80%;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
  color: #667085;
  background-color: transparent;
  font-size: 16px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  /* identical to box height, or 150% */

  /* Gray/500 */
  color: #667085;
`;
export const InviteDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  justify-content: flex-start;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  &:-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  margin-bottom: 70px;
`;
export const InviteDivAssign = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  justify-content: flex-start;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  &:-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  margin-bottom: 70px;
`;
export const InviteDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  margin-bottom: 10px;
`;

export const InitialsDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f5ff;
  margin-left: 20px;
`;
export const InitialsP = styled.p`
  margin-bottom: 0px !important;
  font-family: Inter;
  color: #7f56d9;
  text-align: center;
  font-size: 16px;
  justify-self: center !important;
`;
export const InitialsNameDiv = styled.div`
  width: 150px;
  overflow-x: auto;
  // border: 1px solid gray;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  flex-direction: column;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  p {
    margin-bottom: 0px;
    font-weight: 500px;
    font-size: 14px;
  }
`;
export const InitialsNameDiv2 = styled.div`
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
  height: 35px;
  flex-direction: column;
`;
export const InitialsNameDiv2P = styled.div`
  margin-bottom: 0;
  font-weight: '500';
  font-size: 14px;
  background-color: #6661;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  color: #${props => props.randomColor};
`;
export const InitialsAddDiv = styled.section`
  width: ${props => (props.added ? '73' : '73')}px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  flex-direction: column;
  margin-right: 20px;
  background-color: #f2f4f7;
  border-radius: 20px;
  cursor: pointer;
  pointer-events: ${props => props.added && 'none'};

  p {
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
    color: ${props => (props.added ? 'red' : '#344054')};
    font-family: Inter;
  }
`;
export const NoCollaborator = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 150px;
  margin-top: 30px;
  background-color: #f9f5ff;
  border-radius: 10px;
  text-align: center;
`;

export const NoCollaborator2 = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 70px;
  text-align: center;
  margin-top: 30px;
  background-color: #f9f5ff;
  border-radius: 10px;
`;

export const NoCollaboratorInputDiv = styled.div`
  width: 99%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const NoCollaboratorAll = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

// ======================================== Right Edit Nav ===========================================
export const Btn2 = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #6941c6;
  margin-top: 20px;
`;
export const AssignedProjectHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
`;
// ====================================
export const SBMSDiv5 = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #d92d20;
  margin-top: 20px;
  padding-left: 10px;
  cursor: pointer;
`;
export const SDMHeadingPWhite = styled.p`
  margin-bottom: 0px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  /* identical to box height, or 143% */

  /* Gray/700 */
  color: #fff;
`;
export const EditCamTimeImg = styled.img`
  width: 16.6px;
  height: 16.6px;
  margin-right: 10px;
`;
