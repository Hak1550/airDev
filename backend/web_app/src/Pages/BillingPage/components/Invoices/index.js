import CustomTable from 'Components/CustomTable';
import FileIcon from 'Components/Icons/FileIcon';
import moment from 'moment';
import { InvoiceContainer } from 'Pages/BillingPage/styles';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { apiGetAllInvoices } from 'Redux/actions/payment';
import Badge from 'Components/Badge';
const TickIcon = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 1L3.5 6.5L1 4"
      stroke="#12B76A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
      stroke="#D92D20"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Invoices = ({ invoiceData }) => {
  const columns = [
    {
      Header: 'Invoice',
      accessor: (originalRow, rowIndex) => (
        <div>
          <FileIcon /> {originalRow.invoice_id}
        </div>
      ),
      width: Math.round(window.innerWidth * 0.5),
    },
    {
      Header: 'Billing Date',
      accessor: (originalRow, rowIndex) => (
        <div className="shadded-column">
          {moment(originalRow.created).format('MMM DD, YYYY')}
        </div>
      ),
      width: Math.round(window.innerWidth * 0.15),
    },
    {
      Header: 'Status',
      accessor: (originalRow, rowIndex) =>
        originalRow.status === 2 ? (
          <Badge
            bgColor={'#ECFDF3'}
            color="#027A48"
            title={'Paid'}
            icon={<TickIcon />}
          />
        ) : (
          <Badge
            bgColor={'#FEE4E2'}
            color="#D92D20"
            title={'Not Paid'}
            icon={<ErrorIcon />}
          />
        ),
      width: Math.round(window.innerWidth * 0.1),
    },
    {
      Header: 'Amount',
      accessor: (originalRow, rowIndex) => (
        <div className="shadded-column">
          USD ${(originalRow.amount / 100).toFixed(2)}
        </div>
      ),
      width: Math.round(window.innerWidth * 0.15),
    },
    {
      accessor: (originalRow, rowIndex) => (
        <Row className="gx-2">
          <Col>
            <a
              href={originalRow.invoice_url}
              target="_blank"
              rel="noreferrer"
              className="fw-semibold btn"
              style={{ color: '#6941C6' }}
            >
              Download
            </a>
          </Col>
        </Row>
      ),
      width: Math.round(window.innerWidth * 0.1),
      id: 'action',
    },
  ];
  return (
    <InvoiceContainer>
      {/* <InvoiceHeader /> */}
      <CustomTable
        columns={columns}
        data={invoiceData || []}
        isSortable={true}
      />
    </InvoiceContainer>
  );
};

export default Invoices;
