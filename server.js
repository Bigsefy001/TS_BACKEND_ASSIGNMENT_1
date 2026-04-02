import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authorRoutes from "./routes/authorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendantRoutes from "./routes/attendantRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/students", studentRoutes);
app.use("/attendants", attendantRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
	res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
