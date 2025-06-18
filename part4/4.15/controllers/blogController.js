import express from 'express'
import { Blog } from '../models/blogModel.js'

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

blogRouter.put('/:id', async (request, response, next) => {

  try {
    const { title, author, url, likes } = request.body

    const blogUpdated = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author , url, likes },
      { new: true, runValidators: true, context: 'query' }
    )

    if (blogUpdated) {
      response.json(blogUpdated)
    } else {
      response.status(404).json({ err: 'Blog not found' })
    }

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