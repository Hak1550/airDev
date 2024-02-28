import React from 'react';

const LifeBouy = props => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.93 3.93 4.24 4.24m5.66 5.66 4.24 4.24m0-14.14-4.24 4.24 3.53-3.53M3.93 18.07l4.24-4.24M21 11c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10Zm-6 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      stroke="#667085"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LifeBouy;
