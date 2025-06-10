import {  describe, test } from 'node:test'
import assert  from 'node:assert'
import { dummy, favoriteBlog, mostBlogs, totalLikes } from '../utils/list_helper.js'

test('dummy returns 1', () => {
  const blogs = []
  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithSeveralBlogs =  [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'One horse',
      author: 'Peter ',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
      likes: 3,
      __v: 1
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'One elephant',
      author: 'John S',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra70.pdf',
      likes: 1,
      __v: 2
    },

  ]

  const listWithSeveralAuthor =  [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'One horse',
      author: 'Peter',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
      likes: 7,
      __v: 1
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'One horse',
      author: 'Peter',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
      likes: 8,
      __v: 1
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'One elephant',
      author: 'John S',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra70.pdf',
      likes: 1,
      __v: 2
    },

  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listWithSeveralBlogs)
    assert.strictEqual(result, 9)
  })

  test('select the favoriteBlog', () => {
    const result = favoriteBlog(listWithSeveralBlogs)

    assert.deepStrictEqual(result, {
      title:'Go To Statement Considered Harmful',
      author:'Edsger W. Dijkstra',
      likes:5
    })
  })

  test('select author most blog', () => {
    const result = mostBlogs(listWithSeveralAuthor)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    })
  })


})







