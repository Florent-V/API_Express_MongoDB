import Movie from "../models/movie.model.js";

// Fonction pour récupérer le champ addedBy d'un film à l'aide de son id
export const getMovieOwner = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    req.ownerId = String(movie.addedBy);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
