
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeColumnLayout from '../components/ThreeColumnLayout';
import LoginForm from '../components/LoginForm';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import ContactSection from '../components/ContactSection';
import StyleSelector from '../components/StyleSelector';
import { Button } from '../components/ui/button';

import '../styles/base.css';

const styleOptions = [
  { id: 'clean', name: 'Clean' },
  { id: 'premium', name: 'Premium' },
  { id: 'modern', name: 'Modern' },
  { id: 'aesthetic', name: 'Aesthetic' },
  { id: 'archaeological', name: 'Archaeological' },
  { id: 'biological', name: 'Biological' }
];

const Login: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState('clean');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  useEffect(() => {
    // Load the selected style CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/src/styles/${activeStyle}.css`;
    link.id = 'theme-style';
    
    // Remove any existing theme style link
    const existingLink = document.getElementById('theme-style');
    if (existingLink) {
      document.head.removeChild(existingLink);
    }
    
    document.head.appendChild(link);
    
    return () => {
      // Clean up when component unmounts
      const linkToRemove = document.getElementById('theme-style');
      if (linkToRemove) {
        document.head.removeChild(linkToRemove);
      }
    };
  }, [activeStyle]);

  const handleStyleChange = (styleId: string) => {
    setActiveStyle(styleId);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        // Redirect or update state as needed
        setLoginError(null);
      } else {
        // Login failed
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Network error. Please try again.');
    }
  };

  const handleRegister = async (username: string, email: string, password: string, dob: Date) => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username, 
          email, 
          password, 
          dob: dob.toISOString() 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        console.log('Registration successful:', data);
        // Could show a success message or auto-login the user
      } else {
        // Registration failed
        setRegisterError(data.message || 'Registration failed');
        alert(`Registration failed: ${data.message || 'Please try again'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Network error. Please try again.');
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="style-selector-container">
        <StyleSelector 
          styles={styleOptions} 
          activeStyle={activeStyle} 
          onStyleChange={handleStyleChange} 
        />
      </div>
      
      <div className="header">
        <h1>BRCA SNP Database</h1>
        <p>All in one database of BRCA Genes and their SNPs</p>
      </div>
      
      <div className="variant-navigation">
        <h3>View Other Login Page Variants:</h3>
        <div className="variant-buttons">
          <Link to="/variant1"><Button variant="outline">Variant 1</Button></Link>
          <Link to="/variant2"><Button variant="outline">Variant 2</Button></Link>
          <Link to="/variant3"><Button variant="outline">Variant 3</Button></Link>
          <Link to="/variant4"><Button variant="outline">Variant 4</Button></Link>
        </div>
      </div>
      
      <ThreeColumnLayout
        leftContent={<AboutSection />}
        middleContent={
          <LoginForm 
            onLogin={handleLogin} 
            onRegister={handleRegister}
            loginError={loginError} 
          />
        }
        rightContent={<FeaturesSection />}
      />
      
      <ContactSection />
    </div>
  );
};

export default Login;
