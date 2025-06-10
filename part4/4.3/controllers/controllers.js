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

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch( err => {
      response.status(400).json(err)
    })
})

export default blogRouter