const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const AuthRoute= require('./routes/auth');
const StoreRoute = require('./routes/store');
const RatingRoute = require('./routes/rating');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();


app.use("/api/auth", AuthRoute);
app.use("/api/stores", StoreRoute);
app.use("/api/ratings", RatingRoute);


// Connect to MongoDB


// Sample route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
