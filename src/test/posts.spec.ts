import "reflect-metadata";
import assert from "assert";
import { postRepository } from "../backend/repositories/posts";
import { Post } from "../backend/entities/post.entity";
import { AppDataSource } from "../backend/db";

// todo taesu pointer: need to create a test DB as well

const PostEntity = AppDataSource.getRepository(Post);

const tmpUser = {
  id: 0,
};

const testPost = {
  author: "testAuthor",
  title: "testTitle",
  context: "testContext",
  user_id: 0,
  id: 0,
} as Post;

const testPost2 = {
  author: "testAuthor",
  title: "testTitle2",
  context: "testContext2",
  user_id: 0,
} as Post;
const testPost3 = {
  author: "testAuthor",
  title: "testTitle3",
  context: "testContext3",
  user_id: 1,
} as Post;

const tmpPost = new Post();

tmpPost.author = testPost.author;
tmpPost.title = testPost.title;
tmpPost.context = testPost.context;

describe("createPost", () => {
  beforeEach(async () => {
    try {
      await AppDataSource.initialize();
    } catch (err) {
      console.error(`err in beforeEach init:${err}`);
    }
  });

  afterEach(async () => {
    await PostEntity.delete({ author: testPost.author });
    await AppDataSource.destroy();
  });

  it("should create a new post", async () => {
    const expectedPost = await postRepository.createPost(tmpUser.id, {
      author: testPost.author,
      title: testPost.title,
      context: testPost.context,
    } as Post);

    assert.equal(expectedPost?.user_id, tmpUser.id);
    assert.equal(expectedPost?.author, tmpPost.author);
    assert.equal(expectedPost?.title, tmpPost.title);
    assert.equal(expectedPost?.context, tmpPost.context);
  });
});

describe("getAllPosts", () => {
  beforeEach(async () => {
    try {
      await AppDataSource.initialize();
    } catch (err) {
      console.error(`err in beforeEach init:${err}`);
    }
  });

  afterEach(async () => {
    await PostEntity.delete({ author: testPost.author });
    await AppDataSource.destroy();
  });
  it("should get all of posts", async () => {
    const posts = [testPost, testPost2, testPost3];
    await PostEntity.insert(posts);
    const expectedPosts = await postRepository.getAllPosts(tmpUser.id);
    expectedPosts.sort();
    assert.equal(expectedPosts.length, 2);
    assert.equal(expectedPosts[0].title, testPost.title);
    assert.equal(expectedPosts[1].title, testPost2.title);
  });
});

describe("updatePost", () => {
  beforeEach(async () => {
    try {
      await AppDataSource.initialize();
    } catch (err) {
      console.error(`err in beforeEach init:${err}`);
    }
  });

  afterEach(async () => {
    await PostEntity.delete({ author: testPost.author });
    await AppDataSource.destroy();
  });
  it("should update the post context", async () => {
    await PostEntity.insert(testPost);
    const updatedContext = "updatedContext";

    await postRepository.updatePost(testPost.id, updatedContext);

    const expectedPost = await PostEntity.findOneBy({ title: testPost.title });

    assert.equal(expectedPost?.title, testPost.title);
    assert.notEqual(expectedPost?.context, testPost.context);
    assert.equal(expectedPost?.context, updatedContext);
  });
});
