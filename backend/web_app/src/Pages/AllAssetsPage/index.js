import React from 'react';
import { MainContainer } from './styles';
import { useState } from 'react';
import Footer from './components/Footer';
import { useEffect } from 'react';
import FilterOptions from './components/FilterOptions';
import AssetGridView from './components/AssetGridView';
import {
  CloseIcon,
  NavTitle,
  RightNavContainer,
  SearchBarContainer,
  SideBarContent,
} from 'Layouts/ProjectLayout/styles';
import SearchBar from 'Components/SearchBar';
import AddtoCollectionContent from 'Components/AddtoCollectionContent';
import X from 'Components/Icons/X';
import { useDispatch } from 'react-redux';
import {
  apiDeleteMediaRequest,
  apiGetAllCollectionsRequest,
  apiGetAllMediaRequest,
  apiGetClientsRequest,
  setSelectedBucket,
} from 'Redux/actions/media';
import { useSelector } from 'react-redux';
import { SideNavPageType } from 'Containers/MediaContainer/constant';
import MoveCollectionContent from 'Components/MoveCollectionContent';
import Loader from 'Components/Loader';
import _ from 'loadsh';
import { download_files, handleCopyObjectToWasabi } from 'Utils/mediaUtils';
import moment from 'moment';
import AddtoTagsContent from 'Components/AddtoTagsContent';

const sortByOptions = [
  {
    value: '1',
    label: 'Date Added (Newest)',
  },
  {
    value: '2',
    label: 'Date Added (Oldest)',
  },
  {
    value: '3',
    label: 'Date Modified (Newest)',
  },
  {
    value: '4',
    label: 'Date Modified (Oldest)',
  },
];

