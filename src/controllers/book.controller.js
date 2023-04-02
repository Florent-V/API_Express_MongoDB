import Book from '../models/book.model.js';

export const getBooks = async (req, res) => {
   try {
    console.log(req.query)
      const books = await Book.find({
        pages:{ $lt: req.query.max_pages || Infinity, $gt: req.query.min_pages || 0},
        title: { $regex: req.query.title || '', $options: 'i' },
        author: { $regex: req.query.author || '', $options: 'i' },
        isRead: req.query.isRead || { $in: [true, false] }
      });
      console.log(books.length)
      res.json(books);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const getBookById = async (req, res) => {

   try {
      const book = await Book.findOne({ _id: req.params.id });
      res.json(book);
   } catch (error) {
      res.status(404).json({ 
        message: 'Le livre n\'a pas été trouvé.',
        error: error
      });
  }
};

export const createBook = async (req, res) => {
   const book = new Book({
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      isRead: req.body.isRead
   });

   try {
      const newBook = await book.save();
      res.status(201).json(newBook);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

export const updateBook = async (req, res) => {
  const book = new Book({
    _id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    isRead: req.body.isRead
  });
   try {
      await Book.updateOne({ _id: req.params.id }, book)
      res.json(book);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

export const deleteBook = async (req, res) => {
  try {
      await Book.deleteOne({ _id: req.params.id });
      res.json({ message: 'Le livre a été supprimé.' });
  } catch (error) {
    res.status(404).json({ 
      message: 'Le livre n\'a pas été trouvé.',
      error: error
    });
  }
};