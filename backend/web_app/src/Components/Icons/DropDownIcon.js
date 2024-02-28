import React from 'react';
import { DropDownIconContainer } from '../CommonStyles';

const DropDownIcon = props => (
  <DropDownIconContainer>
    <svg width={12} height={8} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m1 1.5 5 5 5-5"
        stroke="#667085"
        strokeWidth={1.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </DropDownIconContainer>
);

export default DropDownIcon;
