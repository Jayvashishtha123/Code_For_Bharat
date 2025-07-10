import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import entryRoutes from './routes/entry.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/logkyaGPT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/entry', entryRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));
