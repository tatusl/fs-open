const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, item) => sum + item.likes, 0)
  return sum
}

const mostBlogs = (blogs) => _(blogs)
  .countBy('author')
  .toPairs()
  .map((blog) => ({ author: blog[0], blogs: blog[1] }))
  .maxBy('blogs')

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => (max && max.likes > blog.likes ? max : blog),
    undefined
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
