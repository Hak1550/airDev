import * as React from 'react';

const Phone = props => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.333 14.1v2.5a1.665 1.665 0 0 1-1.816 1.667 16.49 16.49 0 0 1-7.192-2.559 16.25 16.25 0 0 1-5-5 16.492 16.492 0 0 1-2.558-7.225 1.667 1.667 0 0 1 1.658-1.816h2.5A1.667 1.667 0 0 1 7.592 3.1c.105.8.3 1.586.583 2.342A1.667 1.667 0 0 1 7.8 7.2L6.742 8.258a13.333 13.333 0 0 0 5 5L12.8 12.2a1.666 1.666 0 0 1 1.758-.375 10.7 10.7 0 0 0 2.342.583 1.667 1.667 0 0 1 1.433 1.692Z"
      stroke="#667085"
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Phone;
