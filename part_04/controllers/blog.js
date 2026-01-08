const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}))
})

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    response.status(201).json(await blog.save())
  } catch (err) {
    if (err.name === 'ValidationError') {
      return response.status(400).json({ error: err.message })
    }
    return response.status(500).json({ error: 'internal server error' })
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
} )


blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes })

      if (!updatedBlog) {
        return response.status(404).end()
      }

      return response.json(updatedBlog)

    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

module.exports = blogRouter