const AllAssetsPage = ({ orgList, searchText = '', projects = [] }) => {
  const [initialState, setState] = useState([
    {
      startDate: moment().toDate(),
      endDate: moment().toDate(),
      key: 'selection',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [sideNavPage, setSideNavPage] = useState(null);
  const [rightNavTitle, setRightNavTitle] = useState('');
  const [search, setSearch] = useState('');
  const [showRightNav, setShowRightNav] = useState(false);
  const [urls, setUrls] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(orgList[0] || null);
  const [loader, setloader] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().startOf('month').toDate(),
  );
  const [endDate, setEndDate] = useState(moment().toDate());
  const [filters, setFilters] = useState({
    clients: '',
    projects: '',
    sortBy: '1',
    dateRange: false,
  });
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const media = useSelector(state => state.media);
  const handleFilters = (value, name) => {
    setFilters({
      ...filters,
      [name]: value === 'All' ? '' : value,
    });
  };

  let filteredItems = media?.allMediaList?.result?.data.filter(o =>
    _.some(
      o.metadata?.Metadata,
      v =>
        _.toLower(v).indexOf(searchText.toLowerCase()) > -1 &&
        _.toLower(v).indexOf(filters.clients.toLowerCase()) > -1 &&
        _.toLower(v).indexOf(filters.projects.toLowerCase()) > -1,
    ),
  );
  if (filters.dateRange) {
    filteredItems = filteredItems?.filter(item => {
      const dateAdded = moment(
        item?.metadata?.Metadata?.dateadded,
        'YYYY-MM-DD',
      ).toDate();
      return dateAdded >= startDate && dateAdded <= endDate;
    });
  }
  filteredItems = filteredItems?.sort((a, b) => {
    if (filters.sortBy === '2') {
      return (
        moment(a.metadata?.Metadata?.dateadded, 'YYYY-MM-DD').toDate() -
        moment(b.metadata?.Metadata?.dateadded, 'YYYY-MM-DD').toDate()
      );
    } else if (filters.sortBy === '3') {
      return (
        new Date(b.metadata?.LastModified) - new Date(a.metadata?.LastModified)
      );
    } else if (filters.sortBy === '4') {
      return (
        new Date(a.metadata?.LastModified) - new Date(b.metadata?.LastModified)
      );
    } else
      return (
        moment(b.metadata?.Metadata?.dateadded, 'YYYY-MM-DD').toDate() -
        moment(a.metadata?.Metadata?.dateadded, 'YYYY-MM-DD').toDate()
      );
  });

  // Set the number of items per page
  const itemsPerPage = 20;

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the items array to only include the items on the current page
  filteredItems = filteredItems?.slice(startIndex, endIndex) || [];

  const handleMediaLocation = selectedOptions => {
    setSelectedOrg(selectedOptions);
    setFilters({ clients: '', projects: '', date: null, dateRange: null });
    dispatch(setSelectedBucket(selectedOptions));
    setIsCheck([]);
  };

  const handleCopyObject = (src, dest, key, data = null) => {
    // Set the bucket parameters.
    const params = {
      Bucket: dest,
      CopySource: `/${src}/${key}`,
      Key: key,
    };

    if (data) {
      params['Metadata'] = data;
      params['MetadataDirective'] = 'REPLACE';
    }
    // Create the Amazon S3 bucket.
    handleCopyObjectToWasabi(params);
    setIsCheck([]);
    // const run = async () => {
    //   try {
    //     await new S3Client({
    //       region: process.env.REACT_APP_STORAGE_REGION,
    //       credentials: creds,
    //       endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
    //       signatureVersion: 'v4',
    //     }).send(new CopyObjectCommand(params));
    //     setloader(false);
    //     toast.success(`${key} moved from ${src} to ${dest}`);
    //   } catch (err) {
    //     console.log('Error', err);
    //     setloader(false);
    //     toast.error(parseDjangoError(err));
    //   }
    // };
    // run();
  };
  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(filteredItems.map(li => li.metadata?.Metadata.key));
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

  const handleDelete = key => {
    if (key) {
      dispatch(
        apiDeleteMediaRequest(auth.token, selectedOrg.value, { keys: [key] }),
      );
    } else
      dispatch(
        apiDeleteMediaRequest(auth.token, selectedOrg.value, { keys: isCheck }),
      );

    setIsCheck([]);
  };

  const handleDownload = () => {
    const downloadList = filteredItems.map(item => {
      return {
        download: item.url,
        filename: item.metadata?.Metadata.filename,
      };
    });
    download_files(downloadList);
    // downloadList.forEach(function (e) {
    //   fetch(e.download)
    //     .then(res => res.blob())
    //     .then(blob => {
    //       FileSaver.saveAs(blob, e.filename);
    //     });
    // });
  };

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
      setStartDate(moment().toDate());
      setEndDate(moment().toDate());
      setFilters({
        ...filters,
        dateRange: false,
      });
    } else {
      setStartDate(sDate);
      setEndDate(eDate);
      setFilters({
        ...filters,
        dateRange: true,
      });
    }
    // console.log(shootStartDate, shootEndDate);
  };

  const handleSideNavPage = (type, key) => {
    setShowRightNav(true);
    setSideNavPage(type);
    setRightNavTitle(type);
    setSearch('');
    if (!key) {
      const tempUrls = isCheck.map(item => {
        const assetData = media?.allMediaList?.result?.data.find(
          asset => asset.metadata?.Metadata.key === item,
        );
        return assetData?.metadata?.Metadata?.key;
      });
      setUrls(tempUrls);
    } else setUrls([key]);
  };
  const changePage = number => {
    if (currentPage === number) return;
    setCurrentPage(number);
    setIsCheck([]);
  };
  const onRightNavClose = () => {
    setShowRightNav(false);
    setSearch('');
  };

  useEffect(() => {
    dispatch(apiGetAllCollectionsRequest(auth.token, ''));
  }, []);

  useEffect(() => {
    if (selectedOrg && selectedOrg?.value) {
      dispatch(apiGetAllMediaRequest(auth.token, selectedOrg?.value));
      dispatch(apiGetClientsRequest(selectedOrg?.value, auth.token));
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (isCheck.length !== filteredItems.length || filteredItems.length === 0)
      setIsCheckAll(false);
    else setIsCheckAll(true);
  }, [isCheck]);

  const RightSideNavPage = () => {
    // const members = selectProjectDetails?.members;
    if (sideNavPage === SideNavPageType.ADD_TO_COLLECTION) {
      return (
        <AddtoCollectionContent
          data={media?.allCollections?.results.filter(
            item => item.name.includes(search.toLowerCase()) || [],
          )}
          isLoading={media.isLoading}
          onRightNavClose={onRightNavClose}
          keys={urls}
          metadata={filteredItems || []}
          selectedOrg={selectedOrg}
          handleCopyObject={handleCopyObject}
        />
      );
    }
    if (sideNavPage === SideNavPageType.ADD_TAGS) {
      return (
        <AddtoTagsContent
          isLoading={media.isLoading}
          onRightNavClose={onRightNavClose}
          keys={urls}
          metadata={filteredItems || []}
          selectedOrg={selectedOrg}
          handleCopyObject={handleCopyObject}
        />
      );
    }
    if (sideNavPage === SideNavPageType.MOVE_LOCATIONS) {
      return (
        <MoveCollectionContent
          data={
            orgList.filter(
              item =>
                item != selectedOrg &&
                item.label.toLowerCase().includes(search.toLowerCase()),
            ) || []
          }
          isLoading={media.isLoading}
          onRightNavClose={onRightNavClose}
          keys={urls}
          srcBucket={selectedOrg.label}
          handleCopyObject={handleCopyObject}
        />
      );
    }
  };
  const onSearchChange = e => setSearch(e.target.value);

  return media.isLoading || loader ? (
    <Loader />
  ) : (
    <MainContainer>
      {orgList?.length > 0 && (
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
          handleSideNavPage={handleSideNavPage}
          orgList={orgList}
          handleDelete={handleDelete}
          handleMediaLocation={handleMediaLocation}
          selectedOrg={selectedOrg}
          totalAssets={media?.allMediaList?.result?.data?.length || 0}
          handleDownload={handleDownload}
          projects={[{ id: '', name: 'All' }].concat(projects)}
          clientList={['All'].concat(media?.clientList?.result)}
          handleFilters={handleFilters}
        />
      )}
      {filteredItems?.length > 0 ? (
        <AssetGridView
          handleClick={handleClick}
          Assets={filteredItems || []}
          isCheck={isCheck}
          handleSideNavPage={handleSideNavPage}
          handleDelete={handleDelete}
          selectedOrg={selectedOrg}
        />
      ) : (
        <div
          className="text-center w-100 d-flex justify-content-center align-items-center"
          style={{ minHeight: '300px' }}
        >
          No Media Available. <br />
          Click on the `Add Content` button to upload new media.{' '}
        </div>
      )}
      <Footer
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        itemsCount={media?.allMediaList?.result?.data?.length || 0}
        changePage={changePage}
      />
      {showRightNav && (
        <RightNavContainer style={{ position: 'fixed', top: '0', right: '0' }}>
          <CloseIcon onClick={onRightNavClose}>
            <X />
          </CloseIcon>

          <NavTitle>{rightNavTitle}</NavTitle>
          {sideNavPage !== SideNavPageType.ADD_TAGS && (
            <SearchBarContainer>
              <SearchBar onChange={onSearchChange} value={search} />
            </SearchBarContainer>
          )}
          <SideBarContent>
            <RightSideNavPage />
          </SideBarContent>
        </RightNavContainer>
      )}
    </MainContainer>
  );
};

export default AllAssetsPage;
