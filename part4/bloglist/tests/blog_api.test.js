const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await helper.clearDb()
  await helper.populateDb()
})

describe('GET /api/blogs', () => {
  test('correct amount of blog posts are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(helper.initialBlogs.length)
      })
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
