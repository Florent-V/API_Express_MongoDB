import Book from "../models/book.model.js";

// Fonction pour récupérer le champ addedBy d'un livre à l'aide de son id
export const getBookOwner = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    req.ownerId = String(book.addedBy);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
