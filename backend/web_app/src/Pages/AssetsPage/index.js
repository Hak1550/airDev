import React, { useState, useEffect, useRef, useReducer } from 'react';
import { CollaboratorsContainer, RightNavContainer } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { apiMembersListRequest, apiTeamListRequest } from 'Redux/actions/team';
import {
  apiCameraPatchRequest,
  apiGearGlobalListRequest,
  apiInstancePatchRequest,
} from '../../Redux/actions/gear';
import GearHeader from './components/GearHeader';
import GearList from './components/GearList';
import EditStorage from './components/EditStorage';
import OnboardCamera from './components/OnboardCamera';
import OnboardInstance from './components/OnboardInstance';
import EditCamera from '../../Components/EditGear/EditCamera';
import EditInstance from '../../Components/EditGear/EditInstance';
import { apiProjectGetRequest } from 'Redux/actions/project';
import { resetInvite } from 'Redux/actions/invite';
import {
  apiClearUrl,
  apiGetAllAssetsRequest,
  apiGetAvailablePkgRequest,
  apiGetInstanceUsageRequest,
  apiGetStoragePlanRequest,
  apiGetWasabiUsedStorageRequest,
} from 'Redux/actions/assets';
import { apiGetAllPaymentMethodRequest } from 'Redux/actions/payment';
import PaymentDetailsForm from 'Pages/BillingPage/components/PaymentDetailsForm';
import SelectPaymentMethod from 'Pages/BillingPage/components/SelectPaymentMethod';
import X from 'Components/Icons/X';
import {
  CloseIcon,
  NavTitle,
  SideBarContent,
} from 'Layouts/CameraControlLayout/styles';
import {
  apiGetMyAssets,
  apiGetMyStoragePlan,
} from 'Redux/actions/user_information';
import useQuery from 'hooks/useQuery';
import { toast } from 'react-toastify';
import CameraPackages from './components/CameraPackages';
import { getObjectByLowestValue } from 'Utils/permissions';

