import React from 'react';

const Home = props => (
  <svg
    width={20}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 21V11h6v10M1 8l9-7 9 7v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8Z"
      stroke="#667085"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Home;
