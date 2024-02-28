import Loader from 'Components/Loader';
import React from 'react';
import { useState } from 'react';
import { OutlinedButton } from '../IconButton/styles';
import {
  AddCrewContentContainer,
  DoneButton,
  MembersSearchList,
  NavFooter,
} from './styles';
import Badge from 'Components/Badge';
import _ from 'loadsh';
import { BorderBottom } from 'Components/CommonStyles';
import X from 'Components/Icons/X';
import { Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { apiGetAllMediaRequest } from 'Redux/actions/media';

const AddtoTagsContent = ({
  onRightNavClose,
  isLoading,
  keys,
  metadata,
  selectedOrg,
  handleCopyObject,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [value, setValue] = useState('');
  const [tags, setTags] = useState(new Set());
  const [loader, setLoader] = useState(false);
  const handleSubmit = () => {
    setLoader(true);
    keys.forEach(async item => {
      const findData = metadata.find(
        obj => obj?.metadata?.Metadata?.key === item,
      );
      const updatedMetadata = {
        ...findData?.metadata?.Metadata,
        tags: JSON.stringify([
          ...new Set([
            ...tags,
            ...JSON.parse(findData?.metadata?.Metadata?.tags),
          ]),
        ]),
      };
      console.log('update : ', updatedMetadata, 'met : ', metadata);
      await handleCopyObject(
        selectedOrg.label,
        selectedOrg.label,
        item,
        updatedMetadata,
      );
    });

    // setTimeout(() => {
    setLoader(false);
    // toast.success('Tags added successfully');
    dispatch(apiGetAllMediaRequest(auth.token, selectedOrg.value));
    onRightNavClose();
    // }, 3000);
  };
  return (
    <AddCrewContentContainer>
      {loader === false ? (
        <MembersSearchList>
          <div className="mb-3">
            <label htmlFor="client" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tag"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setTags(
                    previousState =>
                      new Set([...previousState, e.target.value]),
                  );
                  setValue('');
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
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setTags(
                          prev => new Set([...prev].filter(x => x !== item)),
                        )
                      }
                    >
                      <X />
                    </div>
                  }
                  customStyle={{ borderRadius: '8px', height: '36px' }}
                />
              ))}
            </Stack>
          </div>
          <BorderBottom />
        </MembersSearchList>
      ) : (
        <Loader />
      )}

      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton className="btn btn-primary btn-sm" onClick={handleSubmit}>
          Apply
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default AddtoTagsContent;
