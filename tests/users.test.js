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
    expect(response.body).to.have.ownProperty('token');
  });

  test('It should update user info', async () => {
    const user = new User({
      name: 'J Smith',
      email: 'update@test.com',
      password: '123987',
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'J Smith',
        email: 'newupdate@test.com',
        password: '123456',
      });

    expect(response.statusCode).toBe(200);
  });

  test('It should delete a user', async () => {
    const user = new User({
      name: 'J Smith',
      email: 'deleteme@test.com',
      password: '000123',
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
