const PauseIcon = props => {
  return (
    <div style={{ background: '#FFF', borderRadius: '25px' }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 14V28H27.3333V14H24Z"
          fill="#121923"
          stroke="#050733"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 14L15 28H18.3333V14H15Z"
          fill="#121923"
          stroke="#050733"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default PauseIcon;
