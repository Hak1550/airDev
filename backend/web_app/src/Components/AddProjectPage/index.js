import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormErrorText } from '../CommonStyles';

import { OutlinedButton } from '../IconButton/styles';
import { FormActionRow, FormButtonGroup, SaveButton } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import SideBarPageType from '../../Enums/SideBarPageType';
import {
  apiDuplicateProjectPostRequest,
  apiProjectPatchRequest,
  apiProjectPostRequest,
  resetProject,
} from '../../Redux/actions/project';
import { useHistory } from 'react-router-dom';
import { updateSideBarState } from '../../Redux/actions/sidebar';
import DatePicker from 'react-date-picker';
import { Form } from 'react-bootstrap';
import CustomSelect from 'Components/CustomSelect';

const AddProjectPage = ({ handleCancel = null }) => {
  const sidebarState = useSelector(state => state.sidebar);
  const auth = useSelector(state => state.auth);
  const userInformation = useSelector(state => state.userInformation);
  const project = useSelector(state => state.project);
  const [orgList, setOrgList] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    if (new Date(watch('shoot_date')) > new Date(watch('shoot_end_date'))) {
      setValue('shoot_end_date', new Date(watch('shoot_date')));
    }
  }, [watch('shoot_date')]);
  useEffect(() => {
    if (
      (sidebarState.pageType === SideBarPageType.ADD_PROJECT ||
        sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT) &&
      project.postSuccess === true
    ) {
      const addedProject = project.projectList[0];
      history.replace(`/project/overview/${addedProject.id}`);
      reset();
      dispatch(
        updateSideBarState({
          ...JSON.parse(JSON.stringify(sidebarState)),
          pageType: SideBarPageType.PROJECT,
        }),
      );
      dispatch(resetProject());
    } else if (
      sidebarState.pageType === SideBarPageType.EDIT_PROJECT &&
      project.success === true
    ) {
      reset();
      dispatch(
        updateSideBarState({
          ...JSON.parse(JSON.stringify(sidebarState)),
          pageType: SideBarPageType.PROJECT,
        }),
      );
      dispatch(resetProject());
    }
  }, [sidebarState.success, sidebarState.postSuccess, project]);

  useEffect(() => {
    if (sidebarState.pageType === SideBarPageType.ADD_PROJECT) {
      setValue('shoot_time', '');
      reset();
    }
    if (
      sidebarState.pageType === SideBarPageType.EDIT_PROJECT ||
      sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT
    ) {
      const name =
        sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT
          ? sidebarState.selectedProject?.name + '_copy'
          : sidebarState.selectedProject?.name;
      const client =
        sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT
          ? // ? sidebarState.selectedProject?.client + '_copy'
            sidebarState.selectedProject?.client
          : sidebarState.selectedProject?.client;
      setValue('name', name);
      setValue('client', client);
      setValue('organisation', sidebarState.selectedProject?.organisation?.id);
      setValue(
        'shoot_date',
        new Date(sidebarState.selectedProject?.shoot_date),
      );
      setValue('shoot_time', sidebarState.selectedProject?.shoot_time);
      setValue(
        'shoot_end_date',
        new Date(sidebarState.selectedProject?.shoot_end_date),
      );
      setValue('location', sidebarState.selectedProject?.location);
      setValue('description', sidebarState.selectedProject?.description);
      setValue('status', sidebarState.selectedProject?.status);
    }
  }, [sidebarState.pageType]);

  useEffect(() => {
    if (userInformation) {
      const organisationData = [];
      userInformation?.data?.organisation_data.forEach(item => {
        if (item.role === 1 || item.role === 2)
          organisationData.push({
            value: item?.organisation?.id,
            label: item?.organisation?.name,
          });
      });
      setOrgList(organisationData);
      if (organisationData.length > 0)
        setValue('organisation', [organisationData[0]]);
    }
  }, [userInformation]);

  useEffect(() => {
    if (orgList.length > 0) setValue('organisation', [orgList[0]]);
  }, [orgList]);
  const onSubmit = data => {
    if (data['shoot_time'] === null) {
      delete data['shoot_time'];
    }
    data['shoot_end_date'] = new Date(
      data['shoot_end_date'],
    ).toLocaleDateString('sv');

    data['shoot_date'] = new Date(data['shoot_date']).toLocaleDateString('sv');

    if (
      sidebarState.pageType === SideBarPageType.ADD_PROJECT ||
      sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT
    ) {
      data['organisation'] =
        sidebarState.pageType === SideBarPageType.ADD_PROJECT
          ? data['organisation'].value
          : sidebarState.selectedProject?.organisation?.id;
      data['project_id'] =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const submitData = {};
      Object.keys(data).forEach(k => {
        if (data[k]) {
          submitData[k] = data[k];
        }
      });
      if (sidebarState.pageType === SideBarPageType.ADD_PROJECT)
        dispatch(apiProjectPostRequest(submitData, auth.token));
      else if (sidebarState.pageType === SideBarPageType.DUPLICATE_PROJECT)
        dispatch(
          apiDuplicateProjectPostRequest(
            submitData,
            auth.token,
            sidebarState.selectedProject?.id,
          ),
        );
    } else if (sidebarState.pageType === SideBarPageType.EDIT_PROJECT) {
      const project_id = sidebarState.selectedProject?.id;
      data['project_id'] = sidebarState.selectedProject?.project_id;
      const submitData = {};
      Object.keys(data).forEach(k => {
        if (data[k]) {
          submitData[k] = data[k];
        }
      });
      dispatch(apiProjectPatchRequest(submitData, project_id, auth.token));
    }
  };

  const onCancel = e => {
    e.preventDefault();
    dispatch(
      updateSideBarState({
        ...JSON.parse(JSON.stringify(sidebarState)),
        pageType: SideBarPageType.PROJECT,
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: '24px' }}>
      <div className="mb-3">
        <label className="form-label">Project Title</label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: 'This field is required.',
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="form-control"
              placeholder="Project Title"
            />
          )}
        />
        {errors.name && (
          <FormErrorText className="form-text">
            {errors.name.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Organisation</label>
        <div
          style={
            sidebarState.pageType !== SideBarPageType.ADD_PROJECT
              ? { cursor: 'not-allowed' }
              : { cursor: 'default' }
          }
        >
          <Controller
            name="organisation"
            control={control}
            rules={{
              required: 'This field is required.',
            }}
            render={({ field }) =>
              sidebarState.pageType !== SideBarPageType.ADD_PROJECT ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Organisation"
                  value={sidebarState.selectedProject?.organisation?.name}
                  disabled
                />
              ) : (
                <CustomSelect
                  options={orgList}
                  disabled={
                    sidebarState.pageType === SideBarPageType.ADD_PROJECT
                      ? false
                      : true
                  }
                  {...field}
                  defaultValue={orgList.length > 0 ? [orgList[0]] : []}
                  ref={null}
                />
              )
            }
          />
        </div>
        {errors.organisation && (
          <FormErrorText className="form-text">
            {errors.organisation.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Client</label>
        <Controller
          name="client"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="form-control"
              placeholder="Client"
            />
          )}
        />
        {errors.client && (
          <FormErrorText className="form-text">
            {errors.client.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Shoot Date</label>
        <Controller
          name="shoot_date"
          control={control}
          defaultValue={new Date()}
          rules={{
            validate: value => {
              if (value && new Date(value) > watch('shoot_end_date'))
                return "Shoot date can't be greater than shoot end date";
              else clearErrors('shoot_end_date');
            },
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              type="date"
              className="form-control"
              calendarClassName={'custom-calendar'}
              placeholder="Shoot Date"
              dayPlaceholder="dd"
              clearIcon={null}
              minDate={
                sidebarState.pageType === SideBarPageType.ADD_PROJECT &&
                new Date()
              }
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
            />
          )}
        />
        {errors.shoot_date && (
          <FormErrorText className="form-text">
            {errors.shoot_date.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Shoot Time</label>
        <Controller
          name="shoot_time"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <input
              {...field}
              step="2"
              type="time"
              className="form-control"
              placeholder="Shoot Time"
            />
          )}
        />
        {errors.shoot_time && (
          <FormErrorText className="form-text">
            {errors.shoot_time.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">End Date</label>
        <Controller
          name="shoot_end_date"
          control={control}
          defaultValue={new Date()}
          rules={{
            validate: value => {
              if (value && new Date(value) < watch('shoot_date'))
                return "Shoot end date can't be smaller than shoot date";
              else clearErrors('shoot_date');
            },
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              type="date"
              clearIcon={null}
              className="form-control"
              calendarClassName={'custom-calendar'}
              placeholder="End Date"
              minDate={
                sidebarState.pageType === SideBarPageType.ADD_PROJECT &&
                new Date(watch('shoot_date'))
              }
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
            />
          )}
        />
        {errors.shoot_end_date && (
          <FormErrorText className="form-text">
            {errors.shoot_end_date.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Location</label>
        <Controller
          name="location"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="form-control"
              placeholder="Location"
            />
          )}
        />
        {errors.location && (
          <FormErrorText className="form-text">
            {errors.location.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              className="form-control"
              placeholder="Enter project details"
              rows="3"
            ></textarea>
          )}
        />
        {errors.description && (
          <FormErrorText className="form-text">
            {errors.description.message}
          </FormErrorText>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Project Status</label>

        <Controller
          name="status"
          control={control}
          defaultValue="1"
          rules={{
            required: 'This field is required.',
          }}
          render={({ field }) => (
            <select {...field} className="form-select">
              <option value="1">Active</option>
              <option value="0">Archived</option>
            </select>
          )}
        />
        {errors.status && (
          <FormErrorText className="form-text">
            {errors.status.message}
          </FormErrorText>
        )}
      </div>
      <FormActionRow>
        <FormButtonGroup>
          <OutlinedButton onClick={handleCancel || onCancel} className="btn">
            Cancel
          </OutlinedButton>
          <SaveButton
            disabled={project.isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Save
          </SaveButton>
        </FormButtonGroup>
      </FormActionRow>
    </form>
  );
};

export default AddProjectPage;
