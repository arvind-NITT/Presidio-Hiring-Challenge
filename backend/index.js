// Load environment variables from .env file
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
const app = express();
app.use(cors());
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'build', 'index.html'));
});

// Import the connection function
import dbConnection from './db/dbConnection.js';

// Import any additional modules and initialize your app (e.g., Express)

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

app.listen(PORT, () => {
  
  console.log(`Server is running on port ${PORT}`);
});
