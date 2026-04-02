import express from 'express'; 
import { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } from '../controllers/authorController.js';

const router = express.Router();

// Create a new author
router.post('/', createAuthor);

// Get all authors
router.get('/', getAuthors);

// Get a single author by ID
router.get('/:id', getAuthorById);

// Update an author by ID
router.put('/:id', updateAuthor);

// Delete an author by ID
router.delete('/:id', deleteAuthor);

export default router;

