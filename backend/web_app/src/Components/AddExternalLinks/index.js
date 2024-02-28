import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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
import { apiAddProjectLinksRequest } from 'Redux/actions/project';

const AddExternalLinks = ({ auth, onRightNavClose, projectId }) => {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      data: [{ title: '', url: 'https://' }],
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

  const onAddExternalLinksFormSubmit = () => {
    handleSubmit(data => {
      const result = {
        project_id: projectId,
        links: data.data,
      };
      dispatch(apiAddProjectLinksRequest(result, auth.token));
      onRightNavClose();
    })();
  };

  return (
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
                  Link
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
            append({ title: '', url: 'https://' });
          }}
        >
          <PlusNaked strokeColor="#6941C6" /> Add Another Link
        </AddLink>
      </AddGearFormContainer>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onRightNavClose}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={onAddExternalLinksFormSubmit}
        >
          Apply
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default AddExternalLinks;
