import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (username: string, email: string, password: string, dob: Date) => void;
  activeStyle: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isOpen, onClose, onRegister, activeStyle }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !email || !password || !confirmPassword || !dob) {
      setRegisterError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    
    // Check if user is at least 13 years old
    const today = new Date();
    const thirteenYearsAgo = new Date(today);
    thirteenYearsAgo.setFullYear(today.getFullYear() - 13);
    
    if (dob > thirteenYearsAgo) {
      setRegisterError('You must be at least 13 years old to register');
      return;
    }
    
    // If all validation passes, call onRegister
    onRegister(username, email, password, dob);
    
    // Reset form
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDob(undefined);
    setRegisterError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`register-dialog ${activeStyle}-theme`}>
        <DialogHeader>
          <DialogTitle className="register-title section-title">Create a New Account</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-field">
            <Label htmlFor="username" className="field-label">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="register-input"
            />
          </div>
          
          <div className="form-field">
            <Label htmlFor="register-email" className="field-label">Email</Label>
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="register-input"
            />
          </div>
          
          <div className="form-field">
            <Label htmlFor="register-password" className="field-label">Password</Label>
            <Input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="register-input"
            />
          </div>
          
          <div className="form-field">
            <Label htmlFor="confirm-password" className="field-label">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="register-input"
            />
          </div>
          
          <div className="form-field">
            <Label htmlFor="dob" className="field-label">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`date-picker-button w-full justify-start text-left ${!dob ? 'date-placeholder' : ''}`}
                >
                  {dob ? format(dob, 'PPP') : 'Select date'}
                  <CalendarIcon className="calendar-icon ml-auto h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dob}
                  onSelect={setDob}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {registerError && <div className="register-error">{registerError}</div>}
          
          <div className="register-actions">
            <Button type="submit" className="register-button">Create Account</Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
