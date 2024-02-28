import React from 'react';

const AddAvatar = props => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginLeft: '8px', cursor: 'pointer' }}
    {...props}
  >
    <rect x="1" y="1" width="32" height="32" rx="16" fill="white" />
    <path
      d="M17 12.3333V21.6667M12.3334 17H21.6667"
      stroke="#98A2B3"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="1"
      y="1"
      width="32"
      height="32"
      rx="16"
      stroke="#D0D5DD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1 3"
    />
  </svg>
);

export default AddAvatar;
