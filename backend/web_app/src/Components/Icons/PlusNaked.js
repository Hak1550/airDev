import * as React from 'react';

const PlusNaked = ({ strokeColor = '#FFF', props }) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 4.167v11.666M4.167 10h11.666"
      stroke={strokeColor}
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusNaked;
