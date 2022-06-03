const mongoose = require('mongoose');

const {
  describe, it, expect, beforeAll, afterAll, beforeEach,
} = require('@jest/globals');
const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createServer } = require('../../server');
const { string } = require('joi');

const app = createServer();

const mockUser = {
  name: 'Intuitive Care',
  email: 'intuitivecare@mail.com',
  password: 'care1234'
}

describe('User and authentication routes', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach(async () => {
    await supertest(app)
      .post('/api/user/register')
      .send(mockUser);
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('should regist user successfully', async () => {
    const mockUserLocal = {
      name: 'Intuitive',
      email: 'intuitive@mail.com',
      password: 'care1234'
    }

    const { statusCode, body } = await supertest(app)
      .post('/api/user/register')
      .send(mockUserLocal);
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({ message: 'User registered.' })
  });

  it('should not regist user with an email that already exists on database', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/api/user/register')
      .send(mockUser);
    
    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'Email already exists.' });
  });

  it('should login successfully', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/api/user/login')
      .send({
        email: mockUser.email,
        password: mockUser.password
      });
    
    expect(statusCode).toBe(200);
    expect(body).toEqual({
      user: {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String)
      },
      token: expect.any(String),
      message: 'Authenticated.'
    });
  });

  it('should try to login with a wrong email and return an error', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/api/user/login')
      .send({
        email: 'intuitiveecare@email.com',
        password: mockUser.password
      });
    
    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'Some information is wrong.' });
  });

  it('should try to login with a wrong password and return an error', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/api/user/login')
      .send({
        email: mockUser.email,
        password: 'mockwrong'
      });
    
    expect(statusCode).toBe(400);
    expect(body).toEqual({ message: 'Some information is wrong.' });
  });
});