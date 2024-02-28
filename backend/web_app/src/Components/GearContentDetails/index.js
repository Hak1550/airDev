import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  AddCrewContentContainer,
  AddGearFormContainer,
  NavFooter,
  DoneButton,
} from './styles';
import { FormErrorText } from '../CommonStyles';
import { OutlinedButton } from '../IconButton/styles';
import { QRCodeRightNavView } from 'Components/QRCodeScanner';

const GearContentDetails = ({
  auth,
  onAddGearEnd,
  selectedGearDetails,
  handleCameraDetailsSave,
  setSideNavPage,
  setOnBoardCameraForm,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('owner_name', selectedGearDetails?.owner_name);
    setValue('placeholder', selectedGearDetails?.placeholder);
    setValue('nick_name', selectedGearDetails?.nick_name);
    setValue('air_id', selectedGearDetails?.air_id);
    setValue('lan_ip', selectedGearDetails?.lan_ip);
    setValue('public_ip', selectedGearDetails?.public_ip);
    setValue('public_ip', selectedGearDetails?.public_ip);
    setValue(
      'internal_record_format',
      selectedGearDetails?.internal_record_format,
    );
    setValue(
      'external_stream_format',
      selectedGearDetails?.external_stream_format,
    );
  }, [selectedGearDetails]);

  const onAddGearFormSubmit = () => {
    setSideNavPage('Shoot Menu');
    setOnBoardCameraForm(false);
    handleSubmit(data => {
      handleCameraDetailsSave(
        selectedGearDetails.id,
        data.placeholder,
        data.lan_ip,
      );
    })();
  };

  return (
    <AddCrewContentContainer>
      <AddGearFormContainer>
        <form>
          {'instance_size' in selectedGearDetails ? null : (
            <div className="mb-3">
              <label htmlFor="placeholder" className="form-label">
                CAM Display Number
              </label>
              <Controller
                name="placeholder"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="CAM Display Number"
                  />
                )}
              />
              {errors.placeholder && (
                <FormErrorText className="form-text">
                  {errors.placeholder.message}
                </FormErrorText>
              )}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="owner_name" className="form-label">
              Owner
            </label>
            <Controller
              name="owner_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Owner"
                  disabled
                />
              )}
            />
            {errors.owner_name && (
              <FormErrorText className="form-text">
                {errors.owner_name.message}
              </FormErrorText>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="nick_name" className="form-label">
              Nickname
            </label>
            <Controller
              name="nick_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Nickname"
                  disabled
                />
              )}
            />
            {errors.nick_name && (
              <FormErrorText className="form-text">
                {errors.nick_name.message}
              </FormErrorText>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="lan_ip" className="form-label">
              LAN IP
            </label>
            <Controller
              name="lan_ip"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Enter IP Address"
                />
              )}
            />
            {errors.lan_ip && (
              <FormErrorText className="form-text">
                {errors.lan_ip.message}
              </FormErrorText>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="public_ip" className="form-label">
              Public IP
            </label>
            <Controller
              name="public_ip"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="Enter Public IP Address"
                  disabled
                />
              )}
            />
            {errors.public_ip && (
              <FormErrorText className="form-text">
                {errors.public_ip.message}
              </FormErrorText>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="air_id" className="form-label">
              AIR ID
            </label>
            <Controller
              name="air_id"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  placeholder="ID 0192847502-B"
                  disabled
                />
              )}
            />
            {errors.air_id && (
              <FormErrorText className="form-text">
                {errors.air_id.message}
              </FormErrorText>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="internal_record_format" className="form-label">
              Internal Record Format
            </label>
            <Controller
              name="internal_record_format"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <select {...field} className="form-select" disabled>
                  <option value={1}>1080p 25fps</option>
                  <option value={2}>1080p 30fps</option>
                  <option value={3}>1080p 50fps</option>
                  <option value={4}>1080p 60fps</option>
                  <option value={5}>4k 25fps</option>
                  <option value={6}>4k 30fps</option>
                  <option value={7}>4k 50fps</option>
                  <option value={8}>4k 60fps</option>
                </select>
              )}
            />
            {errors.internal_record_format && (
              <FormErrorText className="form-text">
                {errors.internal_record_format.message}
              </FormErrorText>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="external_stream_format" className="form-label">
              External Stream Format
            </label>
            <Controller
              name="external_stream_format"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <select {...field} className="form-select" disabled>
                  <option value={1}>1080p 25fps</option>
                  <option value={2}>1080p 30fps</option>
                  <option value={3}>1080p 50fps</option>
                  <option value={4}>1080p 60fps</option>
                  <option value={5}>4k 25fps</option>
                  <option value={6}>4k 30fps</option>
                  <option value={7}>4k 50fps</option>
                  <option value={8}>4k 60fps</option>
                </select>
              )}
            />
            {errors.external_stream_format && (
              <FormErrorText className="form-text">
                {errors.external_stream_format.message}
              </FormErrorText>
            )}
          </div>

          {/* -------------------- Just For Testing QR Code----------- */}
          {/* {'internal_record_format' in selectedGearDetails ? (
            <QRCodeRightNavView air_id={selectedGearDetails?.air_id} />
          ) : null} */}
          {/* ------------------------------------------------------------ */}
        </form>
      </AddGearFormContainer>
      <NavFooter>
        <OutlinedButton className="btn btn-sm" onClick={onAddGearEnd}>
          Cancel
        </OutlinedButton>
        <DoneButton
          className="btn btn-primary btn-sm"
          onClick={onAddGearFormSubmit}
        >
          Save Changes
        </DoneButton>
      </NavFooter>
    </AddCrewContentContainer>
  );
};

export default GearContentDetails;
