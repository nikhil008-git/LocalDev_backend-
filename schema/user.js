const { z } = require('zod');

const userSignupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().min(2),
    
});

const userSigninSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
});


module.exports = {
    userSignupSchema,
    userSigninSchema,
};