import mongoose from "mongoose";
import dotenv from "dotenv";
import Author from "./models/Author.js";
import Book from "./models/Book.js";
import Student from "./models/Student.js";
import Attendant from "./models/Attendant.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    // Clear existing data
    await Author.deleteMany({});
    await Book.deleteMany({});
    await Student.deleteMany({});
    await Attendant.deleteMany({});

    // Create sample authors
    const authors = await Author.insertMany([
      { name: "Jane Austen", bio: "English novelist." },
      { name: "George Orwell", bio: "English novelist and essayist." },
    ]);

    // Create sample students
    const students = await Student.insertMany([
      { name: "Alice Johnson", email: "alice@example.com", studentId: "S1001" },
      { name: "Bob Smith", email: "bob@example.com", studentId: "S1002" },
    ]);

    // Create sample attendants
    const attendants = await Attendant.insertMany([
      { name: "Sarah Lee", staffId: "A2001" },
      { name: "Tom Brown", staffId: "A2002" },
    ]);

    // Create sample books
    await Book.insertMany([
      {
        title: "Pride and Prejudice",
        isbn: "9780141439518",
        authors: [authors[0]._id],
        status: "IN",
        createdAt: new Date(),
      },
      {
        title: "1984",
        isbn: "9780451524935",
        authors: [authors[1]._id],
        status: "OUT",
        borrowedBy: students[0]._id,
        issuedBy: attendants[0]._id,
        returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        createdAt: new Date(),
      },
    ]);

    console.log("Sample data seeded!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
