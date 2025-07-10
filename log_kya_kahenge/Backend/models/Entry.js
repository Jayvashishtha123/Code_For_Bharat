import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  type: String, // "diary", "roast", "tts"
  content: String,
  response: String,
  user: String,
  score: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Entry', EntrySchema);
