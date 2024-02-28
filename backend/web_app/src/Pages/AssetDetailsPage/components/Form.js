import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { OutlinedButton } from 'Components/IconButton/styles';
import {
  AddCrewContentContainer,
  DoneButton,
  NavFooter,
} from 'Components/AddCollaboratorContent/styles';
import { AddGearFormContainer } from 'Components/AddExternalLinks/styles';
import { BorderBottom } from 'Components/CommonStyles';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Badge from 'Components/Badge';
import X from './X';
import { useEffect } from 'react';
import { formatFileSize, formatTime } from 'Utils/mediaUtils';
import { FormDescription } from 'Components/Forms/styles';
import { useSelector } from 'react-redux';
import CustomSelect from 'Components/CustomSelect';
import moment from 'moment';
import { Clear } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {
  apiAddCollectionItemsRequest,
  apiAddCollectionRequest,
  apiDeleteCollectionItemsRequest,
} from 'Redux/actions/media';
import { appConfig } from 'Config/app';

const Form = ({
  data,
  fileInfo,
  handleCopyObject,
  onRightNavClose,
  objectAcl,
  setSidebarContent,
  collectionList,
  organizationId,
  bucketName,
}) => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState(new Set());
  // const [collections, setCollections] = useState(new Set());
  const [collections, setCollections] = useState(null);
  // const [deletedCollections, setDeletedCollections] = useState(new Set());
  const [tags, setTags] = useState(new Set());
  const media = useSelector(state => state.media);
  const auth = useSelector(state => state.auth);
  console.log('delte : ', collections);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  console.log('Get Value : ', getValues('collections'));

  const addNewCollection = async newCollection => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${auth.token}`,
      },
      body: JSON.stringify(newCollection),
    };
    const response = await fetch(
      appConfig.API_BASE_URL + `/api/v1/organisation/collection/`,
      requestOptions,
    );
    const data = await response.json();
    return data;
  };
  const onFormSubmit = () => {
    handleSubmit(async updatedData => {
      console.log('update : ', updatedData);
      let updatedCollections = updatedData?.collections.map(item => ({
        id: item.value,
        name: item.label,
      }));
      console.log('updatedCollections : ', updatedCollections);
      console.log('updatedCollections : ', JSON.stringify(updatedCollections));
      for (const item of updatedData?.collections) {
        if (item?.__isNew__) {
          const res = await addNewCollection({
            organisation: organizationId,
            name: item.label,
          });
          console.log('res : ', res);
          if (res) {
            updatedCollections = updatedCollections.filter(
              col => col.id !== item.value,
            );
            updatedCollections.push({
              id: res.id,
              name: res.name,
            });
          }
          console.log('finas : ', updatedCollections);
          // dispatch(
          //   apiAddCollectionRequest(
          //     {
          //       organisation: organizationId,
          //       name: item.label,
          //     },
          //     auth.token,
          //   ),
          // );
        }
      }

      const updateMetadata = {
        key: data.key,
        fileName: data.filename,
        title: updatedData.title,
        description: updatedData.description,
        notes: updatedData.notes,
        projects: JSON.stringify([...projects]),
        collections: JSON.stringify(updatedCollections),
        tags: JSON.stringify([...tags]),
        thumbnail: data.thumbnail,
        fileinfo: JSON.stringify(fileInfo),
        dateadded: data.dateadded,
        client: updatedData.client.value || data.client,
      };
      console.log('updateMetadata : ', updateMetadata);
      await handleCopyObject(updateMetadata, updatedData.usageRights?.value);
      const submitData = {
        data: [
          {
            organisation: organizationId,
            key: data.key,
            bucket: bucketName,
            thumbnail_url: data.thumbnail,
          },
        ],
        collection_ids: updatedCollections
          .map(item => item.id)
          .filter(
            id =>
              !JSON.parse(data?.collections)
                .map(obj2 => obj2.id)
                .includes(id),
          ),
      };
      dispatch(
        apiAddCollectionItemsRequest(submitData, auth.token, organizationId),
      );
      const deletedCollections =
        data?.collections &&
        JSON.parse(data?.collections).filter(
          prev =>
            !updatedCollections.some(
              newItem => newItem.id === prev.id && newItem?.id,
            ),
        );
      console.log('deletedCollections : ', deletedCollections);
      const deletePromises = deletedCollections.map(item =>
        dispatch(
          apiDeleteCollectionItemsRequest(auth.token, {
            collection: item?.id,
            keys: [data.key],
          }),
        ),
      );
      await Promise.all(deletePromises);
    })();
  };

  useEffect(() => {
    console.log('da : ', data);
    setCollections(null);
    if (data) {
      setValue('fileName', data.filename);
      setValue('title', data?.title || '');
      setValue('description', data?.description || '');
      setValue('notes', data?.notes || '');
      setValue('client', data?.client || []);
      setProjects((data?.projects && JSON.parse(data?.projects)) || []);
      setTags((data?.tags && JSON.parse(data?.tags)) || []);
      setTimeout(() => {
        setValue(
          'collections',
          (data?.collections &&
            JSON.parse(data?.collections)?.map(item => {
              return { value: item.id, label: item.name };
            })) ||
            [],
        );
        setCollections(
          (data?.collections &&
            JSON.parse(data?.collections)?.map(item => {
              return { value: item.id, label: item.name };
            })) ||
            [],
        );
      }, 300);
      let rights = objectAcl.find(item => item?.Grantee?.Type === 'Group');

      rights = rights?.Permission === 'READ' ? '1' : '0';

      setValue('usageRights', rights);
    }
  }, [data]);
  useEffect(() => {
    setCollections(null);
  }, []);
  useEffect(() => {
    setValue('collections', collections);
  }, [collectionList]);

  return (
    <AddCrewContentContainer>
      <AddGearFormContainer>
        <form>
          <div className="mb-3">
            <label htmlFor="fileName" className="form-label">
              File Name
            </label>
            <Controller
              name="fileName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="File Name"
                  readOnly
                />
              )}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label d-flex flex-column mb-3"
            >
              Title
            </label>

            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Title"
                />
              )}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  rows={3}
                />
              )}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <Controller
              name="notes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Notes"
                  rows={3}
                />
              )}
            />
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label htmlFor="client" className="form-label">
              Client
            </label>
            <Controller
              name="client"
              control={control}
              defaultValue=""
              render={({ field }) => (
                // <input
                //   {...field}
                //   type="text"
                //   className="form-control"
                //   placeholder="Client"
                // />
                <CustomSelect
                  {...field}
                  type="text"
                  placeholder="Client"
                  options={
                    [...new Set(media?.clientList?.result)]?.map(item => {
                      return { value: item, label: item };
                    }) || []
                  }
                  isCreatable={true}
                  isClearable={true}
                />
              )}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="projects" className="form-label">
              Projects
            </label>
            <Stack
              direction="row"
              flexWrap={'wrap'}
              gap={'8px'}
              maxWidth={'400px'}
            >
              {[...projects].map(item => (
                <Badge
                  title={item.name}
                  key={item.id}
                  suffix={
                    <Clear
                      fontSize={'18px'}
                      style={{ padding: '2px', cursor: 'pointer' }}
                      onClick={() =>
                        setProjects(
                          prev =>
                            new Set([...prev].filter(x => x.id !== item.id)),
                        )
                      }
                    />
                  }
                />
              ))}
              <div onClick={() => setSidebarContent('project')}>
                <Badge
                  icon={
                    <AddIcon
                      fontSize={'12px'}
                      style={{ padding: '2px', cursor: 'pointer' }}
                    />
                  }
                  bgColor="#F2F4F7"
                />
              </div>
            </Stack>
          </div>
          <div className="mb-3">
            <label htmlFor="collections" className="form-label">
              Collections
            </label>
            {/* <Stack
              direction="row"
              flexWrap={'wrap'}
              gap={'8px'}
              maxWidth={'400px'}
            >
              {[...collections].map(item => (
                <Badge
                  title={item.name}
                  key={item.id}
                  suffix={
                    <Clear
                      fontSize={'18px'}
                      style={{ padding: '2px', cursor: 'pointer' }}
                      onClick={() => {
                        setCollections(
                          prev =>
                            new Set([...prev].filter(x => x.id !== item.id)),
                        );
                        setDeletedCollections(
                          previousState => new Set([...previousState, item.id]),
                        );
                      }}
                    />
                  }
                />
              ))}
              <Badge
                icon={
                  <AddIcon
                    fontSize={'12px'}
                    style={{ padding: '2px', cursor: 'pointer' }}
                  />
                }
                bgColor="#F2F4F7"
                onClick={() => setSidebarContent('collections')}
              />
            </Stack> */}
            {collections && (
              <Controller
                name="collections"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  // <input
                  //   {...field}
                  //   type="text"
                  //   className="form-control"
                  //   placeholder="Client"
                  // />
                  <CustomSelect
                    {...field}
                    type="text"
                    placeholder="Select Collections"
                    options={
                      collectionList?.map(item => {
                        return { value: Number(item.id), label: item.name };
                      }) || []
                    }
                    isCreatable={true}
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    style={{ height: 'auto' }}
                    defaultValue={collections.filter(obj1 =>
                      collectionList.some(obj2 => obj1.value === obj2.id),
                    )}
                  />
                )}
              />
            )}
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label htmlFor="client" className="form-label">
              Tags
            </label>
            <Controller
              name="tags"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Enter Tag"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      console.log('val :', e.target.value);
                      // setTags([...tags, e.target.value]);
                      setTags(
                        previousState =>
                          new Set([...previousState, e.target.value]),
                      );
                      setValue('tags', '');
                    }
                  }}
                  onBlur={e => {
                    if (e.target.value.length > 0) {
                      setTags(
                        previousState =>
                          new Set([...previousState, e.target.value]),
                      );
                      setValue('tags', '');
                    }
                  }}
                />
              )}
            />
            <Stack
              direction="row"
              flexWrap={'wrap'}
              gap={'8px'}
              maxWidth={'400px'}
              className="mt-3"
            >
              {[...tags].map((item, index) => (
                <Badge
                  title={item}
                  key={index}
                  suffix={
                    <X
                      onClick={() =>
                        setTags(
                          prev => new Set([...prev].filter(x => x !== item)),
                        )
                      }
                      style={{ cursor: 'pointer' }}
                    />
                  }
                  customStyle={{ borderRadius: '8px', height: '36px' }}
                />
              ))}
            </Stack>
          </div>
          <BorderBottom />
          <div className="mb-3 d-flex">
            <div className="col-sm-6">
              <label htmlFor="client" className="form-label">
                Dimensions
              </label>
              <FormDescription>
                {fileInfo?.height} x {fileInfo?.width}
              </FormDescription>
            </div>
            <div className="col-sm-6">
              <label htmlFor="client" className="form-label">
                File Size
              </label>
              <FormDescription>
                {formatFileSize(fileInfo?.fileSize)}
              </FormDescription>
            </div>
          </div>
          <div className="mb-3 d-flex">
            <div className="col-sm-6">
              <label htmlFor="length" className="form-label">
                Length
              </label>
              <FormDescription>
                {formatTime(fileInfo?.duration)}
              </FormDescription>
            </div>
            <div className="col-sm-6">
              <label htmlFor="length" className="form-label">
                Codec
              </label>
              <FormDescription>
                {fileInfo?.codec
                  .replace(/(^"|"$)/g, '')
                  .split(',')[0]
                  .replace('";', '')}{' '}
                <br />
                {fileInfo?.codec?.replace('";', '').split(',')[1]}
              </FormDescription>
            </div>
          </div>
          <BorderBottom />
          <div className="d-flex">
            <div className="col-sm-12">
              <label htmlFor="client" className="form-label">
                Date Created
              </label>
              <FormDescription>
                {moment(fileInfo?.dateCreated).format('MMM DD, YYYY')} at{' '}
                {moment(fileInfo?.dateCreated).format('LT')}
              </FormDescription>
            </div>
          </div>
          <div className="mb-3 d-flex">
            <div className="col-sm-12">
              <label htmlFor="dateadded" className="form-label">
                Date Added
              </label>
              <FormDescription>
                {moment.utc(data?.dateadded).local().format('MMM DD, YYYY')} at{' '}
                {moment.utc(data?.dateadded).local().format('LT')}
              </FormDescription>
            </div>
          </div>
          <BorderBottom />
          <div className="mb-3">
            <label htmlFor="usageRights" className="form-label">
              Usage Rights
            </label>
            <Controller
              name="usageRights"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  type="text"
                  placeholder="Usage Rights"
                  options={[
                    { label: 'External', value: '1' },
                    { label: 'Internal', value: '0' },
                  ]}
                />
              )}
            />
          </div>
        </form>
      </AddGearFormContainer>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          //   disabled={gear.isLoading}
          className="btn btn-primary btn-sm"
          onClick={onFormSubmit}
        >
          Confirm
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default Form;
