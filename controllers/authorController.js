import Author from "../models/Author.js";

export const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = new Author({ name, bio });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true }
    );
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
