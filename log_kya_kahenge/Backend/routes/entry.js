import express from 'express';
import Entry from '../models/Entry.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  const data = await Entry.find().sort({ timestamp: -1 });
  res.json(data);
});

export default router;
