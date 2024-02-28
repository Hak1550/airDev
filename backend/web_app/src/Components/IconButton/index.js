import React from 'react';
import { OutlinedButton } from './styles';

const IconButton = ({ icon, text, ...props }) => {
  return (
    <OutlinedButton {...props} className="btn">
      {' '}
      {icon} <span style={{ marginLeft: '10px' }}>{text}</span>
    </OutlinedButton>
  );
};

export default IconButton;
