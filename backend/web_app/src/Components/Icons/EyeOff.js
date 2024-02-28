import * as React from 'react';

const EyeOff = props => (
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
      d="M9.902 4.242A8.697 8.697 0 0 1 12 4.002C19.002 4.002 22.998 12 22.998 12a18.349 18.349 0 0 1-2.156 3.188m-6.72-1.067c-.276.293-.61.527-.974.691-.369.165-.767.252-1.171.264a3.132 3.132 0 0 1-1.178-.217 3.15 3.15 0 0 1-.996-.662 3.15 3.15 0 0 1-.662-.996 3.132 3.132 0 0 1-.217-1.178c.012-.404.1-.802.264-1.171.164-.364.398-.698.69-.973M1.003 1.002l21.996 21.996m-5.057-5.057A10.086 10.086 0 0 1 12 19.998C4.998 19.998 1.002 12 1.002 12a18.42 18.42 0 0 1 5.057-5.941Zm0 0"
      transform="scale(.66667)"
    />
  </svg>
);

export default EyeOff;
