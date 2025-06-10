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

test('testing to add a blog', async () => {
  const newBlog = {
    title: 'Tercer blog',
    author: 'Autor B',
    url: 'http://blog-b.com',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  //check if added one
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('Tercer blog'))
})

test('check id added blog without likes', async () => {
  const newBlog = {
    title: 'Blog sin likes',
    author: 'Autor sin likes',
    url: 'http://nolikes.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes,0)

})

test('the title or url is missing', async () => {
  const blogSinTitle = {
    author: 'Autor conocido',
    url: 'http://example.com',
    likes: 5
  }

  const blogSinUrl = {
    title: 'Título sin URL',
    author: 'Autor conocido',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogSinTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogSinUrl)
    .expect(400)

})

test('delete a blog', async() => {
  const nuevoBlog = new Blog({
    title: 'Blog para eliminar',
    author: 'Autor X',
    url: 'http://borrar.com',
    likes: 1
  })

  const blogGuardado = await nuevoBlog.save()
  const blogIdToEliminate = blogGuardado.id

  await api
    .delete(`/api/blogs/${blogIdToEliminate}`)
    .expect(204)


  const blogEliminated = await Blog.findById(blogIdToEliminate)
  assert.strictEqual(blogEliminated, null)
})

test('likes updated' , async () => {

  const newBlog = new Blog({
    title: 'Blog para actualizar',
    author: 'Autor Y',
    url: 'http://update.com',
    likes: 2
  })

  const blogSaved = await newBlog.save()

  const newLikes = { likes: 10 }

  const response = await api
    .put(`/api/blogs/${blogSaved.id}`)
    .send(newLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 10)

  const blogFinal = await Blog.findById(blogSaved.id)
  assert.strictEqual(blogFinal.likes, 10)
})



after(async () => {
  await mongoose.connection.close()
})