import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} from "../controllers/bookController.js";
import { requireFields } from "../middleware/validate.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/:id/borrow", requireFields(["studentId", "attendantId"]), borrowBook);
router.post("/:id/return", returnBook);

export default router;