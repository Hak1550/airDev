import React from 'react';
import { HeaderMain, HeaderMainLeft, HeaderMainLeftPara } from '../styles';
const Header = props => {
  let { count = 0 } = props;
  return (
    <HeaderMain>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ height: 30, justifyContent: 'center' }}>
          <p
            style={{
              fontWeight: '500',
              marginRight: 10,
              fontSize: 18,
              color: '#101828',
              fontFamily: 'Inter',
            }}
          >
            Archived Projects
          </p>
        </div>
        <HeaderMainLeft>
          <HeaderMainLeftPara>{count} projects</HeaderMainLeftPara>
        </HeaderMainLeft>
      </div>
      <div
        style={{
          border: '1px solid #E4E7EC',
          margin: '20px 0px',
          width: '100%',
        }}
      ></div>
    </HeaderMain>
  );
};

export default Header;
