import Movie from "../models/movie.model.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      year: {
        $lt: req.query.max_year || Infinity,
        $gt: req.query.min_year || 0,
      },
      title: { $regex: req.query.title || "", $options: "i" },
      director: { $regex: req.query.director || "", $options: "i" },
      isWatched: req.query.isWatched || { $in: [true, false] },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    res.json(movie);
  } catch (error) {
    res.status(404).json({
      message: "Le film n'a pas été trouvé.",
      error: error,
    });
  }
}

export const createMovie = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    isWatched: req.body.isWatched,
    poster: req.body.poster,
    description: req.body.description,
    rating: req.body.rating,
    duration: req.body.duration,
    genre: req.body.genre,
    // actors: req.body.actors,
    // comments: req.body.comments,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateMovie = async (req, res) => {
  const movie = new Movie({
    _id: req.params.id,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    isWatched: req.body.isWatched,
    poster: req.body.poster,
    description: req.body.description,
    rating: req.body.rating,
    duration: req.body.duration,
    genre: req.body.genre,
    // actors: req.body.actors,
    // comments: req.body.comments,
  });
  try {
    await Movie.updateOne({ _id: req.params.id }, movie);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteMovie = async (req, res) => {
  try {
    await Movie.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Le film a bien été supprimé." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
