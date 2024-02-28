import * as React from 'react';

const Media = props => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Zm0 0 11-11 5 5M10 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      stroke="#7F56D9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Media;
