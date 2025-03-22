const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from JSON file
const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

// Helper function to write users to JSON file
const saveUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing to users file:', error);
    return false;
  }
};

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email/username and password are required' });
  }

  // Get users from JSON file
  const users = getUsers();
  
  // Find user by email or username
  const user = users.find(user => 
    (user.email === email || user.username === email) && user.password === password
  );

  if (user) {
    const { password, ...userWithoutPassword } = user;
    
    return res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
      token: 'mock-jwt-token'
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password, dob } = req.body;

  // Basic validation
  if (!username || !email || !password || !dob) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Get current users
  const users = getUsers();

  // Check if user already exists
  if (users.some(user => user.email === email || user.username === username)) {
    return res.status(409).json({ message: 'User already exists with this email or username' });
  }

  // Validate age (13+ years)
  const birthDate = new Date(dob);
  const today = new Date();
  const thirteenYearsAgo = new Date(today);
  thirteenYearsAgo.setFullYear(today.getFullYear() - 13);
  
  if (birthDate > thirteenYearsAgo) {
    return res.status(400).json({ message: 'You must be at least 13 years old to register' });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    dob: birthDate
  };

  // Add to users array
  users.push(newUser);
  
  // Save updated users array to file
  if (saveUsers(users)) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return res.status(201).json({
      message: 'Account created successfully',
      user: userWithoutPassword
    });
  } else {
    return res.status(500).json({ message: 'Failed to create account' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
