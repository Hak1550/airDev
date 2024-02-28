import * as React from 'react';

const FeaturedMedia = props => (
  <svg
    width={56}
    height={56}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 28C4 14.745 14.745 4 28 4s24 10.745 24 24-10.745 24-24 24S4 41.255 4 28Z"
      fill="#F2F4F7"
    />
    <path
      d="M21 37h14a2 2 0 0 0 2-2V21a2 2 0 0 0-2-2H21a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Zm0 0 11-11 5 5m-11-6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      stroke="#475467"
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 48C16.954 48 8 39.046 8 28H0c0 15.464 12.536 28 28 28v-8Zm20-20c0 11.046-8.954 20-20 20v8c15.464 0 28-12.536 28-28h-8ZM28 8c11.046 0 20 8.954 20 20h8C56 12.536 43.464 0 28 0v8Zm0-8C12.536 0 0 12.536 0 28h8C8 16.954 16.954 8 28 8V0Z"
      fill="#F9FAFB"
    />
  </svg>
);

export default FeaturedMedia;
