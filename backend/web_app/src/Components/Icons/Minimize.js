import * as React from 'react';

const Minimize = props => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 12h6m0 0v6m0-6-7 7M18 8h-6m0 0V2m0 6 7-7"
      stroke="#667085"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Minimize;
