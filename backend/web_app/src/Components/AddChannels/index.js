import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  AddCrewContentContainer,
  AddGearFormContainer,
  NavFooter,
  DoneButton,
} from './styles';
import { FormErrorText } from '../CommonStyles';
import { OutlinedButton } from '../IconButton/styles';
import {
  apiAddCommsRequest,
  apiPatchCommsRequest,
} from 'Redux/actions/channel';
import { useEffect } from 'react';
import { FormLabel, FormLableDescription } from 'Pages/AccountPage/styles';
import { MainSelectImg } from 'Pages/TeamPage/styles';
import tick from '../../Assets/images/tick-square.png';
import CheckboxBase from '../../Assets/images/checkboxBase.png';

const AddChannels = ({
  auth,
  onRightNavClose,
  organisation_data,
  sideNavPage,
  selectedData = null,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (selectedData) {
      setValue('url', selectedData.url);
      setValue('is_copy_to_projects', selectedData.is_copy_to_projects);
    }
  }, [selectedData]);

  const onAddCommsFormSubmit = () => {
    handleSubmit(data => {
      if (selectedData) {
        const result = {
          ...selectedData,
          url: data.url,
          is_copy_to_projects: data.is_copy_to_projects,
        };
        dispatch(
          apiPatchCommsRequest(selectedData.id, null, result, auth.token, true),
        );
      } else {
        const result = {
          organisation: organisation_data?.organisation?.id,
          type: sideNavPage,
          title: '',
          url: data.url,
          is_copy_to_projects: data.is_copy_to_projects,
        };
        dispatch(apiAddCommsRequest(result, auth.token, true));
      }
      onRightNavClose();
    })();
  };

  return (
    <AddCrewContentContainer>
      <AddGearFormContainer>
        <form className="d-flex justify-content-between h-100 flex-column">
          <div className="mb-3">
            <label htmlFor={`url`} className="form-label">
              URL
            </label>
            <Controller
              name="url"
              control={control}
              defaultValue="http://"
              render={({ field }) => (
                <textarea
                  {...field}
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
                  className="form-control"
                  placeholder="Add URL"
                  rows="2"
                ></textarea>
              )}
            />

            {errors.url ? (
              <FormErrorText className="form-text">
                {errors.url?.message}
              </FormErrorText>
            ) : null}
          </div>
          <div className="d-flex justify-content-between">
            <div className="form-check d-flex ps-0">
              <Controller
                name="is_copy_to_projects"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <>
                    <MainSelectImg
                      src={watch('is_copy_to_projects') ? tick : CheckboxBase}
                      onClick={() =>
                        setValue(
                          'is_copy_to_projects',
                          !watch('is_copy_to_projects'),
                        )
                      }
                    />
                  </>
                )}
              />
              <FormLabel className="form-label form-check-label pe-0">
                Automatically add to New Projects
                <FormLableDescription>
                  When checked, the above Comm link will be applied as the
                  default when you create any new projects in this organization.
                </FormLableDescription>
              </FormLabel>
            </div>
          </div>
        </form>
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

export default AddChannels;
