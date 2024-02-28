import React from 'react';
import { components } from 'react-select';
import TimezoneSelect from 'react-timezone-select';
import {
  DropDownIconContainer,
  OptionText,
  SelectedValueContainer,
} from '../CommonStyles/index';
import ClockIcon from '../Icons/ClockIcon';

const ValueContainer = props => {
  return (
    <components.SingleValue {...props}>
      <SelectedValueContainer>
        <ClockIcon />
        <OptionText>{props.data.label}</OptionText>
      </SelectedValueContainer>
    </components.SingleValue>
  );
};

const DropDownIcon = props => (
  <DropDownIconContainer>
    <svg width={12} height={8} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m1 1.5 5 5 5-5"
        stroke="#667085"
        strokeWidth={1.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </DropDownIconContainer>
);

const ReactTimezoneSelect = ({ value, onChange, onBlur, onFocus }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      height: '44px',
      borderRadius: '8px',
      border: '1px solid #D0D5DD',
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      background: '#FFFFFF',
    }),
  };

  return (
    <TimezoneSelect
      styles={customStyles}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={value}
      components={{
        IndicatorSeparator: null,
        SingleValue: ValueContainer,
        DropdownIndicator: DropDownIcon,
      }}
    />
  );
};

export default ReactTimezoneSelect;
