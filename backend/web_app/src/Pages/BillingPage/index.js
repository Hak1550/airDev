import Loader from 'Components/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  apiGetAllInvoices,
  apiGetAllPaymentMethodRequest,
  resetPayment,
} from 'Redux/actions/payment';
import { FormTitle } from '../../Components/Forms';
import X from '../../Components/Icons/X';
import DefaultPaymentMethod from './components/DefaultPaymentMethod';
import PaymentDetailsForm from './components/PaymentDetailsForm';
import PricingTierCard from './components/PricingTierCard';
import SelectPaymentMethod from './components/SelectPaymentMethod';
import { AddLink } from 'Components/AddExternalLinks/styles';
import PlusNaked from 'Components/Icons/PlusNaked';
import {
  BillingPageContainer,
  CloseIcon,
  FormHeader,
  NavTitle,
  PaymentMethodContainer,
  PaymentMethodContainerDiv,
  RightNavContainer,
  SideBarContent,
} from './styles';
import Invoices from './components/Invoices';
import { BorderBottom } from 'Components/CommonStyles';
import {
  apiGetMyAssets,
  apiGetMyStoragePlan,
} from 'Redux/actions/user_information';
import { apiGearGlobalListRequest } from 'Redux/actions/gear';
import {
  TeamDownLoadBtn,
  TeamHeadBtnImgP,
  TeamHeadImg,
} from 'Pages/TeamPage/styles';
import download from '../../Assets/images/download.png';
import { CSVLink } from 'react-csv';
import moment from 'moment';

