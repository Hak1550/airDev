import styled from 'styled-components';
import { GRAY_200, GRAY_500, GRAY_700, GRAY_900 } from '../../Config/colors';

export const CollaboratorsContainer = styled.div`
  padding: 52px 32px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  width: 99%;
  /* min-width: 700px; */
  max-width: 99%;
  // border: 1px solid red;
  height: 100vh;
  min-height: 600px;
  overflow-y: scroll;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const HeaderMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const HeaderMainLeft = styled.div`
  background-color: #f3f0fb;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 67px;
  height: 22px;
  margin-bottom: 5px;
  background: #f9f5ff;
  border-radius: 16px;
`;
export const HeaderMainLeftPara = styled.p`
  display: flex;
  font-size: 12px;
  text-align: center;
  justify-content: center;
  color: #6941c6;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  // line-height: 18px;
  margin-bottom: 0px !important;
  padding-top: 2px;
`;
export const DownLoadBtn = styled.button`
  width: 155px;
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

export const AddBtn = styled.button`
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

export const HeadImg = styled.img`
  width: 18.34px;
  height: 15.01px;
  margin-right: 10px;
`;
export const HeadImg2 = styled.img`
  width: 11.67px;
  height: 11.67px;
  margin-right: 10px;
`;

export const HeadBtnImgP = styled.p`
  color: #344054;
  align-self: center;
  margin-bottom: 0px !important;
  text-decoration: none !important;
  font-size: 14px;
  font-weight: 500;
  font-family: Inter;
  // font-style: none;
`;
export const HeadBtnImgPa = styled.p`
  color: #fff;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  align-self: center;
  margin-bottom: 0px !important;
`;

export const SearchMainDiv = styled.div`
  width: 100%;
  height: 577px;
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
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  // overflow-y:scroll;
  // overflow-x:scroll;
  // &:-webkit-scrollbar {
  //   display: none;
  // }
  // scrollbar-width: none;
`;
export const SearchHeadDiv = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 75px;
  // border: 1px solid grey;
`;
export const SearchHeadDivLeft = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
export const SearchHeadDivRight = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const SearchHeadPart1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  // border: 1px solid gray;
  min-width: 170px;
  margin-left: 20px;
`;
export const SearchHeadPart1Div = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const SearchHeadPart1DivHead = styled.div`
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
`;
export const SearchClearFilterDiv = styled.div`
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
export const SearchClearFilterP = styled.p`
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
export const SearchHeadPart2 = styled.div`
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
export const SearchHeadPart3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin-left: 10px;
  // border: 1px solid #6665;
`;

export const SearchHeadPart2DivHead = styled.div`
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
export const SearchHeadPart2DivHead2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: -10px;
  justify-content: flex-start;
`;
export const SearchHeadPart2DivHead3 = styled.div`
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
  background-color: #f9fafb;
  border-bottom: 1px solid #e4e7ec;
  height: 44px;
  width: 100%;
  margin-top: 10px;
  padding: 12px 24px;
`;
export const SearchHeadingDivP1 = styled.div`
  width: 50%;
  min-width: 200px;
  // border-bottom: 1px solid #6665;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  width: 20%;
  /* // border-bottom: 1px solid #6665; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const SearchHeadingDivP3 = styled.div`
  width: 25%;
  min-width: 160px;
  /* max-width: 380px; */
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
  height: auto;
  min-height: 550px;
`;
export const EachCollabolators = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e4e7ec;
  justify-content: flex-start;
  height: 72px;
  padding-left: 24px;
  padding-right: 21px;
`;
export const EachCollabolatorProject = styled.section`
  div {
    width: 70px;
    background-color: #f9f5ff;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    height: 22px;
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
  width: 50%;
  min-width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  width: 27%;
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

export const EachCollabolatorsP2P = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0px;
  color: #d92d20;
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
  width: 23%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  column-gap: 24px;
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
  /* Shadow/md */
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-bottom-radius: 8px;
  padding-top: 10px;
  back-ground-color: #fff;
  // margin-top: -5px;
  z-index: 5;
`;
export const SearchFooterDiv1 = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 24px;
`;
export const SearchFooterDiv2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const SearchFooterDiv3 = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 24px;
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
  background: ${props => (props.disabled ? '#e4e7ec' : '#ffffff')};

  /* Gray/300 */
  border: 1px solid #d0d5dd;

  /* Shadow/xs */
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
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
  position: relative;
  right: 10px;
  // top: -10px;
`;
export const RightNavContainerXPar = styled.img`
  width: 10px;
  height: 10px;
`;
export const RightNavContainerXPar2 = styled.img`
  width: 10px;
  height: 5px;
  margin-right: 40px;
  cursor: pointer;
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
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
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

  margin-top: -10px !important;
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

export const InitialsAddDiv = styled.div`
  width: ${props => (props.added ? '73px' : '65px')};
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
