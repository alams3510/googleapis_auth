const axios = require("axios");
const { oauth2client } = require("../utils/googleConfig");
const UserModal = require("../model/userModal");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("code", code);
    const responseToken = await oauth2client.getToken(code);
    console.log("accessToken", responseToken.tokens.access_token);
    oauth2client.setCredentials(responseToken.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${responseToken.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;
    let user = await UserModal.findOne({ email });
    if (!user) {
      user = UserModal.create({
        name,
        email,
        image: picture,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    return res
      .status(200)
      .json({ token, user, message: "LoggedIn successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
    console.error(error);
  }
};

module.exports = googleLogin;
