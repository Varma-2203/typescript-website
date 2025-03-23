import React from 'react';
import GoogleIcon from '../../assets/google-icon.svg';
import GoogleAuth from './GoogleAuth';

const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    const authElement = document.getElementById("google-auth");
    if (authElement) {
      authElement.click();
    }
  };

  return (
    <div className="google-login">
      <button className="google-login-button" onClick={handleGoogleLogin}>
        <img src={GoogleIcon} alt="Google" className="google-icon" />
        Sign in with Google
      </button>
      {/* Hidden Google Auth to trigger on button click */}
      <div id="google-auth" style={{ display: 'none' }}>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default GoogleLoginButton;
