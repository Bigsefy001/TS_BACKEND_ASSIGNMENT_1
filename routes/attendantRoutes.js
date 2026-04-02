import express from "express";
import {
  createAttendant,
  getAttendants,
  getAttendantById,
  updateAttendant,
  deleteAttendant,
} from "../controllers/attendantController.js";

const router = express.Router();

router.post("/", createAttendant);
router.get("/", getAttendants);
router.get("/:id", getAttendantById);
router.put("/:id", updateAttendant);
router.delete("/:id", deleteAttendant);

export default router;