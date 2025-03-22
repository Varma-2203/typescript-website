
import React, { useState } from 'react';
import RegisterForm from './auth/RegisterForm';
import GoogleLoginButton from './auth/GoogleLoginButton';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (username: string, email: string, password: string, dob: Date) => void;
  loginError: string | null;
  activeStyle?: string; // Make this prop optional with a default value
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onRegister, 
  loginError, 
  activeStyle = 'clean' // Provide a default value
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleRegister = (username: string, email: string, password: string, dob: Date) => {
    onRegister(username, email, password, dob);
    setIsRegisterOpen(false);
  };

  return (
    <div className="login-form-container">
      <h2 className="section-title">Login to Continue</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        {loginError && <div className="login-error">{loginError}</div>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="account-options">
        <div className="new-account">
          <span>New to BRCA SNP Database?</span>
          <a href="#" onClick={() => setIsRegisterOpen(true)}>Create an account</a>
        </div>
        <GoogleLoginButton />
      </div>

      {/* Registration Dialog */}
      <RegisterForm 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegister}
        activeStyle={activeStyle}
      />
    </div>
  );
};

export default LoginForm;
