require('dotenv').config()
console.log("server starting")
const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require ("./routes/user");


const app  = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);


async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("Server is listening on port 3000");
}
main();