import * as React from 'react';

const EditSquare = props => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.167 3.333H3.333A1.667 1.667 0 0 0 1.667 5v11.667a1.667 1.667 0 0 0 1.666 1.666H15a1.667 1.667 0 0 0 1.667-1.666v-5.834m-1.25-8.75a1.768 1.768 0 0 1 2.5 2.5L10 12.5l-3.333.833L7.5 10l7.917-7.917Z"
      stroke="#667085"
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditSquare;
