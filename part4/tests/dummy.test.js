const { dummy, totalLikes, favoriteBlog } = require("../utils/list_helper");

// dummy function
test("dummy returns 1", () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

// for tests
const listWithOneBlog = [
  {
    title: "first blog",
    author: "me, myself and i",
    url: "http://localhost:123/first_post",
    likes: 999,
    id: "64a4a7b5e16ad27c2d97c1f3",
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

// ex. 4.4
describe("total likes", () => {
  test("of empty list is 0", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    expect(totalLikes(listWithOneBlog)).toBe(999);
  });

  test("of a bigger list is calculated right", () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

// ex. 4.5
describe("favorite blog", () => {
  test("of empty list is {}", () => {
    expect(favoriteBlog([])).toEqual({});
  });

  test("when list has only one blog, equals that one blog", () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual({
      title: "first blog",
      author: "me, myself and i",
      likes: 999,
    });
  });

  test("returns blog with the most likes from a longer list", () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
