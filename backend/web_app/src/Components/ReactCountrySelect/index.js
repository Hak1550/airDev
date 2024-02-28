import React from 'react';
import { countries } from './countries';
import Select, { components } from 'react-select';
import {
  CountryFlag,
  OptionContainer,
  OptionText,
  SelectedValueContainer,
} from '../CommonStyles/index';
import DropDownIcon from '../Icons/DropDownIcon';

const MyOption = props => {
  const { innerProps, innerRef } = props;
  return (
    <OptionContainer ref={innerRef} {...innerProps}>
      <CountryFlag src={props.data.icon} alt="" />
      <OptionText>{props.data.label}</OptionText>
    </OptionContainer>
  );
};

const CustomValueContainer = props => {
  const option = props.data;

  return (
    <components.SingleValue {...props}>
      <SelectedValueContainer>
        <CountryFlag src={option.icon} alt="" />
        <OptionText>{option.label}</OptionText>
      </SelectedValueContainer>
    </components.SingleValue>
  );
};

const ReactCountrySelect = ({ value, onChange, onBlur, onFocus }) => {
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

  const countryOptions = [];

  for (const [key, value] of Object.entries(countries)) {
    countryOptions.push({
      value: key,
      label: value,
      icon: require(`./flags/${key}.svg`),
    });
  }

  return (
    <Select
      options={countryOptions}
      value={countryOptions.find(c => c.value === value)}
      hideSelectedOptions={true}
      inputId="clickableCountryInput"
      styles={customStyles}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      components={{
        Option: MyOption,
        IndicatorSeparator: null,
        SingleValue: CustomValueContainer,
        DropdownIndicator: DropDownIcon,
      }}
    />
  );
};

export default ReactCountrySelect;
