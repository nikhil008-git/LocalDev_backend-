const { Router } = require('express');
const { userModel } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
const { userMiddleware } = require('../middleware/user');
const bcrypt = require('bcrypt');
const {  userSignupSchema, userSigninSchema } = require ("../schema/user");

const { z } = require('zod');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const parsedData = userSignupSchema.safeParse(req.body);
    const { email, password , firstname , lastname } = parsedData.data;    
    const HashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
        email :email,
        password : HashedPassword,
        firstname : firstname,
        lastname : lastname
    });

    res.json({
        message : "User created successfully"
    })

});
 userRouter.post('/signin', async (req, res) => {
    const parsedData = userSigninSchema.safeParse(req.body);
    const { email, password } = parsedData.data;

    const user = await userModel.findOne({
        email : email,  
    })
    const matchedPassword = await bcrypt.compare(password, user.password);
 if(user && matchedPassword){
    const token = jwt.sign({id : user._id }, JWT_USER_PASSWORD);

    res.json({
        token:token     
    })
}else{
    res.status(401).json({  
        message : "Invalid email or password"
    })
}
});



module.exports = {
    userRouter : userRouter
}