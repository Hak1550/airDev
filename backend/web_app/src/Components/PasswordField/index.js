import React, { useState } from 'react';
import EyeOff from '../Icons/EyeOff';
import EyeOn from '../Icons/EyeOn';

const PasswordField = props => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  const { placeholder = 'Password' } = props;

  return (
    <div className="input-group password-field">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="form-control"
        id="password"
        autoComplete="new-password"
        placeholder={placeholder}
      />
      <div className="input-group-append">
        <span className="input-group-text" onClick={toggleShowPassword}>
          {showPassword ? <EyeOff /> : <EyeOn />}
        </span>
      </div>
    </div>
  );
};

export default PasswordField;
