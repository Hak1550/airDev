import {
  UploadContainer,
  UploadSpan2,
  UploadSpanFirst,
} from 'Components/AddProjectFiles/styles';
import UploadIcon from 'Components/Icons/UploadIcon';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormErrorText } from '../../Components/CommonStyles';
import { OutlinedButton } from '../../Components/IconButton/styles';
import Email from '../../Components/Icons/Email';
import Phone from '../../Components/Icons/Phone';
import ReactCountrySelect from '../../Components/ReactCountrySelect';
import ReactTimezoneSelect from '../../Components/ReactTimezoneSelect';
import avatar from '../../Assets/images/avatar.png';
import Form from 'react-bootstrap/Form';

import {
  AvatarImg,
  FormContent,
  FormDescription,
  FormFooter,
  FormHeader,
  FormHeaderButtons,
  FormHeaderTitleColumn,
  FormLabel,
  FormLableDescription,
  FormRow,
  FormTitle,
  SaveButton,
} from './styles';
import PhoneInput from 'react-phone-number-input/react-hook-form-input';
import 'react-phone-number-input/style.css';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useSelector } from 'react-redux';
import Loader from 'Components/Loader';

const AccountPage = ({ state, auth, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isDirty },
  } = useForm({});
  const userInformation = useSelector(state => state.userInformation);
  const projectState = useSelector(state => state.project);
  const [profileImage, setProfileImage] = useState();
  const MAX_SIZE = 26214400;

  useEffect(() => {
    reset(state.data);
  }, [state.data, auth.user]);

  const onSave = () => {
    handleSubmit(data => {
      if (typeof data['country'] !== 'string') {
        data['country'] = data['country'].value;
      }

      if (typeof data['timezone'] !== 'string') {
        data['timezone'] = data['timezone'].value;
      }

      if (typeof data['job_title'] !== 'string') {
        data['job_title'] = data['job_title'].value;
      }
      if (profileImage) {
        data['profile_image'] = profileImage;
      } else {
        delete data['profile_image'];
      }

      const formData = new FormData();

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          formData.append(key, element);
        }
      }

      onSubmit(formData);
    })();
  };

  const onDrop = files => {
    if (files.length > 0) {
      const image = new Image();
      let url;
      url = URL?.createObjectURL(files[0]);
      image.src = url;
      image.onload = function () {
        if (this.width > 800 || this.height > 400) {
          toast.error('File must be within maximum 800x400px', {
            toastId: 'error-size',
          });
          setProfileImage(null);
        } else setProfileImage(files[0]);
      };
    } else setProfileImage(null);
  };
  const fileSizeValidator = file => {
    const ext = file?.name?.split('.').pop();
    const image = new Image();
    let url;
    url = URL.createObjectURL(file);
    image.src = url;
    image.onload = function () {
      if (this.width > 800 || this.height > 400)
        toast.error('File must be within maximum 800x400px', {
          toastId: 'error-size',
        });
    };
    if (
      file?.size > MAX_SIZE ||
      !['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(ext?.toLowerCase())
    )
      toast.error('Invalid file format or file size exceeded maximum size', {
        toastId: 'error-size',
      });
  };

  return (
    <>
      <FormHeader>
        <FormHeaderTitleColumn>
          <FormTitle>Personal info</FormTitle>
          <FormDescription>
            Update your photo and personal details here.
          </FormDescription>
        </FormHeaderTitleColumn>
        {isDirty || profileImage ? (
          <FormHeaderButtons>
            <OutlinedButton
              className="btn"
              onClick={() => {
                reset();
                if (profileImage) setProfileImage(null);
              }}
            >
              Cancel
            </OutlinedButton>
            <SaveButton className="btn btn-primary" onClick={onSave}>
              Save
            </SaveButton>
          </FormHeaderButtons>
        ) : null}
      </FormHeader>

      {userInformation?.isLoading ? (
        <Loader />
      ) : (
        <FormContent>
          <form>
            <FormRow className="row">
              <FormLabel className="col-sm-3">Name</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-6">
                    <Controller
                      name="first_name"
                      control={control}
                      defaultValue={state.data?.first_name}
                      rules={{
                        required: 'This field is required.',
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="form-control"
                          placeholder="First name"
                        />
                      )}
                    />
                    {errors.first_name && (
                      <FormErrorText className="form-text">
                        {errors.first_name.message}
                      </FormErrorText>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <Controller
                      name="last_name"
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
                          placeholder="Last name"
                        />
                      )}
                    />
                    {errors.last_name && (
                      <FormErrorText className="form-text">
                        {errors.last_name.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Nickname (Optional)</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    <Controller
                      name="nick_name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: false,
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="form-control"
                          placeholder="Nickname"
                        />
                      )}
                    />

                    {errors.nick_name && (
                      <FormErrorText className="form-text">
                        {errors.nick_name.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Email</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'This field is required.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Enter a valid e-mail address',
                        },
                      }}
                      render={({ field }) => (
                        <div className="input-group flex-nowrap">
                          <span className="input-group-text">
                            <Email />
                          </span>
                          <input
                            {...field}
                            type="text"
                            className="form-control"
                            placeholder="olivia@example.com"
                          />
                        </div>
                      )}
                    />
                    {errors.email && (
                      <FormErrorText className="form-text">
                        {errors.email.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Phone</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    {/* <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'This field is required.',
                    }}
                    render={({ field }) => (
                      <div className="input-group flex-nowrap">
                        <span className="input-group-text">
                          <Phone />
                        </span>
                        <input
                          {...field}
                          type="text"
                          className="form-control"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    )}
                  /> */}
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text">
                        <Phone />
                      </span>
                      <PhoneInput
                        name="phone"
                        control={control}
                        rules={{
                          validate: {
                            required: value => {
                              if (!value) return 'This field is required.';
                              if (!isPossiblePhoneNumber(value))
                                return 'Invalid phone number';
                            },
                          },
                        }}
                        placeholder="+1 (555) 000-0000"
                        className="form-control"
                      />
                    </div>
                    {errors.phone && (
                      <FormErrorText className="form-text">
                        {errors.phone.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <div className="col-sm-3">
                <FormLabel>Your Photo</FormLabel>
                <FormLableDescription>
                  This will be displayed on your profile.
                </FormLableDescription>
              </div>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-2">
                    <AvatarImg
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : state.data?.profile_image || avatar
                      }
                    />
                  </div>
                  <div className="col-sm-10">
                    {/* <input
                    type="file"
                    name="profile_image"
                    className="form-control"
                    onChange={handleChange}
                  /> */}
                    <Dropzone
                      onDrop={onDrop}
                      multiple={false}
                      accept={{
                        'image/png': ['.png', '.jpeg', '.jpg', '.svg', '.gif'],
                      }}
                      maxSize={MAX_SIZE}
                      maxFiles={1}
                      validator={fileSizeValidator}
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        isDragReject,
                        rejectedFiles,
                      }) => {
                        if (isDragReject || rejectedFiles) {
                          toast.error(
                            'Invalid file format or file size exceeded maximum size',
                            { toastId: 'error-file-upload' },
                          );
                        }
                        return (
                          <section>
                            <UploadContainer
                              {...getRootProps({ className: 'dropzone' })}
                            >
                              <input {...getInputProps()} />
                              <div>
                                <UploadIcon />
                                <br />
                                <UploadSpanFirst>
                                  Click to upload
                                </UploadSpanFirst>
                                <UploadSpan2> or drag and drop</UploadSpan2>
                                <br />
                                <UploadSpan2>
                                  SVG, PNG, JPG or GIF (max. 800x400px)
                                </UploadSpan2>
                              </div>
                            </UploadContainer>
                            {/* <aside>
                            <ul style={{ padding: '0px' }}>
                              {fileList?.map((file, index) => (
                                <FileUploadWithProgress
                                  file={file}
                                  key={index}
                                  removeFiles={removeFiles}
                                />
                              ))}
                            </ul>
                          </aside> */}
                          </section>
                        );
                      }}
                    </Dropzone>
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Company</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    <Controller
                      name="company_name"
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
                          placeholder="Company"
                        />
                      )}
                    />
                    {errors.company_name && (
                      <FormErrorText className="form-text">
                        {errors.company_name.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Job Title</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    <Controller
                      name="job_title"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'This field is required.',
                      }}
                      render={({ field }) => (
                        // <JobTitleSelect {...field} ref={null} />
                        <input
                          {...field}
                          type="text"
                          className="form-control"
                          placeholder="Job Title"
                        />
                      )}
                    />
                    {errors.job_title && (
                      <FormErrorText className="form-text">
                        {errors.job_title.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Location</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    <Controller
                      name="location"
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
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Country</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    <Controller
                      name="country"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'This field is required.',
                      }}
                      render={({ field }) => (
                        <ReactCountrySelect {...field} ref={null} />
                      )}
                    />
                    {errors.country && (
                      <FormErrorText className="form-text">
                        {errors.country.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">Timezone</FormLabel>
              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12">
                    <Controller
                      name="timezone"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'This field is required.',
                      }}
                      render={({ field }) => (
                        <ReactTimezoneSelect {...field} ref={null} />
                      )}
                    />
                    {errors.timezone && (
                      <FormErrorText className="form-text">
                        {errors.timezone.message}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>

            <FormRow className="row">
              <FormLabel className="col-sm-3">
                Visibility
                <FormLableDescription>
                  This setting will determine your visiblity for proejcts on AIR
                  Cloud. You can decide if you want to be indexed for other
                  projects across the AIR Cloud ecosystem or you decide to
                  remain visible only to those who’ve invited you.
                </FormLableDescription>
              </FormLabel>

              <div className="col-sm-9">
                <div className="row" style={{ maxWidth: '512px' }}>
                  <div className="col-sm-12 ms-4">
                    <label htmlFor="global_member_true">
                      <Form.Check
                        {...register('global_member', { required: true })}
                        type="radio"
                        name="global_member"
                        value={true}
                        id="global_member_true"
                        label="Global"
                        defaultChecked={state?.data?.global_member}
                      />
                    </label>
                    <FormLableDescription className="ps-4">
                      Visible for projects across AIRcloud
                      <sup style={{ fontSize: 8 }}>TM</sup>.
                    </FormLableDescription>
                    <label htmlFor="global_member_false">
                      <Form.Check
                        {...register('global_member', { required: true })}
                        type="radio"
                        name="global_member"
                        value={false}
                        defaultChecked={!state?.data?.global_member}
                        id="global_member_false"
                        label="ONLY Organizations I’ve been Invited to:"
                      />
                    </label>
                    <FormLableDescription className="ps-4">
                      {userInformation.data?.organisation_data
                        ?.map(item => item?.organisation?.name)
                        .join(', ')}
                    </FormLableDescription>
                    {errors?.global_member?.type === 'required' && (
                      <FormErrorText className="form-text">
                        {'This field is required'}
                      </FormErrorText>
                    )}
                  </div>
                </div>
              </div>
            </FormRow>
          </form>
        </FormContent>
      )}

      <FormFooter>
        <span></span>
        {isDirty || profileImage ? (
          <FormHeaderButtons>
            <OutlinedButton
              className="btn"
              onClick={() => {
                reset();
                if (profileImage) setProfileImage(null);
              }}
            >
              Cancel
            </OutlinedButton>
            <SaveButton className="btn btn-primary" onClick={onSave}>
              Save
            </SaveButton>
          </FormHeaderButtons>
        ) : null}
      </FormFooter>
    </>
    // </AccountPageContainer>
    // </DashboardLayout>
  );
};

export default AccountPage;
