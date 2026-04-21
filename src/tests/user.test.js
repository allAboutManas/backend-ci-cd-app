import request from 'supertest';
import app from '../app.js';

describe('User API', () => {
  test('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('GET /api/users/1 should return a user', async () => {
    const response = await request(app).get('/api/users/1');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBe(1);
  });

  test('GET /api/users/999 should return 404', async () => {
    const response = await request(app).get('/api/users/999');

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  test('POST /api/users should create a new user', async () => {
    const newUser = {
      name: 'Rahul',
      email: 'rahul@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(newUser.email);
  });

  test('POST /api/users should fail if email already exists', async () => {
    const duplicateUser = {
      name: 'Another Tony',
      email: 'tony@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(duplicateUser);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('Email already exists');
  });

  test('POST /api/users should fail for invalid email', async () => {
    const invalidUser = {
      name: 'Invalid User',
      email: 'invalidemail'
    };

    const response = await request(app)
      .post('/api/users')
      .send(invalidUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Valid email is required');
  });
});