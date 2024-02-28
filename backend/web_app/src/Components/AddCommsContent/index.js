import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddCrewContentContainer,
  AddGearFormContainer,
  NavFooter,
  DoneButton,
  AddLink,
} from './styles';
import { FormErrorText } from '../CommonStyles';
import { OutlinedButton } from '../IconButton/styles';
import PlusNaked from 'Components/Icons/PlusNaked';
import X from 'Components/Icons/X';
import {
  apiAddCommsRequest,
  apiGetCommsByIdRequest,
  apiPatchCommsRequest,
  resetInitialState,
} from 'Redux/actions/channel';
import { useHistory } from 'react-router-dom';
import Loader from 'Components/Loader';

const AddCommsContent = ({
  auth,
  onRightNavClose,
  projectId,
  commsId = null,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const channelState = useSelector(state => state.channel);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      data: [{ type: 'discord', title: '', url: 'https://' }],
    },
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
    rules: {
      required: true,
    },
  });

  const onAddCommsFormSubmit = () => {
    handleSubmit(data => {
      const result = {
        project_id: projectId,
        comms: data.data,
      };
      dispatch(apiAddCommsRequest(result, auth.token));
      // onRightNavClose();
    })();
  };

  const onUpdateCommsFormSubmit = () => {
    handleSubmit(data => {
      const result = {
        type: data.type,
        title: data.title,
        url: data.url,
      };
      dispatch(apiPatchCommsRequest(commsId, projectId, result, auth.token));
      onRightNavClose();
    })();
  };

  // useEffect(() => {
  //   if (channelState.postSuccess) {
  //     history.push('/project/comms/' + projectId);
  //   }
  // }, [channelState.postSuccess]);

  useEffect(() => {
    if (commsId) {
      dispatch(apiGetCommsByIdRequest(commsId, auth.token));
    }
  }, [commsId]);

  useEffect(() => {
    if (channelState.data) {
      setValue('type', channelState?.data?.type);
      setValue('title', channelState?.data?.title);
      setValue('url', channelState?.data?.url);
    }
  }, [channelState.data]);

  return channelState?.isLoading ? (
    <Loader />
  ) : commsId ? (
    <AddCrewContentContainer>
      <AddGearFormContainer>
        <form>
          {fields.map((item, index) => (
            <div key={item.id}>
              {index > 0 ? (
                <div
                  onClick={() => remove(index)}
                  className="float-end cursor-pointer"
                  role="button"
                >
                  <X />
                </div>
              ) : null}
              <div className="mb-3">
                <label htmlFor="_type" className="form-label">
                  Type
                </label>
                <Controller
                  name="type"
                  control={control}
                  defaultValue="1"
                  rules={{
                    required: 'This field is required.',
                  }}
                  render={({ field }) => (
                    <select {...field} className="form-select" disabled>
                      <option value={'discord'}>Discord</option>
                      <option value={'slack'}>Slack</option>
                      <option value={'unity_intercom'}>Unity Intercom </option>
                    </select>
                  )}
                />
              </div>
              <div className="mb-3">
                <label htmlFor={`data[${index}].title`} className="form-label">
                  Title
                </label>

                <input
                  {...register(`title`)}
                  type="text"
                  className="form-control"
                  placeholder="Add Title"
                />

                {errors.title ? (
                  <FormErrorText className="form-text">
                    This field is required
                  </FormErrorText>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor={`data[${index}].url`} className="form-label">
                  URL
                </label>

                <input
                  {...register(`url`, {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    pattern: {
                      value:
                        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                      message: 'This URL is not valid',
                    },
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Add URL"
                />

                {errors?.url ? (
                  <FormErrorText className="form-text">
                    {errors?.url?.message}
                  </FormErrorText>
                ) : null}
              </div>
            </div>
          ))}
        </form>
      </AddGearFormContainer>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={onUpdateCommsFormSubmit}
        >
          Apply
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  ) : (
    <AddCrewContentContainer>
      <AddGearFormContainer>
        <form>
          {fields.map((item, index) => (
            <div key={item.id}>
              {index > 0 ? (
                <div
                  onClick={() => remove(index)}
                  className="float-end cursor-pointer"
                  role="button"
                >
                  <X />
                </div>
              ) : null}
              <div className="mb-3">
                <label htmlFor="_type" className="form-label">
                  Type
                </label>
                <select
                  className="form-select"
                  {...register(`data[${index}].type`, {
                    required: true,
                  })}
                  defaultValue="discord"
                >
                  <option value={'discord'}>Discord</option>
                  <option value={'slack'}>Slack</option>
                  <option value={'unity_intercom'}>Unity Intercom </option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor={`data[${index}].title`} className="form-label">
                  Title
                </label>

                <input
                  {...register(`data[${index}].title`, {
                    required: true,
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Add Title"
                />

                {errors.data?.[index]?.title ? (
                  <FormErrorText className="form-text">
                    This field is required
                  </FormErrorText>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor={`data[${index}].url`} className="form-label">
                  URL
                </label>

                <input
                  {...register(`data[${index}].url`, {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    pattern: {
                      value:
                        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                      message: 'This URL is not valid',
                    },
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Add URL"
                />

                {errors.data?.[index]?.url ? (
                  <FormErrorText className="form-text">
                    {errors.data?.[index]?.url?.message}
                  </FormErrorText>
                ) : null}
              </div>
              <div
                style={{ border: '1px solid #E4E7EC' }}
                className="my-3"
              ></div>
            </div>
          ))}
        </form>
        <AddLink
          onClick={() => {
            append({ type: 'discord', title: '', url: 'https://' });
          }}
        >
          <PlusNaked strokeColor="#6941C6" /> Add Another Comm
        </AddLink>
      </AddGearFormContainer>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={onAddCommsFormSubmit}
        >
          Apply
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default AddCommsContent;
