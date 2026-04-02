import Attendant from "../models/Attendant.js";

export const createAttendant = async (req, res) => {
  try {
    const { name, staffId } = req.body;
    const attendant = new Attendant({ name, staffId });
    await attendant.save();
    res.status(201).json(attendant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find();
    res.json(attendants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAttendantById = async (req, res) => {
  try {
    const attendant = await Attendant.findById(req.params.id);
    if (!attendant) {
      return res.status(404).json({ error: "Attendant not found" });
    }
    res.json(attendant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAttendant = async (req, res) => {
  try {
    const { name, staffId } = req.body;
    const attendant = await Attendant.findByIdAndUpdate(
      req.params.id,
      { name, staffId },
      { new: true, runValidators: true }
    );
    if (!attendant) {
      return res.status(404).json({ error: "Attendant not found" });
    }
    res.json(attendant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAttendant = async (req, res) => {
  try {
    const attendant = await Attendant.findByIdAndDelete(req.params.id);
    if (!attendant) {
      return res.status(404).json({ error: "Attendant not found" });
    }
    res.json({ message: "Attendant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};