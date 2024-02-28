const DownloadIcon = props => {
  return props.isAlt ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3551_39845)">
        <path
          d="M6.66673 14.1666L10.0001 17.4999M10.0001 17.4999L13.3334 14.1666M10.0001 17.4999V9.99994M17.4001 15.0749C18.1246 14.5655 18.6679 13.8384 18.9511 12.9992C19.2344 12.1601 19.2429 11.2525 18.9754 10.4081C18.7079 9.56381 18.1783 8.82669 17.4635 8.30375C16.7486 7.78081 15.8858 7.49925 15.0001 7.49994H13.9501C13.6994 6.52317 13.2305 5.61598 12.5785 4.84668C11.9265 4.07737 11.1085 3.46599 10.1861 3.05857C9.26363 2.65115 8.26077 2.4583 7.25301 2.49454C6.24524 2.53078 5.25883 2.79517 4.36803 3.2678C3.47723 3.74043 2.70525 4.40898 2.11022 5.22314C1.51519 6.03729 1.11261 6.97582 0.932784 7.96807C0.752958 8.96032 0.800575 9.98044 1.07205 10.9516C1.34352 11.9228 1.83178 12.8198 2.50007 13.5749"
          stroke="#667085"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3551_39845">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5"
        stroke="white"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadIcon;
