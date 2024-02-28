const ArrowLeft = ({ isRight = false, ...props }) =>
  isRight === true ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3551_39915)">
        <path
          d="M10.0001 13.3337L13.3334 10.0003M13.3334 10.0003L10.0001 6.66699M13.3334 10.0003H6.66675M18.3334 10.0003C18.3334 14.6027 14.6025 18.3337 10.0001 18.3337C5.39771 18.3337 1.66675 14.6027 1.66675 10.0003C1.66675 5.39795 5.39771 1.66699 10.0001 1.66699C14.6025 1.66699 18.3334 5.39795 18.3334 10.0003Z"
          stroke="#7F56D9"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3551_39915">
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
    >
      <path
        d="M15.8334 9.99999H4.16675M4.16675 9.99999L10.0001 15.8333M4.16675 9.99999L10.0001 4.16666"
        stroke="#53389E"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

export default ArrowLeft;
