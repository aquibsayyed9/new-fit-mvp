import request from 'supertest';
import { app } from '../../src/app'; // Import your Express app instance

describe('User Controller', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app).post('/api/users/register').send({
        email: 'testuser@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        country: 'USA',
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it('should return 400 if email is invalid', async () => {
      const response = await request(app).post('/api/users/register').send({
        email: 'invalid-email',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        country: 'USA',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('POST /api/users/login', () => {
    it('should log in an existing user', async () => {
      const response = await request(app).post('/api/users/login').send({
        email: 'testuser@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 400 if credentials are invalid', async () => {
      const response = await request(app).post('/api/users/login').send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});
