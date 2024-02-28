import React from 'react';

const Maximize = props => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 1h6m0 0v6m0-6-7 7M7 19H1m0 0v-6m0 6 7-7"
      stroke="#667085"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Maximize;
