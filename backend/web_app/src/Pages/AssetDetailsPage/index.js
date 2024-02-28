import {
  CopyObjectCommand,
  ObjectCannedACL,
  PutObjectAclCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3 } from 'aws-sdk';
import AddCollaboratorContent from 'Components/AddCollaboratorContent';
import AddtoCollectionContent from 'Components/AddtoCollectionContent';
import AddtoProjectContent from 'Components/AddtoProjectContent';
import X from 'Components/Icons/X';
import Loader from 'Components/Loader';
import useQuery from 'hooks/useQuery';
import { RightNavContainer } from 'Layouts/ProjectLayout/styles';
import { SideBarContent } from 'Layouts/ShootLayout/styles';
import PaymentDetailsForm from 'Pages/BillingPage/components/PaymentDetailsForm';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  apiGetAllCollectionsRequest,
  apiGetClientsRequest,
  apiGetMediaDetailsRequest,
  setMediaContentDetails,
} from 'Redux/actions/media';
import { creds, handleCopyObjectToWasabi } from 'Utils/mediaUtils';
import parseDjangoError from 'Utils/parseDjangoError';
import Form from './components/Form';
import VideoPlayer from './components/VideoPlayer';
import { CloseIcon, MainContainer, NavTitle } from './styles';

const AssetDetailsPage = () => {
  const { id } = useParams();
  const params = useQuery();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const media = useSelector(state => state.media);
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null);
  const projectState = useSelector(state => state.project);
  const onRightNavClose = () => {
    history.push('/media/assets');
  };

  useEffect(() => {
    if (id) {
      // dispatch(setMediaContentDetails(null));
      const key = params.get('key').split('/')[1];
      dispatch(apiGetMediaDetailsRequest(id, auth.token, key));
      dispatch(apiGetAllCollectionsRequest(auth.token));
    }
  }, [id]);

  const handleCopyObject = (data, usageRights) => {
    // Set the bucket parameters.
    console.log('data : ', usageRights);
    const param = {
      Bucket: media.mediaDetails?.result?.bucket_name,
      CopySource: `/${media.mediaDetails?.result?.bucket_name}/${params.get(
        'key',
      )}`,
      Key: params.get('key'),
      Metadata: data,
      MetadataDirective: 'REPLACE',
    };

    // Create the Amazon S3 bucket.
    const run = async () => {
      try {
        setLoader(true);
        const data = await new S3Client({
          region: process.env.REACT_APP_STORAGE_REGION,
          credentials: creds,
          endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
          signatureVersion: 'v4',
        }).send(new CopyObjectCommand(param));
        console.log('Success', data);
        toast.success(`Asset details updated successfully`);
        const grants = [
          media.mediaDetails?.result?.object_acl?.Grants.find(
            item => item.Grantee.Type !== 'Group',
          ),
        ];

        if (usageRights === '1') {
          grants.push({
            Grantee: {
              Type: 'Group',
              URI: 'http://acs.amazonaws.com/groups/global/AllUsers',
            },
            Permission: 'READ',
          });
        }
        console.log('gara : ', grants, ' usa : ', usageRights);
        const aclParams = {
          Bucket: media.mediaDetails?.result?.bucket_name,
          Key: params.get('key'),
          AccessControlPolicy: {
            Owner: media.mediaDetails?.result?.object_acl?.Owner,
            Grants: grants,
          },
        };
        await new S3Client({
          region: process.env.REACT_APP_STORAGE_REGION,
          credentials: creds,
          endpoint: `https://s3.${process.env.REACT_APP_STORAGE_REGION}.wasabisys.com/`,
          signatureVersion: 'v4',
        }).send(new PutObjectAclCommand(aclParams));
        dispatch(
          apiGetMediaDetailsRequest(
            id,
            auth.token,
            params.get('key').split('/')[1],
          ),
        );
        dispatch(apiGetClientsRequest(id, auth.token));
        setLoader(false);
      } catch (err) {
        console.log('Error', err);
        toast.error(parseDjangoError(err));
        setLoader(false);
      }
    };
    run();
  };

  const handleCollectionsObject = async (src, dest, key, data = null) => {
    // Set the bucket parameters.
    setLoader(true);
    const s3Params = {
      Bucket: dest,
      CopySource: `/${src}/${key}`,
      Key: key,
    };

    if (data) {
      s3Params['Metadata'] = data;
      s3Params['MetadataDirective'] = 'REPLACE';
    }
    // Create the Amazon S3 bucket.
    await handleCopyObjectToWasabi(s3Params);
    const item = params.get('key').split('/')[1];
    dispatch(apiGetMediaDetailsRequest(id, auth.token, item));
    setLoader(false);
  };

  return (
    <MainContainer>
      <VideoPlayer
        url={media.mediaDetails?.result?.url}
        thumbnailURL={media.mediaDetails?.result?.metadata?.Metadata?.thumbnail}
        bucketName={media.mediaDetails?.result?.bucket_name}
        data={media.mediaDetails?.result?.metadata?.Metadata}
        assetId={id}
        assetKey={params.get('key').split('/')[1]}
        token={auth.token}
      />

      <RightNavContainer>
        {media.mediaDetails && !loader ? (
          <>
            {!sidebarContent && (
              <>
                <NavTitle>
                  Asset Details
                  <CloseIcon onClick={onRightNavClose}>
                    <X />
                  </CloseIcon>
                </NavTitle>
                <SideBarContent>
                  <Form
                    data={media.mediaDetails?.result?.metadata?.Metadata}
                    fileInfo={
                      media.mediaDetails?.result?.metadata?.Metadata &&
                      JSON.parse(
                        media.mediaDetails?.result?.metadata?.Metadata.fileinfo,
                      )
                    }
                    objectAcl={media.mediaDetails?.result?.object_acl?.Grants}
                    collectionList={media?.allCollections?.results || []}
                    handleCopyObject={handleCopyObject}
                    onRightNavClose={onRightNavClose}
                    setSidebarContent={setSidebarContent}
                    organizationId={id}
                    bucketName={media.mediaDetails?.result?.bucket_name}
                  />
                </SideBarContent>
              </>
            )}
            {sidebarContent === 'project' && (
              <>
                <NavTitle>
                  Assign Projects
                  <CloseIcon onClick={() => setSidebarContent(null)}>
                    <X />
                  </CloseIcon>
                </NavTitle>
                <SideBarContent>
                  <AddtoProjectContent
                    data={projectState?.projectList || []}
                    isLoading={media.isLoading}
                    onRightNavClose={() => setSidebarContent(null)}
                    keys={[params.get('key')]}
                    metadata={[media.mediaDetails?.result] || []}
                    selectedOrg={{
                      value: media.mediaDetails?.result?.bucket_name,
                      label: media.mediaDetails?.result?.bucket_name,
                    }}
                    handleCopyObject={handleCollectionsObject}
                  />
                </SideBarContent>
              </>
            )}
            {sidebarContent === 'collections' && (
              <>
                <NavTitle>
                  Add to Collections
                  <CloseIcon onClick={() => setSidebarContent(null)}>
                    <X />
                  </CloseIcon>
                </NavTitle>
                <SideBarContent>
                  <AddtoCollectionContent
                    data={media?.allCollections?.results}
                    isLoading={media.isLoading}
                    onRightNavClose={() => setSidebarContent(null)}
                    keys={[params.get('key')]}
                    metadata={[media.mediaDetails?.result] || []}
                    selectedOrg={{
                      value: id,
                      label: media.mediaDetails?.result?.bucket_name,
                    }}
                    handleCopyObject={handleCollectionsObject}
                  />
                </SideBarContent>
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </RightNavContainer>
    </MainContainer>
  );
};

export default AssetDetailsPage;
