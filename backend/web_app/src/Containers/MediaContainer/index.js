import { DoneButton } from 'Components/AddCollaboratorContent/styles';
import { BorderBottom, ModalFooter } from 'Components/CommonStyles';
import Plus from 'Components/Icons/Plus';
import SearchBar from 'Components/SearchBar';
import useQuery from 'hooks/useQuery';
import DashboardLayout from 'Layouts/DashboardLayout';
import AllAssetsPage from 'Pages/AllAssetsPage';
import AssetDetailsPage from 'Pages/AssetDetailsPage';
import CollectionDetailsPage from 'Pages/CollectionDetailsPage';
import MediaCollections from 'Pages/MediaCollections';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, S3, ObjectCannedACL } from '@aws-sdk/client-s3';
import moment from 'moment';
import {
  MainContainer,
  MediaHeader,
  NavItem,
  TopNav,
  SearchBarContainer,
} from './styles';
import { InfoCircleFill } from 'react-bootstrap-icons';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import Modal from 'Components/Modal';
import { Button } from 'react-bootstrap';
import UploadIcon from 'Components/Icons/UploadIcon';
import { useDispatch, useSelector } from 'react-redux';
import errorIcon from '../../Assets/icons/errorIcon.svg';
import {
  apiGetAllMediaRequest,
  apiGetClientsRequest,
  setMediaContentDetails,
  setSelectedOrg,
} from 'Redux/actions/media';
import Loader from 'Components/Loader';
import filename from 'Utils/filename';
import MP4Box from 'mp4box';
import { creds, generateVideoThumbnail, uuidv4 } from 'Utils/mediaUtils';
import { apiProjectGetRequest } from 'Redux/actions/project';

const MediaContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const { id } = useQuery();
  const [search, setSearch] = useState('');
  const [content, setContent] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const sideNavState = useSelector(state => state.media);
  const userInformation = useSelector(state => state.userInformation);
  const media = useSelector(state => state.media);
  const project = useSelector(state => state.project);
  const auth = useSelector(state => state.auth);
  const [fileinfo, setFileInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const onSearchChange = e => {
    setSearch(e.target.value);
  };
  const modalFooter = (
    <ModalFooter>
      <Button
        onClick={() => {
          setShowModal(true);
          setShowModalCancel(false);
        }}
        variant="light"
      >
        No
      </Button>
      <Button
        onClick={() => {
          setShowModalCancel(false);
          setShowModal(false);
          window.location.reload();
        }}
        variant="danger"
      >
        Yes
      </Button>
    </ModalFooter>
  );
  useEffect(() => {
    if (!userInformation.data) {
      const organisationData = [];
      auth?.user_information?.organisation_data.forEach(item => {
        if (
          (item.role === 1 || item.role === 2) &&
          item?.organisation.wasabi_bucket_name
        )
          organisationData.push({
            value: item?.organisation?.id,
            // label: item?.organisation?.name,
            // bucketName: item?.organisation?.wasabi_bucket_name,
            label: item?.organisation?.wasabi_bucket_name,
            // id: item?.organisation?.id,
          });
      });
      setOrgList(organisationData);
      // dispatch(setSelectedOrg(organisationData[0]));
      if (organisationData[0]?.value) {
        dispatch(apiGetAllMediaRequest(auth.token, organisationData[0]?.value));
        dispatch(apiGetClientsRequest(organisationData[0]?.value, auth.token));
      }
    } else {
      const organisationData = [];
      userInformation?.data?.organisation_data.forEach(item => {
        if (
          (item.role === 1 || item.role === 2) &&
          item?.organisation.wasabi_bucket_name
        )
          organisationData.push({
            value: item?.organisation?.id,
            // label: item?.organisation?.name,
            // bucketName: item?.organisation?.wasabi_bucket_name,
            label: item?.organisation?.wasabi_bucket_name,
            // id: item?.organisation?.id,
          });
      });
      setOrgList(organisationData);
      // dispatch(setSelectedOrg(organisationData[0]));
      if (organisationData[0]?.value) {
        dispatch(apiGetAllMediaRequest(auth.token, organisationData[0]?.value));
        dispatch(apiGetClientsRequest(organisationData[0]?.value, auth.token));
      }
    }
    dispatch(apiProjectGetRequest(auth.token));
  }, []);
  useEffect(() => {
    if (
      !sideNavState?.mediaContentDetails ||
      sideNavState?.mediaContentDetails?.status !== 'uploading'
    ) {
      dispatch(
        setMediaContentDetails({
          file: null,
          progress: 0,
          status: 'uploading',
          loaded: 0,
          totalSize: 0,
        }),
      );
    }
  }, [sideNavState]);

  useEffect(() => {
    if (fileinfo && orgList.length > 0 && !thumbnailURL) {
      const thumnailUpload = new Upload({
        client: new S3({
          region: process.env.REACT_APP_STORAGE_REGION,
          credentials: creds,
          endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
          signatureVersion: 'v4',
        }),
        params: {
          Bucket:
            media?.selectedOrg?.label ||
            (orgList.length > 0 && orgList[0]?.label),
          // Bucket: ,
          Key: `thumbnail/thumbnail-${uuidv4()}.${thumbnail.name
            .split('.')
            .pop()}`,
          Body: thumbnail,
          ACL: ObjectCannedACL.public_read,
          Permissions: [
            {
              AllowedHeaders: ['*'],
              AllowedMethods: ['PUT', 'POST', 'DELETE', 'GET'],
              AllowedOrigins: ['*'],
              ExposeHeaders: ['ETag'],
            },
          ],
        },
      });
      thumnailUpload
        .done()
        .then(data => {
          setThumbnailURL(data.Location);
          setLoading(false);
        })
        .catch(e => {
          toast.error('Something went wrong!!!');
          setLoading(false);
          setFileInfo(null);
        });
    }
  }, [fileinfo, orgList]);

  useEffect(() => {
    if (thumbnailURL) {
      setShowModal(true);
      const duration = fileinfo.timescale
        ? fileinfo.duration / fileinfo.timescale
        : fileinfo.duration;
      const codec = fileinfo?.mime?.split(' ')[1].split('=')[1] || '';
      const fileDetails = {
        fileSize: content?.size,
        height: fileinfo?.height || fileinfo?.videoTracks[0]?.video.height,
        width: fileinfo?.width || fileinfo?.videoTracks[0]?.video.width,
        duration: duration,
        codec: codec,
        dateCreated: fileinfo?.created || new Date(),
      };
      const key = `assets/${uuidv4()}.${content.name.split('.').pop()}`;
      const target = {
        Bucket:
          media?.selectedOrg?.label ||
          (orgList.length > 0 && orgList[0]?.label),
        // Key: content.name,
        Key: key,
        Body: content,
        Permissions: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['PUT', 'POST', 'DELETE', 'GET'],
            AllowedOrigins: ['*'],
            ExposeHeaders: ['ETag'],
          },
        ],
        Metadata: {
          key: key,
          fileName: content?.name,
          title: '',
          description: '',
          notes: '',
          projects: JSON.stringify([]),
          collections: JSON.stringify([]),
          tags: JSON.stringify([]),
          thumbnail: thumbnailURL,
          fileinfo: JSON.stringify(fileDetails),
          dateAdded: moment.utc(new Date()).format(),
        },
      };
      try {
        const parallelUploads3 = new Upload({
          client: new S3Client({
            region: process.env.REACT_APP_STORAGE_REGION,
            credentials: creds,
            endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
            signatureVersion: 'v4',
          }),
          leavePartsOnError: false, // optional manually handle dropped parts
          params: target,
          queueSize: 1,
          // partSize: 3 * 1024 * 1024,
        });
        dispatch(
          setMediaContentDetails({
            file: parallelUploads3,
            progress: 0,
            status: 'uploading',
            loaded: parallelUploads3.bytesUploadedSoFar / 1000000,
            totalSize: parallelUploads3.totalBytes / 1000000,
          }),
        );
        parallelUploads3.on('httpUploadProgress', progress => {
          const percentLoaded = Math.floor(
            (parallelUploads3.bytesUploadedSoFar /
              parallelUploads3.totalBytes) *
              100,
          );
          dispatch(
            setMediaContentDetails({
              file: parallelUploads3,
              progress: percentLoaded,
              status: 'uploading',
              loaded: parallelUploads3.bytesUploadedSoFar / 1000000,
              totalSize: parallelUploads3.totalBytes / 1000000,
            }),
          );
        });
        parallelUploads3
          .done()
          .then(data => {
            setShowModal(false);
            toast.success('Content uploaded successfully');
            dispatch(setMediaContentDetails(null));
            setThumbnailURL(null);
            setFileInfo(null);
          })
          .catch(e => {
            toast.error('Something went wrong!!!');
            setShowModal(false);
            setLoading(false);
            dispatch(setMediaContentDetails(null));
            setThumbnailURL(null);
            setFileInfo(null);
          });
      } catch (e) {
        setShowModal(false);
        toast.error('Something went wrong!!!');
        setLoading(false);
        dispatch(setMediaContentDetails(null));
        setThumbnailURL(null);
        setFileInfo(null);
      }
    }
  }, [thumbnailURL]);

  const handleAddContent = async e => {
    const file = e.target.files[0];
    if (file.type.includes('video')) {
      setLoading(true);
      setContent(file);
      const thumb = await generateVideoThumbnail(e.target.files[0]);
      setThumbnail(thumb);
      if (e.target.files[0].size <= 209715200) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.addEventListener('load', e => {
          const buffer = fileReader.result;
          buffer.fileStart = 0;
          var mp4boxfile = MP4Box.createFile();
          // mp4boxfile.onError = console.error;
          mp4boxfile.onError = function (error) {
            console.log('err : ', error);
          };
          mp4boxfile.onReady = function (info) {
            setFileInfo(info);
          };
          mp4boxfile.appendBuffer(fileReader.result);
          mp4boxfile.flush();
        });
      } else {
        var video = document.createElement('video');

        video.onloadedmetadata = () => {
          const fileInfoData = {
            duration: video.duration,
            height: video.videoHeight,
            width: video.videoWidth,
          };
          setFileInfo(fileInfoData);
        };
        video.onerror = () => {
          alert('Error!');
        };
        video.src = URL.createObjectURL(file);
      }
    } else {
      toast.error('Invalid file format. Please add video content only.');
    }
  };
  return (
    <DashboardLayout>
      {!sideNavState?.mediaContentDetails || userInformation?.isLoading ? (
        <Loader />
      ) : (
        <MainContainer>
          {history.location.pathname.includes('asset-details') ? null : (
            <>
              <MediaHeader>
                <TopNav>
                  <NavItem
                    to="/media/assets"
                    selected={history.location.pathname.includes('assets')}
                  >
                    All Assests
                  </NavItem>
                  <NavItem
                    to="/media/collections"
                    selected={history.location.pathname.includes('collection')}
                  >
                    Collections
                  </NavItem>
                </TopNav>
                <SearchBarContainer>
                  <SearchBar
                    onChange={onSearchChange}
                    value={search}
                    placeholder={
                      history.location.pathname.includes('collection')
                        ? 'Search Collections'
                        : 'Search Assets'
                    }
                  />
                </SearchBarContainer>
                {sideNavState?.mediaContentDetails?.file &&
                sideNavState.mediaContentDetails.progress < 100 ? (
                  <p
                    onClick={() => setShowModal(true)}
                    style={{ color: '#7f56d9', cursor: 'progress' }}
                  >
                    Uploading... {sideNavState.mediaContentDetails.progress}%
                  </p>
                ) : !history.location.pathname.includes('collection') ? (
                  <DoneButton
                    className="btn btn-primary btn-sm"
                    style={{ minWidth: '145px' }}
                    onClick={() => hiddenFileInput.current.click()}
                    disabled={isLoading || orgList.length <= 0}
                  >
                    {isLoading ? (
                      <p style={{ cursor: 'progress' }}>Loading...</p>
                    ) : (
                      <>
                        <Plus stroke="white" /> Add Content{' '}
                      </>
                    )}
                    <input
                      type="file"
                      name="profile_image"
                      className="form-control"
                      onChange={handleAddContent}
                      ref={hiddenFileInput}
                      style={{ display: 'none' }}
                      accept="video/*"
                    />
                  </DoneButton>
                ) : (
                  <div></div>
                )}
              </MediaHeader>
              <BorderBottom />
            </>
          )}

          <Switch>
            <Route path={'/'} exact>
              <AllAssetsPage
                orgList={orgList}
                searchText={search}
                projects={project?.projectList}
              />
            </Route>
            <Route path={'/media/assets'} exact>
              <AllAssetsPage
                orgList={orgList}
                searchText={search}
                projects={project?.projectList}
              />
            </Route>
            <Route path={'/media/asset-details/:id'} exact>
              <AssetDetailsPage projects={project?.projectList} />
            </Route>
            <Route path={'/media/collection-details/:id'} exact>
              <CollectionDetailsPage searchText={search} />
            </Route>
            <Route path={'/media/collections'} exact>
              <MediaCollections searchText={search} />
            </Route>
          </Switch>
        </MainContainer>
      )}

      {sideNavState?.mediaContentDetails && (
        <Modal
          show={showModal}
          // onHide={() => setShowModal(false)}
          // icon={<InfoCircleFill />}
          body={
            <div
              className="d-flex align-items-center"
              style={{
                border: '1px solid #E4E7EC',
                borderRadius: '8px',
                padding: '8px',
                columnGap: '8px',
                margin: '12px 0px',
                maxWidth: '380px',
              }}
            >
              <UploadIcon />
              <p>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#101828',
                  }}
                >
                  {filename(
                    sideNavState?.mediaContentDetails?.file?.params?.Metadata
                      ?.fileName,
                    20,
                  )}
                </span>{' '}
                <br />
                Uploaded {sideNavState?.mediaContentDetails?.loaded.toFixed(2)}
                MB of {sideNavState?.mediaContentDetails?.totalSize.toFixed(2)}
                MB
              </p>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={sideNavState?.mediaContentDetails?.progress}
                  maxValue={100}
                  text={`${sideNavState?.mediaContentDetails?.progress}%`}
                  styles={buildStyles({
                    pathTransitionDuration: 0.15,
                    pathColor: '#7f56d9',
                  })}
                  strokeWidth={8}
                />
              </div>
            </div>
          }
          footer={
            <ModalFooter>
              <Button onClick={() => setShowModal(false)} variant="light">
                Hide
              </Button>
              <Button
                onClick={() => {
                  setShowModalCancel(true);
                  setShowModal(false);
                }}
                variant="danger"
              >
                Cancel
              </Button>
            </ModalFooter>
          }
        />
      )}
      <Modal
        show={showModalCancel}
        onHide={() => setShowModal(false)}
        icon={errorIcon}
        title={'Cancel File Upload'}
        body={'Are you sure you want to cancel this file uploading?'}
        footer={modalFooter}
      />
    </DashboardLayout>
  );
};

export default MediaContainer;
