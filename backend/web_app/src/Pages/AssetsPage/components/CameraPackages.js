import React, { useState } from 'react';
import {
  EditStorageFirstChild,
  EditStorageSecondChild,
  EditStorageSection,
  ESFCFirstDiv,
  ESFCSecondDiv,
  ESSCFirstDiv,
  ESSCFirstDivP,
  ESSCFirstDivP1,
  ESSCSecDiv,
  ESSCThirdDiv,
  RightNavContainer,
  RightNavContainerFoot,
  RightNavContainerX,
  RightNavContainerXPar,
  RightNavSecDiv,
  RNCFBtn,
  RNCFBtn2,
  SDMHeading,
  SideBarMainDiv,
  TeamHeadBtnImgP,
  TeamHeadBtnImgPa,
} from '../styles';
import cross from '../../../Assets/images/cross.png';
import Basic from '../../../Assets/images/BasicPkg.png';
import Charge from '../../../Assets/images/ChargePkg.png';
import checkboxBase from '../../../Assets/images/CheckboxbaseCircle.png';
import tick from '../../../Assets/images/tickCircleBlue.png';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiGetAllPaymentMethodRequest } from 'Redux/actions/payment';
import PaymentDetailsForm from 'Pages/BillingPage/components/PaymentDetailsForm';
import SelectPaymentMethod from 'Pages/BillingPage/components/SelectPaymentMethod';
import storage from 'redux-persist/lib/storage';
import { OutlinedButton } from 'Components/IconButton/styles';
import { DoneButton } from 'Components/AddCommsContent/styles';
import { apiGearPostRequest } from 'Redux/actions/gear';
import { apiGetAllAssetsRequest } from 'Redux/actions/assets';
const CameraPackages = ({
  // onConfirm,
  onChangeRightNav,
  availablePkgs,
  selectedPackage,
  setSelectedPackage,
  storage,
  onboardForm,
  ...props
}) => {
  const dispatch = useDispatch();
  // console.log('onboardForm', onboardForm);

  const [storageDetail, setStorageDetail] = useState(availablePkgs);

  const assets = useSelector(state => state.assets);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (assets?.currentStoragePlan) {
      let pkg = [...availablePkgs];
      // console.log('availablePkgs', availablePkgs);

      pkg.filter(f => f.id === 9).map(m => (m.is_removed = true));
      pkg
        .filter(f => f.id === assets.currentStoragePlan)
        .map(m => (m.is_removed = true));

      setStorageDetail(pkg);
    }
  }, [assets?.currentStoragePlan]);

  useEffect(() => {
    if (!selectedPackage) {
      setSelectedPackage(availablePkgs);
    }
  }, []);

  const onChangePackage = e => {
    let pkg = [...storageDetail];
    pkg.map(m1 => (m1.is_removed = false));
    // pkg.filter(f => f.id === 3).map(m => (m.is_removed = true));
    pkg.filter(f => f.id === e.id).map(m => (m.is_removed = true));
    setStorageDetail(pkg);
    let selectedPkg = pkg.filter(f => f.is_removed);
    setSelectedPackage(selectedPkg);
  };
  const closeSideBar = () => {
    onChangeRightNav('');
    setSelectedPackage(null);
    props?.closeSideBar();
  };

  const onConfirm = () => {
    // console.log('organisation', JSON.stringify(onboardForm));
    dispatch(apiGearPostRequest(onboardForm, auth.token, '1'));
    dispatch(apiGetAllAssetsRequest(auth.token));
    props?.onAddGearEnd && props.onAddGearEnd();
    props?.setOnBoardCameraForm && props.setOnBoardCameraForm(false);
    props?.closeSideBar && props?.closeSideBar();
  };

  // console.log(selectedPackage, storageDetail);
  return (
    <RightNavContainer>
      {/* =========================Header=================================== */}
      <RightNavContainerX
        onClick={
          props?.closeSideBar
            ? () => props?.closeSideBar()
            : () => closeSideBar()
        }
      >
        <RightNavContainerXPar src={cross} />
      </RightNavContainerX>
      {/* =========================Body=================================== */}
      <SideBarMainDiv>
        <SDMHeading>Edit Camera</SDMHeading>
        <RightNavSecDiv>
          {availablePkgs
            .sort((a, b) => (a.price > b.price ? 1 : -1))
            .map((pkg, index) => {
              return (
                <EditStorageSection key={index}>
                  <EditStorageFirstChild
                    select={selectedPackage && pkg.id === selectedPackage[0].id}
                  >
                    <ESFCFirstDiv>
                      <img
                        src={pkg.price === 0 ? Basic : Charge}
                        className="firstImg"
                      />
                      <p
                        select={
                          selectedPackage && pkg.id === selectedPackage[0].id
                        }
                      >
                        {pkg.name}
                      </p>
                    </ESFCFirstDiv>
                    <ESFCSecondDiv
                      onClick={e => index !== 0 && onChangePackage(pkg)}
                    >
                      <img
                        src={
                          pkg.price === 0 ||
                          (selectedPackage && pkg.id === selectedPackage[0].id)
                            ? tick
                            : checkboxBase
                        }
                      />
                    </ESFCSecondDiv>
                  </EditStorageFirstChild>
                  <div style={{ width: '100%' }}>
                    <EditStorageSecondChild>
                      <ESSCFirstDiv>
                        <ESSCFirstDivP>${pkg.price / 100}</ESSCFirstDivP>
                        <ESSCFirstDivP1>
                          {pkg.price_supporting_text}
                        </ESSCFirstDivP1>
                      </ESSCFirstDiv>
                      {pkg.price === 0 ||
                      (selectedPackage && pkg.id === selectedPackage[0].id) ? (
                        <ESSCSecDiv>
                          <p style={{ marginBottom: '0px !important' }}>
                            Included
                          </p>
                        </ESSCSecDiv>
                      ) : null}
                    </EditStorageSecondChild>
                    <ESSCThirdDiv>
                      <p>{pkg.description}</p>
                    </ESSCThirdDiv>
                  </div>
                </EditStorageSection>
              );
            })}
        </RightNavSecDiv>
      </SideBarMainDiv>

      {/* =========================Footer=================================== */}
      <RightNavContainerFoot>
        {/* <RNCFBtn>
          <TeamHeadBtnImgP onClick={closeSideBar}>Cancel</TeamHeadBtnImgP>
        </RNCFBtn>
        <RNCFBtn2>
          <TeamHeadBtnImgPa onClick={selectedPackage && onConfirm}>
            Confirm
          </TeamHeadBtnImgPa>
        </RNCFBtn2> */}
        <OutlinedButton
          className="btn btn-sm"
          onClick={
            props?.closeSideBar
              ? () => props?.closeSideBar()
              : () => closeSideBar()
          }
        >
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm me-3"
          onClick={onConfirm}
          disabled={!selectedPackage}
        >
          Confirm
        </DoneButton>
      </RightNavContainerFoot>
    </RightNavContainer>
  );
};

export default CameraPackages;
