import * as React from 'react';

const ChevronRight = props => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m6 12 4-4-4-4"
      stroke="#D0D5DD"
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronRight;
