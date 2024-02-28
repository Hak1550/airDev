import * as React from 'react';

const Grid = props => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 3H3v7h7V3ZM21 3h-7v7h7V3ZM21 14h-7v7h7v-7ZM10 14H3v7h7v-7Z"
      stroke="#7F56D9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Grid;
