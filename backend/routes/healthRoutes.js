const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const HealthEntry = require("../models/HealthEntry")

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const newEntry = new HealthEntry({
      ...req.body,
      user: req.user.id
    })
    await newEntry.save()
    res.status(201).json({
      message: "Health entry added",
      data: newEntry
    })
  } 
  
  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
  
})

router.get("/", authMiddleware, async (req, res) => {

  try {
    const entries = await HealthEntry.find({
      user: req.user.id
    }).sort({ date: -1 })
    res.status(200).json(entries)
  } 
  
  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }

})

router.delete("/:id", authMiddleware, async (req, res) => {

  try {
    const entry = await HealthEntry.findById(req.params.id)
    if (!entry) {
      return res.status(404).json({
        message: "Entry not found"
      })
    }
    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    await HealthEntry.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "Entry deleted successfully"
    })
  }

  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }

})

router.put("/:id", authMiddleware, async (req, res) => {

  try {
    const entry = await HealthEntry.findById(req.params.id)
    if (!entry) {
      return res.status(404).json({
        message: "Entry not found"
      })
    }
    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    const updatedEntry = await HealthEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedEntry)
  }

  catch (error) {
    res.status(500).json({
      error: error.message
    })
  }

})

module.exports = router