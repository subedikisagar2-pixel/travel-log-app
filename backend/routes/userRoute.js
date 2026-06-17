import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//
// GET /api/users/:id
// Get single user profile
//
router.get("/users/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//
// PUT /api/users/:id
// Update user profile
//
router.put("/users/:id", protect, async (req, res) => {
  try {
    const { name, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//
// OPTIONAL
// GET /api/users
// Get all users (admin/testing)
//
router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
