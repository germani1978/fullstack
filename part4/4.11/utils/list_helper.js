const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let mayor = null
  blogs.forEach(blog => {
    if (mayor === null) {
      mayor = blog
    }else if (mayor.likes < blog.like) mayor = blog
  })

  if (mayor === null) return null

  return {
    title: mayor.title,
    author: mayor.author,
    likes: mayor.likes
  }
}

const mostBlogs = (blogs) => {

  //agrupar por author
  const result = {}

  blogs.forEach(blog => {
    if (!result[blog.author]) result[blog.author] = 1
    else result[blog.author]++
  })

  let mayorAuthor = null
  for (const author in result) {
    if (mayorAuthor === null) {
      mayorAuthor = {
        author: author,
        blogs: result[author]
      }
    }else if (result[author] > mayorAuthor.blogs) {
      mayorAuthor = {
        author: author,
        blogs: result[author]
      }
    }
  }

  return mayorAuthor

}

const mostLikes = (blogs) => {

  //agrupar por author
  const result = {}

  blogs.forEach(blog => {
    if (!result[blog.author]) result[blog.author] = 0
    result[blog.author] = result[blog.author]+blog.likes
  })

  console.log(result)

  let mayorAuthor = null

  for (const author in result) {
    if (mayorAuthor === null) {
      mayorAuthor = {
        author: author,
        likes: result[author]
      }
    }else if (result[author] > mayorAuthor.likes) {
      mayorAuthor = {
        author: author,
        likes: result[author]
      }
    }
  }

  return mayorAuthor

}



export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }