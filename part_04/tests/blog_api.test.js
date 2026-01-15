const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const assert = require("node:assert");
const Blog = require("../models/blog");
const { title } = require("node:process");

const api = supertest(app);

let token = null;

beforeEach(async () => {
  await Blog.deleteMany({});
  await helper.createTestUser();

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" })
    .expect(200);

  token = loginResponse.body.token;
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("is id, not _id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      assert.ok(blog.id);
    });
  });
  describe("addition of new blogs", () => {
    test("post new and check if increased by one", async () => {
      const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((n) => n.title);
      assert(titles.includes("Go To Statement Considered Harmful"));
    });

    test("check if created without likes get zero", async () => {
      const newBlog = {
        title: "This should have zero likes",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      };
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0);
    });

    test("return 400 on no title", async () => {
      const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      };
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);
    });

    test("return 400 on no url", async () => {
      const newBlog = {
        title: "Test Title for return 400 on missing url",
        author: "Edsger W. Dijkstra",
      };
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);
    });
  });
  describe("manipulation of blogs", () => {
    test("a blog can be deleted", async () => {
      const newBlog = {
        title: "This should have zero likes",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      };
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[blogsAtStart.length - 1];
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      const ids = blogsAtEnd.map((n) => n.id);
      assert(!ids.includes(blogToDelete.id));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      //not minus one because of workaround since intial blogs does not pass a user that we can use
    });

    test("update likes", async () => {
      const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
      };

      const created = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const createdId = created.body.id;

      await api
        .put(`/api/blogs/${createdId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ likes: 123 })
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });
});
after(async () => {
  await mongoose.connection.close();
});
