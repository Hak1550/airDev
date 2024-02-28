import React from 'react';

const Plus = (props, stroke = '#667085') => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 6.667v6.666M6.667 10h6.666m5 0a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Z"
      stroke={stroke}
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Plus;
