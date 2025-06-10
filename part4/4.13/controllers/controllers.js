import express from 'express'
import { Blog } from '../models/models.js'

const blogRouter = express.Router()

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch( err => {
      response.status(400).json(err)
    })
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const saveBlog = await blog.save()
    response.status(201).json(saveBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response , next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default blogRouter