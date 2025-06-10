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

export { dummy, totalLikes, favoriteBlog }