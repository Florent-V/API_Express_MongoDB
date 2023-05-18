import Book from '../models/book.model.js';

export const getBooks = async (req, res) => {
   try {
    console.log(req.query)
    const query = {
      pages:{ 
        $lt: req.query.max_pages || Infinity,
        $gt: req.query.min_pages || 0
      },
      title: { $regex: req.query.title || '', $options: 'i' },
      author: { $regex: req.query.author || '', $options: 'i' },
      isRead: req.query.isRead || { $in: [true, false] }
    }
    // vérifier si le role est admin
    if (req.payload.role !== 'admin') query.addedBy = req.payload.sub;
    const books = await Book.find(query);
    console.log(books.length)
    res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
  console.log(req.params)
   try {
      const book = await Book.findOne({ _id: req.params.id });
      if (!book) return res.status(404).json({ message: "Le livre n'a pas été trouvé" })
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
    ...req.body,
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
    ...req.body,
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

export const updatePagesRead = async (req, res) => {
  try {
    console.log(req.params)
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) return res.status(404).json({ message: "Le livre n'a pas été trouvé" })
    // test pour vérifier que le nombre de pages lues est bien un nombre, supérieur à 0 et inférieur au nombre de pages du livre, ou vaut "up", ou vaut "down"
    if (!(['up', 'down'].includes(req.params.pages) || (req.params.pages >= 0 && req.params.pages <= book.pages))) {
      return res.status(400).json({ message: `Le nombre de pages lues doit être un nombre, supérieur à 0 et inférieur au nombre de pages du livre(${book.pages}), ou vaut 'up', ou vaut 'down'` })
    }

    // switch pour les cas 1, -1, nombre
    switch (req.params.pages) {
      case 'up':
        if (book.pagesRead + 1 <= book.pages) book.pagesRead += 1
        break;
      case 'down':
        if (book.pagesRead - 1 >= 0) book.pagesRead -= 1
        break;
      default:
        book.pagesRead = req.params.pages;
        break;
    }
    await Book.updateOne({ _id: req.params.id }, book)
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}