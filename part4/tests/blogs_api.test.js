const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
mongoose.set("bufferTimeoutMS", 30000);

const api = supertest(app);

const initialBlogs = [
  {
    title: "first blog",
    author: "me, myself and i",
    url: "http://localhost:123/first_post",
    likes: 999,
  },
  {
    title: "second blog",
    author: "me againt",
    url: "http://localhost:125/second_post",
    likes: 1,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
}, 20000);

test("there is one blog", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
}, 10000);

test("blogs are returned in JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("unique identifier of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0]["id"]).toBeDefined();
  expect(response.body[1]["id"]).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
