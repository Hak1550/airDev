import styled from 'styled-components';
import { GRAY_200, GRAY_500, GRAY_700, GRAY_900 } from '../../Config/colors';

export const BillingPageContainer = styled.div`
  margin-top: 64px;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PlanType = styled.span`
  background: #f9f5ff;
  border-radius: 16px;
  margin-left: 8px;
  padding: 2px 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #6941c6;
`;

export const PricingContainer = styled.div`
  background: #ffffff;
  min-height: 457px;
  /* max-height: 500px; */
  height: auto;
  padding: 0px;
  border-radius: 8px;
  margin-right: 24px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
`;

export const PaymentMethodContainer = styled.div`
  background: #ffffff;
  min-height: 457px;
  /* max-height: 500px; */
  height: auto;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
`;

export const PaymentMethodContainerDiv = styled.div`
  overflow-y: auto;
  height: 360px;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const PricingFooter = styled.div`
  margin: 16px 24px;
  display: flex;
  justify-content: flex-end;
  a {
    text-decoration: none;
  }
`;

export const PricingTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const PriceTag = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  letter-spacing: -0.02em;
  color: ${GRAY_900};
  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${GRAY_500};
  }
`;

export const Card = styled.div`
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  padding: 16px 16px 0px;
  margin-bottom: 12px;
`;

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

export const CloseIcon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 10;
  cursor: pointer;
  background: #fff;
`;

export const NavTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #101828;
  margin: 0;
  padding: 24px 24px 0px 24px;
`;

export const SideBarContent = styled.div`
  flex: 1 1 auto;
  position: relative;
  max-height: 100%;
  overflow: hidden;
`;

export const SelectPaymentMethodContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PaymentMethodSelection = styled.div`
  flex: 1 1 auto;
  position: relative;
  max-height: 100%;
  overflow: auto;
  padding: 0px 24px;
  margin: 24px 0px 0px 0px;
`;

export const InvoiceContainer = styled.div`
  width: 100%;
  padding: 0px;
  min-height: 408px;
  height: auto;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #e4e7ec;

  /* Shadow/md */
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  overflow-y: scroll;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const InvoiceHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #f9fafb;
  border-bottom: 1px solid #e4e7ec;
  height: 44px;
  width: 100%;
  padding: 12px 24px;
`;

export const InvoiceColumn = styled.div`
  width: ${props => props.width};
  min-width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  color: #667085;
  margin-bottom: 0px;
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`;
