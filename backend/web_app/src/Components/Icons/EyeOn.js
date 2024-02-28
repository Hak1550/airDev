import * as React from 'react';

const EyeOn = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} {...props}>
    <path
      style={{
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#101828',
        strokeOpacity: 1,
        strokeMiterlimit: 4,
      }}
      d="M1.002 12S4.998 4.002 12 4.002C19.002 4.002 22.998 12 22.998 12S19.002 19.998 12 19.998C4.998 19.998 1.002 12 1.002 12Zm0 0"
      transform="scale(.66667)"
    />
    <path
      style={{
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#101828',
        strokeOpacity: 1,
        strokeMiterlimit: 4,
      }}
      d="M12 15c1.658 0 3-1.342 3-3s-1.342-3-3-3-3 1.342-3 3 1.342 3 3 3Zm0 0"
      transform="scale(.66667)"
    />
  </svg>
);

export default EyeOn;
