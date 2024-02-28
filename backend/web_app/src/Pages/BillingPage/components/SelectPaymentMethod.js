import {
  DoneButton,
  InviteButton,
  NavFooter,
  NoCrewMemberFoundCard,
  NoUserFoundText,
} from 'Components/AddCollaboratorContent/styles';
import { AddLink } from 'Components/AddExternalLinks/styles';
import { OutlinedButton } from 'Components/IconButton/styles';
import PlusNaked from 'Components/Icons/PlusNaked';
import Loader from 'Components/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  apiClearUrl,
  apiContinueNewPkgRequest,
  apiContinueSamePkgRequest,
  apiCreatePaymentRequest,
} from 'Redux/actions/assets';
import { apiChangeDefaultPaymentMethodRequest } from 'Redux/actions/payment';
import CustomRadioCard from '../../../Components/CustomRadioCard';
import { FormTitle } from '../../../Components/Forms';
import {
  PaymentMethodSelection,
  SelectPaymentMethodContainer,
} from '../styles';

const SelectPaymentMethod = ({
  onRightNavClose,
  handleSideNavPage,
  paymentMethods,
  customerDetails,
  ...props
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const payment = useSelector(state => state.payment);
  const [stripe_price_id, set_stripe_price_id] = useState(null);
  const [selectedCard, setSelectedCard] = useState(
    customerDetails?.default_payment_method,
  );
  let prev_plan = props?.storagePlan && props?.storagePlan;
  let curr_plan = props?.selectedPackage && props?.selectedPackage;

  useEffect(() => {
    let avl_Pkg = props?.availablePkgs;
    if (curr_plan) {
      let selected_Pkg_id = props?.selectedPackage[0].id;

      let stripe_price_ids = avl_Pkg?.filter(f => f.id === selected_Pkg_id)[0]
        .stripe_price_id;
      set_stripe_price_id(stripe_price_ids);
      // console.log('stripe_price_ids', stripe_price_ids);
    } else {
      let continue_plan_id = props?.storagePlan[1]?.package.id;
      let stripe_price_ids = avl_Pkg?.filter(f => f.id === continue_plan_id)[0]
        .stripe_price_id;
      set_stripe_price_id(stripe_price_ids);
    }
  }, [curr_plan]);

  const onChangePaymentMethod = () => {
    let curr_pkg_id = curr_plan[0].id;
    dispatch(
      apiChangeDefaultPaymentMethodRequest(auth.token, {
        payment_method_id: selectedCard,
      }),
    );

    if (curr_plan.length === prev_plan.length) {
      // console.log('1st time');

      dispatch(
        apiCreatePaymentRequest(auth.token, {
          stripe_price_id,
          mode: 'subscription',
        }),
      );
    } else if (prev_plan.length > curr_plan.length) {
      let subscription_id =
        prev_plan.filter(f => curr_pkg_id === f.package.id).length > 0
          ? prev_plan.filter(f => curr_pkg_id === f.package.id)[0]
              .stripe_subscription_id
          : prev_plan.filter(f => f.stripe_subscription_id)[0]
              .stripe_subscription_id;

      let subscription_item_id =
        prev_plan.filter(f => f.package.id === curr_pkg_id).length > 0
          ? prev_plan.filter(f => f.package.id === curr_pkg_id)[0]
              .stripe_subscription_item_id
          : prev_plan[0].stripe_subscription_item_id;

      let pre_pkg = prev_plan.some(f => f.package.id === curr_pkg_id);
      if (pre_pkg) {
        // console.log('same pakage');

        dispatch(
          apiContinueSamePkgRequest(auth.token, { subscription_item_id }),
        );
      } else {
        // console.log('new pakage');
        dispatch(
          apiContinueNewPkgRequest(auth.token, {
            subscription_id,
            stripe_price_id,
          }),
        );
      }
    }
    onRightNavClose();
  };

  useEffect(() => {
    if (payment.defaultSuccess) {
      history.push('/settings/assets');
    }
  }, [payment.defaultSuccess]);
  return payment.isLoading ? (
    <Loader />
  ) : (
    <SelectPaymentMethodContainer>
      <PaymentMethodSelection>
        <CustomRadioCard
          options={paymentMethods}
          setSelectedCard={setSelectedCard}
          handleSideNavPage={handleSideNavPage}
          selectedCard={selectedCard}
        />
        {paymentMethods.length > 0 ? (
          <div className="d-flex mt-3 justify-content-end">
            <AddLink onClick={() => handleSideNavPage('Payment Details')}>
              {/* <AddLink> */}
              <PlusNaked strokeColor="#6941C6" />
              Add payment method
            </AddLink>
          </div>
        ) : (
          <NoCrewMemberFoundCard>
            <NoUserFoundText>No Payment Method Added.</NoUserFoundText>
            <OutlinedButton
              onClick={() => handleSideNavPage('Payment Details')}
              className="btn btn-sm"
            >
              <AddLink className="mb-0 justify-content-center">
                <PlusNaked strokeColor="#6941C6" />
                Add payment method
              </AddLink>
            </OutlinedButton>
          </NoCrewMemberFoundCard>
        )}

        {/* <FormTitle description={'Add a second billing contact email.'}>
          <span style={{ fontSize: '14px', color: '#344054' }}>
            Billing contact
          </span>
        </FormTitle> */}
      </PaymentMethodSelection>
      <NavFooter>
        <OutlinedButton
          className="btn btn-sm"
          onClick={() => handleSideNavPage('editStorage')}
        >
          Cancel
        </OutlinedButton>
        <DoneButton
          //   disabled={gear.isLoading}
          className="btn btn-primary btn-sm"
          onClick={onChangePaymentMethod}
          disabled={paymentMethods.length === 0 || !selectedCard}
        >
          Confirm
        </DoneButton>
      </NavFooter>
    </SelectPaymentMethodContainer>
  );
};

export default SelectPaymentMethod;
