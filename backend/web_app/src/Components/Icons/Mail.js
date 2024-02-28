import React from 'react';

const Mail = ({ width = "20", height = "20", ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.3333 4.99998C18.3333 4.08331 17.5833 3.33331 16.6666 3.33331H3.33329C2.41663 3.33331 1.66663 4.08331 1.66663 4.99998M18.3333 4.99998V15C18.3333 15.9166 17.5833 16.6666 16.6666 16.6666H3.33329C2.41663 16.6666 1.66663 15.9166 1.66663 15V4.99998M18.3333 4.99998L9.99996 10.8333L1.66663 4.99998"
      stroke="#667085"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Mail;