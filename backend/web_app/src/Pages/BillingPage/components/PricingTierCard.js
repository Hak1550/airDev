import Loader from 'Components/Loader';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { FormTitle } from '../../../Components/Forms';
import Arrow from '../../../Components/Icons/Arrow';
import {
  Card,
  FormHeader,
  PlanType,
  PriceTag,
  PricingContainer,
  PricingFooter,
  PricingTitle,
} from '../styles';

const PricingTierCard = ({
  SideNavPageType,
  handleSideNavPage,
  storagePlanDetails,
}) => {
  const history = useHistory();
  return (
    <PricingContainer className="col">
      {storagePlanDetails ? (
        <>
          <div style={{ margin: '24px' }}>
            <PricingTitle>
              <FormHeader>
                <FormTitle
                  description={`You’ve chosen to pay ${storagePlanDetails?.price_supporting_text}.`}
                >
                  Your plan <PlanType>Monthly</PlanType>
                </FormTitle>
              </FormHeader>
              <PriceTag>
                ${storagePlanDetails?.price}{' '}
                <span>{storagePlanDetails?.price_supporting_text}</span>
              </PriceTag>
            </PricingTitle>
            <FormTitle>
              {storagePlanDetails?.billingDate ? (
                <span style={{ fontSize: '14px' }}>
                  Next Billing Date:{' '}
                  {moment(storagePlanDetails?.billingDate)
                    .add(1, 'day')
                    .format('MMMM DD, YYYY')}
                </span>
              ) : null}
            </FormTitle>
            <Card>
              <FormTitle
                description={`You currently have ${storagePlanDetails?.cameras} active cameras.`}
              >
                <span style={{ fontSize: '14px' }}>Cameras</span>
              </FormTitle>
            </Card>
            <Card>
              <FormTitle
                description={`You currently have ${storagePlanDetails?.storage} ${storagePlanDetails?.storageType} of Storage.`}
              >
                <span style={{ fontSize: '14px' }}>Storage</span>
              </FormTitle>
            </Card>
            <Card>
              <FormTitle
                description={`You currently have ${storagePlanDetails?.instances} Cloud Compute Instances.`}
              >
                <span style={{ fontSize: '14px' }}>
                  Cloud Compute Instances
                </span>
              </FormTitle>
            </Card>
          </div>
          <div style={{ borderBottom: '1px solid #E4E7EC' }}></div>
          <PricingFooter>
            <Link
              to="#"
              // onClick={() => handleSideNavPage(SideNavPageType.PAYMENT_METHOD)}
              onClick={() => history.push('/settings/assets')}
            >
              Upgrade <Arrow />
            </Link>
          </PricingFooter>
        </>
      ) : (
        <Loader />
      )}
    </PricingContainer>
  );
};

export default PricingTierCard;
