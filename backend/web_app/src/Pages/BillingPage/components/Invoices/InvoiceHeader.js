import { InvoiceColumn, InvoiceHeaderDiv } from 'Pages/BillingPage/styles';

const InvoiceHeader = () => (
  <InvoiceHeaderDiv>
    <InvoiceColumn width="60%">Invoice</InvoiceColumn>
    <InvoiceColumn width="10%">Billing date</InvoiceColumn>
    <InvoiceColumn width="10%">Status</InvoiceColumn>
    <InvoiceColumn width="10%">Amount</InvoiceColumn>
    <InvoiceColumn width="10%"></InvoiceColumn>
  </InvoiceHeaderDiv>
);

export default InvoiceHeader;
