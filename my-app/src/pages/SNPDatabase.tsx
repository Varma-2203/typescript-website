import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const SNPDatabase: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">This is SNPDatabase</h1>
      
      <div className="mb-6">
        <p className="mb-4">Welcome to the BRCA SNP Database. This page is currently under development.</p>
      </div>
      
      <Link to="/">
        <Button variant="outline">Back to Login</Button>
      </Link>
    </div>
  );
};

export default SNPDatabase;
