const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, item) => sum + item.likes, 0)
  return sum
}

// There might more elegant and "correct" way to do this with lodash, but this has to at this moment
const mostBlogs = (blogs) => {
  const mostBlogsAuthor = _(blogs).countBy('author').toPairs().max(_.last)
  return blogs.length === 0
    ? undefined
    : {
        author: mostBlogsAuthor[0],
        blogs: mostBlogsAuthor[1],
      }
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
  favoriteBlog,
  mostBlogs,
}
