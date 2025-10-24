require('dotenv').config();
console.log("server starting");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { waitlistRouter } = require('./routes/waitlist');
const { userRouter } = require('./routes/user');

const app = express(); // declare app first

// Middleware
app.use(cors());       
app.use(express.json());

app.use("/v1/api", userRouter);
app.use("/v2/api/", waitlistRouter);
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
}

main();
