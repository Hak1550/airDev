import React from 'react';

const Film = props => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 1v20M16 1v20M1 11h20M1 6h5M1 16h5m10 0h5M16 6h5M3.18 1h15.64A2.18 2.18 0 0 1 21 3.18v15.64A2.18 2.18 0 0 1 18.82 21H3.18A2.18 2.18 0 0 1 1 18.82V3.18A2.18 2.18 0 0 1 3.18 1Z"
      stroke="#667085"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Film;
