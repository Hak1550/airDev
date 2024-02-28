import makeData from 'Components/CustomTable/makeData';
import CustomTable from 'Components/CustomTable';
import ArrowLeft from 'Components/Icons/ArrowLeft';
import DownloadIcon from 'Components/Icons/DownloadIcon';
import { CheckBoxContainer, MainContainer } from 'Pages/AllAssetsPage/styles';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Footer from 'Pages/AllAssetsPage/components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import tick from '../../Assets/images/tick-square.png';
import CheckboxBase from '../../Assets/images/checkboxBase.png';
import FilterOptions from './components/FilterOptions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  apiDeleteCollectionItemsRequest,
  apiDeleteCollectionRequest,
  apiGetAllCollectionsRequest,
} from 'Redux/actions/media';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Loader from 'Components/Loader';
import { InvoiceContainer } from 'Pages/BillingPage/styles';
import { download_files, parseS3URL, uuidv4 } from 'Utils/mediaUtils';
import { Delete } from '@mui/icons-material';
import Modal from 'Components/Modal';
import errorIcon from '../../Assets/icons/errorIcon.svg';
import { ModalFooter } from 'Components/CommonStyles';
import { Button } from 'react-bootstrap';

const sortByOptions = [
  {
    value: 'created',
    label: 'Date Added (Newest)',
  },
  {
    value: '-created',
    label: 'Date Added (Oldest)',
  },
  {
    value: 'modified',
    label: 'Date Modified (Newest)',
  },
  {
    value: '-modified',
    label: 'Date Modified (Oldest)',
  },
];
const MediaCollections = ({ searchText }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const media = useSelector(state => state.media);
  const history = useHistory();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordering, setOrdering] = useState('created');
  const [pageSize] = useState(10);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState({
    name: '',
    id: '',
  });

  useEffect(() => {
    if (isCheck.length !== data.length) setIsCheckAll(false);
    else setIsCheckAll(true);
  }, [isCheck, data]);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = id => {
    const checked = isCheck.includes(id);
    if (checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    } else setIsCheck([...isCheck, id]);
  };

  const handleDownload = (presigned_urls, name) => {
    console.log('pre : ', presigned_urls);
    const downloadList = presigned_urls.map(item => {
      const fileName = item.split('?')[0].split('/').pop();
      return {
        download: item,
        filename: `${name}-${fileName}`,
      };
    });
    download_files(downloadList);
  };
  const handleModalShow = (id, name) => {
    setModalShow(true);
    setSelectedCollection({ name: name, id: id });
  };
  const columns = [
    {
      Header: 'Collection Title',
      accessor: (originalRow, rowIndex) => (
        <div>
          {' '}
          {/* <CheckBoxContainer
            src={isCheck.includes(originalRow.id) ? tick : CheckboxBase}
            onClick={() => handleClick(originalRow.id)}
          /> */}
          {originalRow.name}
        </div>
      ),
      width: Math.round(window.innerWidth * 0.5),
    },
    {
      Header: 'Assets',
      accessor: (originalRow, rowIndex) => (
        <div className="shadded-column">{originalRow.assets} Assets</div>
      ),
      width: Math.round(window.innerWidth * 0.15),
    },
    {
      Header: 'Modified',
      accessor: (originalRow, rowIndex) => (
        <div className="shadded-column">
          {moment(originalRow?.modified).format('MMM DD, YYYY')} at{' '}
          {moment(originalRow?.modified).format('LT')}
        </div>
      ),
      width: Math.round(window.innerWidth * 0.25),
    },
    {
      accessor: (originalRow, rowIndex) => (
        <Row className="gx-2">
          {/* <Col
            role={'button'}
            onClick={() =>
              handleDownload(originalRow?.presigned_urls, originalRow.name)
            }
          >
            <DownloadIcon isAlt={true} />
          </Col> */}
          <Col
            role={'button'}
            onClick={() => handleModalShow(originalRow.id, originalRow.name)}
          >
            <Delete />
          </Col>
          <Col
            role="button"
            onClick={() =>
              history.push(`/media/collection-details/${originalRow.id}`)
            }
          >
            <ArrowLeft isRight={true} />
          </Col>
        </Row>
      ),
      width: Math.round(window.innerWidth * 0.1),
      id: 'action',
    },
  ];
  // console.log(JSON.stringify(initialData));

  const changePage = number => {
    if (currentPage === number) return;
    setCurrentPage(number);
  };

  useEffect(() => {
    dispatch(
      apiGetAllCollectionsRequest(
        auth.token,
        searchText,
        currentPage,
        pageSize,
        ordering,
      ),
    );
  }, []);

  useEffect(() => {
    dispatch(
      apiGetAllCollectionsRequest(
        auth.token,
        searchText,
        currentPage,
        pageSize,
        ordering,
      ),
    );
  }, [searchText, currentPage, pageSize, ordering]);

  useEffect(() => {
    if (media.allCollections) {
      setData(media.allCollections);
    }
  }, [media.allCollections]);

  const deleteClicked = () => {
    dispatch(
      apiDeleteCollectionRequest(auth.token, { id: selectedCollection.id }),
    );
    setModalShow(false);
  };
  const modalFooter = (
    <ModalFooter>
      <Button onClick={() => setModalShow(false)} variant="light">
        No
      </Button>
      <Button onClick={deleteClicked} variant="danger">
        Yes
      </Button>
    </ModalFooter>
  );

  return (
    <MainContainer>
      <FilterOptions
        isCheckAll={isCheckAll}
        isCheck={isCheck}
        handleSelectAll={handleSelectAll}
        setIsCheck={setIsCheck}
        sortByOptions={sortByOptions}
        count={data?.count}
        setOrdering={setOrdering}
      />
      {media.isLoading ? (
        <Loader />
      ) : (
        <InvoiceContainer>
          {' '}
          <CustomTable
            columns={columns}
            data={data?.results || []}
            minWidth={'800px'}
          />
          <Footer
            itemsPerPage={pageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            itemsCount={data?.count}
            changePage={changePage}
          />
        </InvoiceContainer>
      )}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        icon={errorIcon}
        title={'Delete Collection?'}
        body={`Are you sure you want to delete ${selectedCollection?.name}? Collection will be deleted but individual assets will remain untouched.`}
        footer={modalFooter}
      />
    </MainContainer>
  );
};

export default MediaCollections;
