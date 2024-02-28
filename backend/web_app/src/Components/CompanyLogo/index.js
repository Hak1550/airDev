import React from 'react';

const CompanyLogo = props => (
  <svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={36} height={36} rx={9} fill="#fff" />
    <rect width={36} height={36} rx={9} fill="url(#a)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 2.294C9.325 2.294 2.293 9.326 2.293 18S9.325 33.706 18 33.706c8.674 0 15.706-7.032 15.706-15.706S26.674 2.294 18 2.294ZM2.206 18C2.206 9.277 9.277 2.206 18 2.206c8.722 0 15.793 7.071 15.793 15.794S26.723 33.794 18 33.794C9.277 33.794 2.206 26.723 2.206 18Z"
      fill="#D0D5DD"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 13.588a4.413 4.413 0 1 0 0 8.825 4.413 4.413 0 0 0 0-8.825ZM13.5 18a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z"
      fill="#D0D5DD"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 14.985a3.015 3.015 0 1 0 0 6.03 3.015 3.015 0 0 0 0-6.03ZM14.9 18a3.102 3.102 0 1 1 6.203 0 3.102 3.102 0 0 1-6.203 0Z"
      fill="#D0D5DD"
    />
    <path d="M17.956 0h.087v36h-.087V0Z" fill="#D0D5DD" />
    <path d="M36 17.956v.087H0v-.087h36Z" fill="#D0D5DD" />
    <path
      d="M29.927 0h.087v36h-.087V0ZM11.97 0h.088v36h-.087V0ZM23.941 0h.088v36h-.088V0ZM5.985 0h.088v36h-.088V0Z"
      fill="#D0D5DD"
    />
    <path
      d="M36 29.927v.087H0v-.087h36ZM36 11.97v.088H0v-.087h36ZM36 23.941v.088H0v-.088h36ZM36 5.985v.088H0v-.088h36Z"
      fill="#D0D5DD"
    />
    <g filter="url(#b)">
      <circle cx={18} cy={18} r={9} fill="url(#c)" />
    </g>
    <g filter="url(#d)">
      <path
        d="M0 18h36v3.6c0 5.04 0 7.56-.98 9.486a9 9 0 0 1-3.934 3.933C29.16 36 26.64 36 21.6 36h-7.2c-5.04 0-7.56 0-9.486-.98a9 9 0 0 1-3.933-3.934C0 29.16 0 26.64 0 21.6V18Z"
        fill="#fff"
        fillOpacity={0.2}
      />
    </g>
    <defs>
      <linearGradient
        id="a"
        x1={18}
        y1={0}
        x2={18}
        y2={36}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#D0D5DD" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={13.5}
        y1={27}
        x2={22.5}
        y2={9}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#53389E" />
        <stop offset={1} stopColor="#6941C6" />
      </linearGradient>
      <filter
        id="b"
        x={6}
        y={7}
        width={24}
        height={24}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7598_4435"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1.5} />
        <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0" />
        <feBlend
          in2="effect1_dropShadow_7598_4435"
          result="effect2_dropShadow_7598_4435"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_7598_4435"
          result="shape"
        />
      </filter>
      <filter
        id="d"
        x={-5.625}
        y={12.375}
        width={47.25}
        height={29.25}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={2.813} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_7598_4435"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_7598_4435"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default CompanyLogo;
