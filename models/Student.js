import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
	},
	studentId: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
