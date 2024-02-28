import React from "react";
import Select from "react-select";
import { DropDownIconContainer } from "../CommonStyles/index";

const options = [
  { value: "product_designer", label: "Product Designer" },
  { value: "camera_men", label: "Camera Operator" }
];

const Seprator = () => {
  return <></>;
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

const JobTitleSelect = ({ value, onChange, onBlur, onFocus }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "44px",
      borderRadius: "8px",
      border: "1px solid #D0D5DD",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      background: "#FFFFFF"
    })
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      value={options.find(o => o.value === value)}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      components={{
        IndicatorSeparator: Seprator,
        DropdownIndicator: DropDownIcon
      }}
    />
  );
};

export default JobTitleSelect;
