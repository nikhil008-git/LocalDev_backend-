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
    const { name ,email, password } = parsedData.data;    
    const HashedPassword = await bcrypt.hash(password, 10);
   await userModel.create({
    name,          
    email,         
    password: HashedPassword  
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
userRouter.get('/profile', userMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await userModel.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = {
    userRouter : userRouter
}