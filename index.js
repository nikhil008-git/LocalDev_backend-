// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { waitlistRouter } = require('./routes/waitlist');
const { userRouter } = require('./routes/user');

const app = express();

// Config
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // request logging

// API routes
app.use("/v1/api", userRouter);
app.use("/v2/api", waitlistRouter);

// Serve frontend static files
const frontendPath = path.join(__dirname, '../localdev-frontend/dist');
app.use(express.static(frontendPath));

// // Catch-all route for React Router
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(frontendPath, 'index.html'));
// });

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MongoDB and start server
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");

        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1); // stop server if DB fails
    }
}

main();
