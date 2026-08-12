import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import petRoutes from './routes/petRoutes.js';

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/pets', petRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Virtual Pet API is running...');
});

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