const AssetsPage = () => {
  const dispatchRedux = useDispatch();
  const params = useQuery();
  const gearList = useSelector(state => state.gear);
  const auth = useSelector(state => state.auth);
  const team = useSelector(state => state.team);
  const payment = useSelector(state => state.payment);
  const userInformation = useSelector(state => state.userInformation);
  const gearListStorage = userInformation?.assetList;
  const invite = useSelector(state => state.invite);
  const projects = useSelector(state => state.project.projectList);
  const assets = useSelector(state => state.assets);
  const availableStoragePkgs = assets?.availablePkgs?.filter(
    f => f.package_type === 1,
  );
  const availableCameraPkgs = assets?.availablePkgs?.filter(
    f => f.package_type === 2,
  );
  const allGears = assets?.allGears;
  const selectRef = useRef(null);
  const loading = team?.isLoading;
  const gear = gearList?.airGearGlobalList;
  const cameraCount = allGears?.camera?.length;
  const instanceCount = allGears?.instance?.length;
  const storage = assets?.storagePlan;
  const [showRightNav, setShowRightNav] = useState('');
  const [select, setSelect] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [gears, setGears] = useState([]);
  const count = gears?.length;
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectGear, setSelectGear] = useState(null);
  const [sideNavPage, setSideNavPage] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [rightNavTitle, setRightNavTitle] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [storagePlanDetails, setStoragePlanDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [cardAdded, setCardAdded] = useState(null);
  const [onboardForm, setOnboardForm] = useState(null);
  const [filterAssets, setFilterAssets] = useState({
    heading: '',
    arrowDirection: 'up',
    state: true,
  });

  let isCardAdded = false;

  useEffect(() => {
    if (userInformation.storagePlan) {
      const data = userInformation.storagePlan;
      const planDetails = {
        storage: 0,
        price: 0,
        price_supporting_text: '',
        billingDate: data?.length > 1 ? data[1]?.end_date : null,
        cameras: 0,
        instances: 0,
        storageType: 'GB',
      };
      data.forEach(item => {
        const tempStorage =
          item.package.storage_type !== 'gb'
            ? item.package.storage * 1000 * item.quantity
            : item.package.storage * item.quantity;
        planDetails.storage = Number(planDetails.storage) + Number(tempStorage);
        planDetails.price = planDetails.price + item?.package?.price;
        planDetails.price_supporting_text =
          item?.package?.price_supporting_text;
      });
      if (gearListStorage) {
        planDetails.cameras = gearListStorage?.camera?.length;
        planDetails.instances = gearListStorage?.instance?.length;
      }
      if (planDetails.storage >= 1000) {
        planDetails.storageType = 'TB';
        planDetails.storage = planDetails.storage / 1000;
      }
      planDetails.price = planDetails.price / 100;
      setStoragePlanDetails(planDetails);
    }
  }, [userInformation.storagePlan, gearListStorage]);
  const organisation = getObjectByLowestValue(
    userInformation?.data?.organisation_data,
    'role',
  )?.organisation;

  const ACTION_TYPES = {
    NAME_FILTER: 'Name_filter',
    DEVICE_FILTER: 'Device_filter',
    CATEGORY_FILTER: 'Category_filter',
    CLEAR_FILTERS: 'Clear_filter',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.DEVICE_FILTER:
        return { ...state, device_filter: action.payload.text };
      case ACTION_TYPES.NAME_FILTER:
        return { ...state, name_filter: action.payload.text };
      case ACTION_TYPES.CATEGORY_FILTER:
        return { ...state, category_filter: action.payload.text };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    name_filter: '',
    device_filter: '',
    category_filter: '',
  });

  const handleNameFilter = e => {
    setCurrentPage(1);
    dispatch({
      type: ACTION_TYPES.NAME_FILTER,
      payload: { text: e.target.value },
    });
  };

  const closeSideBar = () => {
    setShowRightNav('');
    setSideNavPage(null);
    // setSelectedPackage(null);
  };

  const closeSideBar2 = () => {
    setShowRightNav('Payment Method');
    setSideNavPage('Payment Method');
  };

  const handleDeviceFilter = e => {
    dispatch({
      type: ACTION_TYPES.DEVICE_FILTER,
      payload: { text: e.value !== '0' ? e.value : null },
    });
  };
  const handleCategoryFilter = e => {
    dispatch({
      type: ACTION_TYPES.CATEGORY_FILTER,
      payload: { text: e.value !== '0' ? e.value : null },
    });
  };
  const editGear = (data, id) => {
    setSelectGear(data);
    // console.log('data data', data);
    if (data.instance_size) {
      onChangeRightNav('editInstance');
    } else {
      onChangeRightNav('editCamera');
    }
  };

  const onChangeRightNav = e => {
    setShowRightNav(e);
  };

  const onChangeAll = val => {
    setSelectAll(!selectAll);
  };

  const onConfirm = () => {
    // if (selectedPackage[0]?.id === 3) {
    //   setShowRightNav('');
    // } else {

    setShowRightNav('Payment Method');
    // }
  };

  const handleSideNavPage = (type, id) => {
    setSelectedMethod(id);
    if (type === 'Payment Method') {
      setShowRightNav('Payment Method');
      setSideNavPage('Payment Method');
      setRightNavTitle('Payment Method');
    } else if (type === 'Payment Details') {
      setPaymentDetails(true);
      setShowRightNav('Payment Details');
      setSideNavPage('Payment Details');
      setRightNavTitle('Payment Details');
    } else {
      setShowRightNav('editStorage');
    }
  };

  useEffect(() => {
    // console.log('props?.assetsprops?.assets', assets);
    if (assets?.url) {
      // window.open(assets?.url);
      window.location.href = assets?.url;
      dispatch(apiClearUrl());
      // window.location.href = props?.assets?.url;
    }
  }, [assets?.url]);

  const onGearEditApi = gear => {
    let gear_id = gear.id;
    delete gear.id;
    console.log('gera', gear);
    if ('instance_size' in gear) {
      delete gear.user;
      delete gear.status;
      dispatchRedux(apiInstancePatchRequest(auth.token, gear_id, gear));
      dispatchRedux(apiGetAllAssetsRequest(auth.token));
    } else {
      let newData = JSON.stringify(gear);
      dispatchRedux(apiCameraPatchRequest(auth.token, gear.camera.id, gear));
      dispatchRedux(apiGetAllAssetsRequest(auth.token));
    }
  };

  useEffect(() => {
    let tempArr = [];
    if (tempArr.length === 0 && assets?.allGears) {
      tempArr.push(allGears.instance);
      tempArr.push(allGears.camera);
    }
    let tempArr2 = [].concat(...tempArr);
    setGears(tempArr2);
  }, [assets?.allGears]);

  useEffect(() => {
    if (
      params.get('payment_status') &&
      params.get('payment_status') === 'success'
    ) {
      toast.success('Payment was made successfully.', { toastId: 'success' });
    }

    if (
      params.get('payment_status') &&
      params.get('payment_status') === 'cancel'
    ) {
      toast.error('The payment was canceled.', { toastId: 'cancel' });
    }
    dispatchRedux(apiGetMyAssets(auth.token));
    dispatchRedux(apiGetMyStoragePlan(auth.token));
    dispatchRedux(apiGetAllAssetsRequest(auth.token));
    dispatchRedux(apiGetStoragePlanRequest(auth.token));
    dispatchRedux(apiGetWasabiUsedStorageRequest(auth.token, organisation?.id));
    dispatchRedux(apiGetAvailablePkgRequest(auth.token));
    dispatchRedux(apiGetAllPaymentMethodRequest(auth.token));
    dispatchRedux(apiGetInstanceUsageRequest(auth.token));
  }, []);

  useEffect(() => {
    if (gearList.redirect_url) {
      window.location.replace(gearList.redirect_url);
      // console.log('gearList.redirect_url', gearList.redirect_url);
    }
  }, [gearList.redirect_url]);
  // console.log('gearList', gearList);

  useEffect(() => {
    if (payment && !paymentDetails) {
      isCardAdded =
        payment.paymentMethods?.data?.length > 0
          ? 'Payment Method'
          : 'Payment Method';

      setCardAdded(isCardAdded);
      setSideNavPage(isCardAdded);
      setRightNavTitle(isCardAdded);
    }
  }, [payment]);

  useEffect(() => {
    if (invite.success) {
      dispatch(resetInvite());
    }
  }, [invite]);

  // console.log(auth.token);

  return (
    <CollaboratorsContainer>
      <GearHeader
        gear={gear}
        onChangeRightNav={onChangeRightNav}
        cameraCount={cameraCount}
        instanceCount={instanceCount}
        assets={assets}
        storage={storagePlanDetails}
      />
      <GearList
        team={team}
        gears={gears}
        assets={assets}
        onChangeRightNav={onChangeRightNav}
        gear={gear}
        onChangeAll={onChangeAll}
        select={select}
        selectAll={selectAll}
        count={count}
        loading={loading}
        projects={projects}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        state={state}
        editGear={editGear}
        dispatch={dispatch}
        ACTION_TYPES={ACTION_TYPES}
        selectRef={selectRef}
        handleNameFilter={handleNameFilter}
        handleDeviceFilter={handleDeviceFilter}
        handleCategoryFilter={handleCategoryFilter}
        onGearEditApi={onGearEditApi}
        filterAssets={filterAssets}
        setFilterAssets={setFilterAssets}
      />
      {showRightNav === 'editStorage' ? (
        <EditStorage
          onChangeRightNav={onChangeRightNav}
          availablePkgs={availableStoragePkgs}
          auth={auth}
          payment={payment}
          storage={storage}
          onConfirm={onConfirm}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
      ) : showRightNav === 'onboardCamera' ? (
        <OnboardCamera
          onChangeRightNav={onChangeRightNav}
          setOnboardForm={setOnboardForm}
        />
      ) : showRightNav === 'onboardInstance' ? (
        <OnboardInstance onChangeRightNav={onChangeRightNav} />
      ) : showRightNav === 'editCamera' ? (
        <EditCamera
          onChangeRightNav={onChangeRightNav}
          editCamera={selectGear}
          closeSideBar={closeSideBar}
          onGearEditApi={onGearEditApi}
        />
      ) : showRightNav === 'editInstance' ? (
        <EditInstance
          editInstance={selectGear}
          closeSideBar={closeSideBar}
          onGearEditApi={onGearEditApi}
        />
      ) : showRightNav === 'cameraPackages' ? (
        <CameraPackages
          onChangeRightNav={onChangeRightNav}
          availablePkgs={availableCameraPkgs}
          auth={auth}
          payment={payment}
          storage={storage}
          closeSideBar={closeSideBar}
          onConfirm={onConfirm}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          onboardForm={onboardForm}
        />
      ) : showRightNav === 'Payment Details' ? (
        <RightNavContainer>
          <CloseIcon onClick={closeSideBar}>
            <X />
          </CloseIcon>

          <NavTitle>{rightNavTitle}</NavTitle>
          <SideBarContent>
            <PaymentDetailsForm
              onRightNavClose={closeSideBar2}
              handleSideNavPage={handleSideNavPage}
              selectedMethod={selectedMethod}
              paymentMethods={payment?.paymentMethods?.data}
            />
          </SideBarContent>
        </RightNavContainer>
      ) : showRightNav === 'Payment Method' ? (
        <RightNavContainer>
          <CloseIcon onClick={closeSideBar}>
            <X />
          </CloseIcon>

          <NavTitle>{rightNavTitle}</NavTitle>
          <SideBarContent>
            <SelectPaymentMethod
              onRightNavClose={closeSideBar}
              handleSideNavPage={handleSideNavPage}
              paymentMethods={payment?.paymentMethods?.data}
              customerDetails={payment?.customerDetails?.invoice_settings}
              storagePlan={storage}
              selectedPackage={selectedPackage}
              availablePkgs={assets?.availablePkgs}
              assets={assets}
            />
          </SideBarContent>
        </RightNavContainer>
      ) : null}
    </CollaboratorsContainer>
  );
};

export default AssetsPage;
