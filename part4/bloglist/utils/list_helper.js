const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, item) => sum + item.likes, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => (max && max.likes > blog.likes ? max : blog),
    null
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
