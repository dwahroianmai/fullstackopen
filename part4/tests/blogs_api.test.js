const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
mongoose.set("bufferTimeoutMS", 30000);

const api = supertest(app);

test("there is one blog", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(1);
}, 30000);

test("blogs are returned in JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});