const BillingPage = props => {
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);
  const payment = useSelector(state => state.payment);
  const gear = userInformation?.assetList;
  const history = useHistory();
  const dispatch = useDispatch();
  const [sideNavPage, setSideNavPage] = useState(null);
  const [showRightNav, setShowRightNav] = useState(false);
  const [rightNavTitle, setRightNavTitle] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [defaultMethod, setDefaultMethod] = useState(null);
  const [data, setData] = useState([]);
  // const [packageDetails, setPackageDetails] = useState(null);
  const [storagePlanDetails, setStoragePlanDetails] = useState(null);
  const SideNavPageType = {
    PAYMENT_METHOD: 'Payment Method',
    PAYMENT_DETAILS: 'Payment Details',
  };

  // const location = useLocation();
  // useEffect(() => {
  //   if (location.state) {
  //     const { selectedPkg, selectedPkgDetails } = location.state;
  //     setShowRightNav('Payment Details');
  //     setRightNavTitle('Payment Details');
  //     setPackageDetails(selectedPkgDetails);
  //   }
  // }, []);
  // console.log('selectedPkgDetails', packageDetails);

  const headers = [
    { label: 'Invoice Id', key: 'invoice_id' },
    { label: 'Billing Date', key: 'created' },
    { label: 'Status', key: 'status' },
    { label: 'Amount', key: 'amount' },
    { label: 'Invoice URL', key: 'invoice_url' },
  ];

  useEffect(() => {
    dispatch(apiGetAllPaymentMethodRequest(auth.token));
    dispatch(apiGetMyStoragePlan(auth.token));
    dispatch(apiGetMyAssets(auth.token));
    dispatch(apiGetAllInvoices(auth.token));
  }, []);

  useEffect(() => {
    if (payment?.invoiceData) {
      const tempData = payment?.invoiceData.map(item => {
        return {
          ...item,
          created: moment(item.created).format('MMM DD, YYYY'),
          status: item?.status === 2 ? 'Paid' : 'Not Paid',
          amount: `USD $${(item?.amount / 100).toFixed(2)}`,
        };
      });
      setData(tempData);
    }
  }, [payment?.invoiceData]);

  useEffect(() => {
    if (payment.success) {
      const defaultCard =
        payment?.paymentMethods?.data.length > 0
          ? payment?.paymentMethods?.data.find(
              item =>
                item.id ===
                payment?.customerDetails?.invoice_settings
                  ?.default_payment_method,
            )
          : null;
      setDefaultMethod(defaultCard);
      dispatch(resetPayment());
    }
  }, [payment.success]);

  useEffect(() => {
    if (payment.defaultSuccess) {
      dispatch(apiGetAllPaymentMethodRequest(auth.token));
      onRightNavClose();
      dispatch(resetPayment());
    }
  }, [payment.defaultSuccess]);

  // useEffect(() => {
  //   if (userInformation?.data?.global_role === 4)
  //     history.push('/settings/account-details');
  // }, [userInformation]);

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
        planDetails.price =
          planDetails.price + item?.package?.price * item.quantity;
        planDetails.price_supporting_text =
          item?.package?.price_supporting_text;
        // console.log('asdasas : ', planDetails);
        // console.log('asdasas : ', item.package.storage * 1000);
      });
      if (gear) {
        planDetails.cameras = gear?.camera?.length;
        planDetails.instances = gear?.instance?.length;
      }
      if (planDetails.storage >= 1000) {
        planDetails.storageType = 'TB';
        planDetails.storage = planDetails.storage / 1000;
      }
      planDetails.price = planDetails.price / 100;
      setStoragePlanDetails(planDetails);
    }
  }, [userInformation.storagePlan, gear]);

  const onRightNavClose = () => {
    setShowRightNav(false);
  };

  const handleSideNavPage = (type, id) => {
    setSelectedMethod(id);
    setShowRightNav(true);
    if (payment?.paymentMethods?.data.length > 0) {
      setSideNavPage(type);
      setRightNavTitle(type);
    } else {
      setSideNavPage('Payment Details');
      setRightNavTitle('Payment Details');
    }
  };
  return (
    <>
      <BillingPageContainer>
        <div className="row">
          <PricingTierCard
            SideNavPageType={SideNavPageType}
            handleSideNavPage={handleSideNavPage}
            storagePlanDetails={storagePlanDetails}
          />
          <PaymentMethodContainer className="col">
            <FormHeader>
              <FormTitle
                description={'Change how you pay for your plan.'}
                title={'Payment method'}
              >
                {'Payment method'}
              </FormTitle>
            </FormHeader>
            {payment.isLoading ? (
              <Loader />
            ) : payment?.paymentMethods?.data.length > 0 ? (
              <PaymentMethodContainerDiv>
                {payment?.paymentMethods?.data.map(item => (
                  <DefaultPaymentMethod
                    data={item}
                    SideNavPageType={SideNavPageType}
                    handleSideNavPage={handleSideNavPage}
                    key={item.id}
                  />
                ))}
              </PaymentMethodContainerDiv>
            ) : (
              <div className="d-flex mt-3 justify-content-center w-100 h-75">
                <AddLink onClick={() => handleSideNavPage('Payment Details')}>
                  <PlusNaked strokeColor="#6941C6" />
                  Add payment method
                </AddLink>
              </div>
            )}
          </PaymentMethodContainer>
        </div>
        <div className="row" style={{ marginTop: '57px' }}>
          <div className="d-flex justify-content-between p-0">
            <FormTitle
              description={'Pick an account plan that fits your workflow.'}
            >
              Billing and invoicing
            </FormTitle>
            <CSVLink
              data={data || []}
              headers={headers}
              style={{ textDecoration: 'none' }}
              filename={`invoices-${moment().unix()}.csv`}
            >
              <TeamDownLoadBtn>
                <TeamHeadImg src={download} />
                <TeamHeadBtnImgP>Download all</TeamHeadBtnImgP>
              </TeamDownLoadBtn>
            </CSVLink>
          </div>
          <BorderBottom style={{ marginTop: '0px' }} />
          {!payment?.isLoading ? (
            <Invoices invoiceData={payment?.invoiceData} />
          ) : (
            <Loader />
          )}
        </div>
      </BillingPageContainer>
      {showRightNav && (
        <RightNavContainer>
          <CloseIcon onClick={onRightNavClose}>
            <X />
          </CloseIcon>

          <NavTitle>{rightNavTitle}</NavTitle>
          <SideBarContent>
            {sideNavPage === SideNavPageType.PAYMENT_METHOD ? (
              <SelectPaymentMethod
                onRightNavClose={onRightNavClose}
                handleSideNavPage={handleSideNavPage}
                paymentMethods={payment?.paymentMethods?.data}
                customerDetails={payment?.customerDetails?.invoice_settings}
              />
            ) : (
              <PaymentDetailsForm
                onRightNavClose={onRightNavClose}
                handleSideNavPage={handleSideNavPage}
                selectedMethod={selectedMethod}
                paymentMethods={payment?.paymentMethods?.data}
              />
            )}
          </SideBarContent>
        </RightNavContainer>
      )}
    </>
  );
};

export default BillingPage;
