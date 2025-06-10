import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import app from '../app.js'
import supertest  from 'supertest'
import assert  from 'assert'
import { Blog } from '../models/models.js'

const api = supertest(app)




const initialBlogs = [
  {
    title: 'Primer blog',
    author: 'Autor A',
    url: 'http://blog-a.com',
    likes: 3
  },
  {
    title: 'Segundo blog',
    author: 'Autor B',
    url: 'http://blog-b.com',
    likes: 7
  }
]

beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})


test('return json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return blogs', async() => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('check if id exist and is unique', async () => {

  //get not existing id
  const nonExistingId = async () => {
    const blog = new Blog({
      title: 'Primer blog',
      author: 'Autor A',
      url: 'http://blog-a.com',
      likes: 3
    })
    await blog.save()
    await blog.deleteOne()
    return blog.id.toString()
  }

  //check if id not exist
  const id  = await nonExistingId()
  const result = await Blog.findById(id)
  assert.equal(result, null)
})

after(async () => {
  await mongoose.connection.close()
})