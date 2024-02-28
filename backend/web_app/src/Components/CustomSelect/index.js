import React from 'react';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { DropDownIconContainer } from '../CommonStyles/index';

const DropDownIcon = () => (
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

const CustomSelect = ({
  value,
  onChange,
  onBlur,
  onFocus,
  options,
  indicatorIcon = null,
  disabled = false,
  placeholder = 'Select...',
  isCreatable = false,
  ...props
}) => {
  const customStyles = {
    control: (provided, { isDisabled }) => ({
      ...provided,
      width: '100%',
      height: 'auto',
      minHeight: '40px',
      maxHeight: '100px',
      overflow: 'auto',
      borderRadius: '8px',
      border: '1px solid #D0D5DD',
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      background: '#FFFFFF',
      cursor: isDisabled ? 'not-allowed' : 'default',
    }),
    clearIndicator: provided => ({
      ...provided,
      padding: '0px',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      paddingLeft: '4px',
    }),
    multiValue: base => ({
      ...base,
      backgroundColor: '#F9F5FF',
      color: '#6941C6',
    }),
    multiValueLabel: base => ({
      ...base,
      color: '#6941C6',
    }),
  };
  const ValueContainer = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        {indicatorIcon && <div className="ps-2 d-flex">{indicatorIcon}</div>}
        {children}
      </components.Control>
    );
  };
  return isCreatable ? (
    <CreatableSelect
      options={options}
      styles={customStyles}
      value={options.find(o => o.value === value)}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      defaultValue={props.defaultValue}
      components={{
        IndicatorSeparator: null,
        Control: ValueContainer,
        // DropdownIndicator: DropDownIcon,
      }}
      isDisabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  ) : (
    <Select
      options={options}
      styles={customStyles}
      value={options.find(o => o.value === value)}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      isSearchable={false}
      defaultValue={props.defaultValue}
      components={{
        IndicatorSeparator: null,
        Control: ValueContainer,
        // DropdownIndicator: DropDownIcon,
      }}
      isDisabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default CustomSelect;
