const { OAuth2Client } = require('google-auth-library');
const { google } = require('../userdb'); //  destructure correctly
const { GOOGLE_CLIENT_ID } = require('../config');

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await google.findOne({ googleId: sub });
    if (!user) {
      user = await google.create({ googleId: sub, email, name, picture });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Google login failed' });
  }
};
