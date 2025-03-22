
import React from 'react';
import GoogleIcon from '../../assets/google-icon.svg';
import GoogleAuth from './GoogleAuth';

const GoogleLoginButton: React.FC = () => {
  return (
    <div className="google-login">
      <button className="google-login-button">
        <img src={GoogleIcon} alt="Google" className="google-icon" />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
