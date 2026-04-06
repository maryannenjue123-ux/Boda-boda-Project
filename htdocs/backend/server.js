require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db-config'); // Assuming you set up a pg pool

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./Routes/auth');
const memberRoutes = require('./Routes/members');
const transactionRoutes = require('./Routes/transactions');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));