const User = require("../../models/user");

const logout = async (req, res) => {
    console.log("logaut")
    const { _id } = req.user;
    await User.findOneAndUpdate(_id, { token: "" })
    res.status(204).send();
}

module.exports = logout;