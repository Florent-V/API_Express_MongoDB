import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  isRead: {
    type: Boolean,
    required: true
  },
  pagesRead: {
    type: Number,
    default: 0,
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{ timestamps: true});

bookSchema.methods.toJSON = function() {
  const book = this;
  const bookObject = book.toObject();
  bookObject.id = bookObject._id;
  delete bookObject._id;
  delete bookObject.__v;
  return bookObject;
}

const Book = mongoose.model('Book', bookSchema);

export default Book;
