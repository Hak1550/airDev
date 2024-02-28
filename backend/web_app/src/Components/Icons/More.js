import * as React from 'react';

const More = (props, stroke = '#344054') => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM15.833 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM4.167 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Z"
      stroke={stroke}
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default More;
