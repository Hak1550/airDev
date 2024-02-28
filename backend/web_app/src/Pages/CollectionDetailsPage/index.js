import React from 'react';
import { MainContainer } from './styles';
import { useState } from 'react';
import Footer from './components/Footer';
import { useEffect } from 'react';
import FilterOptions from './components/FilterOptions';
import AssetGridView from './components/AssetGridView';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiDeleteCollectionItemsRequest,
  apiGetCollectionByIdRequest,
} from 'Redux/actions/media';
import { useParams } from 'react-router-dom';
import Loader from 'Components/Loader';
import { download_files } from 'Utils/mediaUtils';
import moment from 'moment';

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

const CollectionDetailsPage = ({ searchText }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const media = useSelector(state => state.media);
  const [initialState, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [filters, setFilters] = useState({
    ordering: 'created',
    created__lte: null,
    created__gte: null,
  });
  const { id } = useParams();

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(media?.collectionData?.result?.results.map(li => li.id));
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
  console.log('is : ', isCheck);
  var dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const onDateChange = (sDate, eDate, isClear = false) => {
    // const shootStartDate = moment(startDate, ).toLocaleDateString('sv');
    // const shootEndDate = new Date(endDate).toLocaleDateString('sv');
    if (isClear) {
      setState([
        {
          startDate: moment().toDate(),
          endDate: moment().toDate(),
          key: 'selection',
        },
      ]);
      setFilters({
        ...filters,
        created__gte: null,
        created__lte: null,
      });
    } else {
      setFilters({
        ...filters,
        created__gte: moment(sDate, 'MM/DD/YYYY').format('YYYY-MM-DDTHH:mm:ss'),
        created__lte: moment(eDate, 'MM/DD/YYYY').format('YYYY-MM-DDTHH:mm:ss'),
      });
    }
    // console.log(shootStartDate, shootEndDate);
  };
  const handleDownload = () => {
    const downloadList = isCheck.map(item => {
      const findData = media?.collectionData?.result?.results.find(
        coll => coll.id === item,
      );
      return {
        download: media?.collectionData?.collection?.presigned_urls.find(url =>
          url.includes(findData.key),
        ),
        filename: findData.key.split('/').pop(),
      };
    });
    download_files(downloadList);
    setIsCheck([]);
  };
  const handleDeleteItems = item => {
    if (item?.key) {
      dispatch(
        apiDeleteCollectionItemsRequest(auth.token, {
          collection: id,
          keys: [item.key],
        }),
      );
    } else {
      const keys = media?.collectionData?.result?.results.map(asset => {
        if (isCheck.includes(asset.id)) {
          return asset.key;
        }
      });
      dispatch(
        apiDeleteCollectionItemsRequest(auth.token, {
          collection: id,
          keys: keys,
        }),
      );
    }
    setIsCheck([]);
  };
  const changePage = number => {
    if (currentPage === number) return;
    setCurrentPage(number);
  };
  const handleFilters = (value, name) => {
    setFilters({
      ...filters,
      [name]: value === 'All' ? '' : value,
    });
  };
  useEffect(() => {
    if (
      isCheck.length !== media?.collectionData?.result?.count ||
      media?.collectionData?.result?.count === 0
    )
      setIsCheckAll(false);
    else setIsCheckAll(true);
  }, [isCheck]);

  useEffect(() => {
    setIsCheckAll(false);
    setIsCheck([]);
    if (id && id !== 'new') {
      dispatch(
        apiGetCollectionByIdRequest(
          id,
          auth.token,
          searchText,
          filters.ordering,
          filters.created__lte,
          filters.created__gte,
          currentPage,
          pageSize,
        ),
      );
    }
  }, [id]);

  useEffect(() => {
    setIsCheckAll(false);
    setIsCheck([]);
    dispatch(
      apiGetCollectionByIdRequest(
        id,
        auth.token,
        searchText,
        filters.ordering,
        filters.created__lte,
        filters.created__gte,
        currentPage,
        pageSize,
      ),
    );
  }, [searchText, filters, currentPage]);

  console.log('filters : ', filters);

  return (
    <MainContainer>
      <FilterOptions
        isCheckAll={isCheckAll}
        dateOptions={dateOptions}
        onDateChange={onDateChange}
        initialState={initialState}
        setState={setState}
        isCheck={isCheck}
        handleSelectAll={handleSelectAll}
        setIsCheck={setIsCheck}
        sortByOptions={sortByOptions}
        handleFilters={handleFilters}
        collectionDetails={
          id === 'new' ? null : media?.collectionData?.collection
        }
        count={media?.collectionData?.result?.count || 0}
        handleDeleteItems={handleDeleteItems}
        handleDownload={handleDownload}
      />
      {!media?.isLoading ? (
        media?.collectionData?.result?.count > 0 && id !== 'new' ? (
          <>
            <AssetGridView
              handleClick={handleClick}
              Assets={media?.collectionData?.result?.results || []}
              isCheck={isCheck}
              handleDeleteItems={handleDeleteItems}
            />
            <Footer
              itemsPerPage={pageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              itemsCount={media?.collectionData?.result?.count}
              changePage={changePage}
            />
          </>
        ) : (
          <div
            className="text-center w-100 d-flex justify-content-center align-items-center"
            style={{ minHeight: '300px' }}
          >
            No Media Found. <br />
          </div>
        )
      ) : (
        <Loader />
      )}
    </MainContainer>
  );
};

export default CollectionDetailsPage;
