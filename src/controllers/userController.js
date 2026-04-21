import { users } from '../data/users.js';

export const getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

export const getUserById = (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
};

export const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Name must be at least 3 characters long'
    });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Valid email is required'
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
};