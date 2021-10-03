const { pool } = require('../database/connection');
const Post = require('../model/posts');

let data;
beforeEach(async () => {
  pool.connect();
  await pool.query(
    'TRUNCATE TABLE users, posts, likes, comments RESTART IDENTITY;'
  );
  return await pool.query(
    "INSERT INTO users(username, password, email) VALUES('dandelion', 'Password1', 'test@test.com'); INSERT INTO posts(text, created_at, user_id) VALUES('testtesttest', current_timestamp, 1);"
  );
});

afterAll(() => {
  pool.end();
});

test('checks test db is accessed', async () => {
  // need to work out a way to deal with created_at
  data = await Post.getPosts();
  expect(data).toStrictEqual([{ id: 1, text: 'testtesttest', userID: 1 }]);
});

test('adds Post to the db', async () => {
  await Post.addPost('blah blah', 1);
  data = await Post.getPosts();
  expect(data.length).toStrictEqual(2);
});

test('returns post by id', async () => {
  data = await Post.getPostById(1);
  expect(data).toStrictEqual({ id: 1, text: 'testtesttest', userID: 1 });
});