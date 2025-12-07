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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        let authorSave = ""
        let blogSave = 0

        const blogCounts = blogs.reduce((acc, blog) => {
            acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
        }, {})

        for (const [author, count] of Object.entries(blogCounts)) {
            if (count > blogSave) {
            blogSave = count
            authorSave = author
    }
  }

        const result = {
            author:  authorSave,
            blogs: blogSave
        }
        return result
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        let authorSave = ""
        let blogSave = 0

        const blogCounts = blogs.reduce((acc, blog) => {
            acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
        }, {})

        for (const [author, count] of Object.entries(blogCounts)) {
            if (count > blogSave) {
            blogSave = count
            authorSave = author
    }
  }

        const result = {
            author:  authorSave,
            blogs: blogSave
        }
        return result
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoritBlog,
  mostBlogs,
  mostLikes
}