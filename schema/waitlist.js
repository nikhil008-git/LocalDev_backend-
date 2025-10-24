const { z } = require('zod');
const userWaitlistSchema = z.object({
    email : z.string().email()
});
module.exports = {
    userWaitlistSchema
};