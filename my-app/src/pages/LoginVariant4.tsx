
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import ContactSection from '../components/ContactSection';
import StyleSelector from '../components/StyleSelector';
import { Button } from '../components/ui/button';
import { toast } from "../components/ui/use-toast";

import '../styles/base.css';

const styleOptions = [
  { id: 'clean', name: 'Clean' },
  { id: 'premium', name: 'Premium' },
  { id: 'modern', name: 'Modern' },
  { id: 'aesthetic', name: 'Aesthetic' },
  { id: 'archaeological', name: 'Archaeological' },
  { id: 'biological', name: 'Biological' }
];

const LoginVariant4: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState('aesthetic');
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // First remove any existing style links
    const existingLinks = document.querySelectorAll('link[id^="theme-style"]');
    existingLinks.forEach(link => {
      document.head.removeChild(link);
    });

    // Load the base style
    const baseLink = document.createElement('link');
    baseLink.rel = 'stylesheet';
    baseLink.href = `/src/styles/base.css`;
    baseLink.id = 'theme-style-base';
    document.head.appendChild(baseLink);
    
    // Load the selected theme style
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `/src/styles/${activeStyle}.css`;
    themeLink.id = 'theme-style-theme';
    document.head.appendChild(themeLink);
    
    // Store the active style in localStorage
    localStorage.setItem('activeStyle', activeStyle);
    
    return () => {
      // Clean up when component unmounts
      const linksToRemove = document.querySelectorAll('link[id^="theme-style"]');
      linksToRemove.forEach(link => {
        document.head.removeChild(link);
      });
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
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        setLoginError(null);
        navigate('/database');
      } else {
        // Login failed
        setLoginError(data.message || 'Login failed');
        toast({
          variant: "destructive",
          title: "Login failed",
          description: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Network error. Please try again.');
      toast({
        variant: "destructive",
        title: "Login error",
        description: "Network error. Please try again.",
      });
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
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });
      } else {
        // Registration failed
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: data.message || "Please try again",
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration error",
        description: "Network error. Please try again.",
      });
    }
  };

  return (
    <div className={`login-page variant4 ${activeStyle}-theme`}>
      <div className="style-selector-container">
        <StyleSelector 
          styles={styleOptions} 
          activeStyle={activeStyle} 
          onStyleChange={handleStyleChange} 
        />
      </div>
      
      <div className="minimal-header">
        <h1>BRCA SNP Database</h1>
      </div>
      
      <div className="grid-layout">
        <div className="grid-item left-content">
          <div className="about-wrapper">
            <AboutSection />
          </div>
          <div className="features-wrapper">
            <FeaturesSection />
          </div>
        </div>
        
        <div className="grid-item right-content">
          <LoginForm 
            onLogin={handleLogin} 
            onRegister={handleRegister}
            loginError={loginError} 
            activeStyle={activeStyle}
          />
        </div>
        
        <div className="grid-item contact">
          <ContactSection />
        </div>
      </div>
      
      <div className="navigate-button">
        <Button onClick={() => navigate('/database')}>Go to Dashboard</Button>
      </div>
    </div>
  );
};

export default LoginVariant4;
