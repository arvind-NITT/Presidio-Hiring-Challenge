// Load environment variables from .env file
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Import the connection function
import dbConnection from './db/dbConnection.js';

// Import any additional modules and initialize your app (e.g., Express)
import express from 'express';
const app = express();
app.use(cors());
// Connect to MongoDB
//connectionDb();
dbConnection();

// Middleware and routes
app.use(express.json());

//stup routes
import authRoutes from './routes/auth.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import buyerRoutes from './routes/buyer.routes.js';
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/seller',sellerRoutes);
app.use('/api/v1/buyer',buyerRoutes);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
const frontendBuildPath = path.resolve(__dirname, "../frontend/build");
  app.use(express.static(frontendBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
