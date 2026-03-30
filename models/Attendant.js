import mongoose from "mongoose";

const attendantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	staffId: {
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

const Attendant = mongoose.model("Attendant", attendantSchema);

export default Attendant;
