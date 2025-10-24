const { Router } = require('express');
const { waitlistModel } = require('../db'); // import correct model
const { userWaitlistSchema } = require("../schema/waitlist");

const waitlistRouter = Router();

waitlistRouter.post('/waitlist/join', async (req, res) => {
    const parsedData = userWaitlistSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({ error: parsedData.error.errors });
    }

    const { email } = parsedData.data;

    try {
        await waitlistModel.create({ email });
        res.json({ message: "User added to waitlist successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add user to waitlist" });
    }
});

module.exports = { waitlistRouter };
