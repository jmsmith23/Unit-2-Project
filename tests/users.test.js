const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const server = app.listen(8081, () => console.log('testing, testing 1, 2, 3'));
const Post = require('../models/Post');
const User = require('../models/User');
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

describe('Test all of the users endpoints', () => {
  test('it should create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'J Smith',
      email: 'jms@hemail.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toEqual('J Smith');
    expect(response.body.user.email).toEqual('jms@hemail.com');
  });
});
