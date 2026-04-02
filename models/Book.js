import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	isbn: {
		type: String,
		unique: true,
		sparse: true, // Allows multiple docs with missing ISBN
		trim: true,
	},
	authors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author",
			required: true,
		},
	],
	status: {
		type: String,
		enum: ["IN", "OUT"],
		default: "IN",
	},
	borrowedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		default: null,
	},
	issuedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Attendant",
		default: null,
	},
	returnDate: {
		type: Date,
		default: null,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
