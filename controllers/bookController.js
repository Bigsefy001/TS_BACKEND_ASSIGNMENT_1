import Book from "../models/Book.js";
import Student from "../models/Student.js";
import Attendant from "../models/Attendant.js";

export const createBook = async (req, res) => {
  try {
    const { title, isbn, authors, status, borrowedBy, issuedBy, returnDate } = req.body;
    const book = new Book({
      title,
      isbn,
      authors,
      status,
      borrowedBy,
      issuedBy,
      returnDate,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    // Duplicate ISBN error handling
    if (err.code === 11000 && err.keyPattern && err.keyPattern.isbn) {
      return res.status(400).json({ error: "A book with this ISBN already exists." });
    }
    res.status(400).json({ error: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    // Search
    const query = {};
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.author) {
      // Find author IDs matching the name
      const Author = (await import("../models/Author.js")).default;
      const authors = await Author.find({ name: { $regex: req.query.author, $options: "i" } }, "_id");
      query.authors = { $in: authors.map(a => a._id) };
    }

    const books = await Book.find(query)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy")
      .skip(skip)
      .limit(limit);

    // Optionally, return total count for pagination
    const total = await Book.countDocuments(query);

    res.json({
      page,
      limit,
      total,
      books
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, isbn, authors, status, borrowedBy, issuedBy, returnDate } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, isbn, authors, status, borrowedBy, issuedBy, returnDate },
      { new: true, runValidators: true }
    )
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status === "OUT") return res.status(400).json({ error: "Book already borrowed" });

    const { studentId, attendantId, returnDate } = req.body;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });
    const attendant = await Attendant.findById(attendantId);
    if (!attendant) return res.status(404).json({ error: "Attendant not found" });

    book.status = "OUT";
    book.borrowedBy = student._id;
    book.issuedBy = attendant._id;
    book.returnDate = returnDate || null;
    await book.save();

    await book.populate("authors borrowedBy issuedBy");
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.status === "IN") return res.status(400).json({ error: "Book is not borrowed" });

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;
    await book.save();

    await book.populate("authors");
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};