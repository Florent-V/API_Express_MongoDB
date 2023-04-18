import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  isWatched: {
    type: Boolean,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true 
  },
  duration: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // actors: {
  //   type: Array,
  //   required: true
  // },
  // comments: {
  //   type: Array,
  //   required: true
  // }
},
{ timestamps: true});

movieSchema.methods.toJSON = function() {
  const movie = this;
  const movieObject = movie.toObject();
  movieObject.id = movieObject._id;
  delete movieObject._id;
  delete movieObject.__v;
  return movieObject;
}

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
