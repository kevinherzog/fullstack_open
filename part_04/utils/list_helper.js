const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
})

const favoritBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const result = blogs.reduce((max, blog) =>
        blog.likes > max.likes ? blog : max
    )
        return result
    }
}


module.exports = {
  dummy,
  totalLikes,
  favoritBlog
}