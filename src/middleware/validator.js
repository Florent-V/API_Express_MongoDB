import Joi from "joi"

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    const valid = error == null

    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map(i => i.message).join(',')

      console.log("error", message)
      res.status(422).json({ error: message })
    }
  }
}

export const validateMovie = (req, res, next) => {
  req.body = { ...req.body, userId: req.payload.sub}
  const { title, director, year, isWatched, poster, description, rating, duration, genre, userId } = req.body
  const cleanRequestBody = {
    title,
    director,
    year,
    isWatched,
    poster : req.file ? req.file.filename : '',
    description,
    rating,
    duration,
    genre,
    addedBy: userId
  }
  console.log(cleanRequestBody)

  const { error } = movieSchema.validate(
    cleanRequestBody,
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    req.body = cleanRequestBody;
    console.log(req.body)
    next();
  }
}

export const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().min(1895).max((new Date()).getFullYear()).required(),
  isWatched: Joi.boolean().required(),
  poster: Joi.string().max(255).allow(''),
  description: Joi.string().max(2048).required(),
  rating: Joi.number().min(0).max(10).required(),
  duration: Joi.number().min(0).max(1000).required(),
  genre: Joi.string().required(),
  addedBy: Joi.string().hex().length(24).required()
  // actors: Joi.array().required(),
  // comments: Joi.array().required(),
})

// max (new Date()).getFullYear()

export const validateBook = (req, res, next) => {
  req.body = { ...req.body, userId: req.payload.sub}
  const { title, author, pages, isRead, userId, cover, pagesRead } = req.body
  const cleanRequestBody = {
    title,
    author,
    pages,
    pagesRead,
    isRead,
    addedBy: userId,
    cover: req.file.filename
  }
  console.log(cleanRequestBody)

  const { error } = bookSchema.validate(
    cleanRequestBody,
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    req.body = cleanRequestBody;
    next();
  }
}

export const bookSchema = Joi.object({
  title: Joi.string().max(255).required(),
  author: Joi.string().max(100).required(),
  pages: Joi.number().min(0).max(10000).required(),
  isRead: Joi.boolean().required(),
  pagesRead: Joi.number().min(0).max(Joi.ref('pages')).required(),
  addedBy: Joi.string().hex().length(24).required(),
  cover: Joi.string().max(255).allow(''),
})

export const validateUser = (req, res, next) => {
  const { username, email, password } = req.body
  const cleanRequestBody = { username, email, password }
  cleanRequestBody.role = "user"

  const { error } = userSchema.validate(
    cleanRequestBody,
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    req.body = cleanRequestBody;
    next();
  }
}

export const userSchema = Joi.object({
  username: Joi.string().max(255).required(),
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(8).max(255).required(),
  role: Joi.string().max(255).required()
})
