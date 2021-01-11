const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs
  .reduce((sum, item) => sum + item.likes, 0)

const mostBlogs = (blogs) =>
  _(blogs)
    .countBy('author')
    .toPairs()
    .map((blog) => ({ author: blog[0], blogs: blog[1] }))
    .maxBy('blogs')

const favoriteBlog = (blogs) => blogs
  .reduce((max, blog) => (max && max.likes > blog.likes ? max : blog),
    undefined
  )

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
