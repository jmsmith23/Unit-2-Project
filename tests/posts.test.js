const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const server = app.listen(8080, () => console.log('testing, testing 1, 2, 3'));
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

describe('Test all post endpoints', () => {
  test('It should create a new post', async () => {
    const user = new User({
      name: 'J Smith',
      email: 'jsmith@email.com',
      password: '123987',
    });
    await user.save();
    const token = await user.generateAuthToken();
    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Post',
        category: 'Major Scale Warmup',
        post: 'Start by playing major scale in 3 different positions...',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual('New Post');
    expect(response.body.category).toEqual('Major Scale Warmup');
    expect(response.body.post).toEqual(
      'Start by playing major scale in 3 different positions...'
    );
  });

  test('should show a specific post', async () => {
    const user = new User({
      name: 'J Smith',
      email: 'js@email.com',
      password: '123987',
    });
    await user.save();
    const token = await user.generateAuthToken();
    const getPost = new Post({
      title: 'New Post',
      category: 'Major Scale Warmup',
      post: 'Start by playing major scale in 3 different positions...',
    });
    await getPost.save();
    const response = await request(app)
      .get(`/posts/${getPost.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.title).toEqual('New Post');
    expect(response.body.category).toEqual('Major Scale Warmup');
    expect(response.body.post).toEqual(
      'Start by playing major scale in 3 different positions...'
    );
  });

  test('it should update a post', async () => {
    const user = new User({
      name: 'J Smith',
      email: 'ed123@email.com',
      password: '123987',
    });
    await user.save();
    const token = await user.generateAuthToken();
    const post = new Post({
      title: 'Minor Scale',
      category: 'Minor Scale Warmup',
      post: 'Start by playing minor scale in 3 different positions...',
    });
    await post.save();

    const response = await request(app)
      .put(`/posts/${post.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Harmonic Minor Scale',
        category: 'Minor Scale Warmup',
        post: 'Start by playing harmonic minor scale in 3 different positions...',
      });

    expect(response.statusCode).toBe(200);
  });

  test('it should delete a post', async () => {
    const user = new User({
      name: 'J Smith',
      email: 'newguy@email.com',
      password: '123987',
    });
    await user.save();
    const token = await user.generateAuthToken();
    const post = new Post({
      title: 'Minor Scale',
      category: 'Minor Scale Warmup',
      post: 'Start by playing minor scale in 3 different positions...',
    });
    await post.save();
    const response = await request(app)
      .delete(`/posts/${post.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(204);
  });

  //   test('it should show all posts', async () => {
  //     const user = new User({
  //       name: 'J Smith',
  //       email: 'whonow@email.com',
  //       password: '123987',
  //     });
  //     await user.save();
  //     const token = await user.generateAuthToken();
  //     const posts = new Post({
  //       title: 'Minor Scale',
  //       category: 'Minor Scale Warmup',
  //       post: 'Start by playing minor scale in 3 different positions...',
  //     });
  //     await posts.save();
  //     const response = request(app)
  //       .get('/posts')
  //       .set('Authorization', `Bearer ${token}`);

  //     // expect(Array.isArray(response.body)).toEqual(true);
  //     await response.body.forEach((object) => {
  //       expect(object).toHaveProperty('title');
  //       expect(object).toHaveProperty('category');
  //       expect(object).toHaveProperty('post');
  //       expect(object).toHaveProperty('likeUserIds');
  //     });
  //   });
});
