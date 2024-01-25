const Leson = require("../../models/leson");
const giveLesonAll = async (req, res, next) => {
  const { id: owner } = req.user;
  console.log("owner",owner)
  try {
    const list = await Leson.find({ owner})
    // .populate("owner","email");
  res.json(list);
    
  } catch (error) {
    next(error)
  }
}
module.exports = giveLesonAll;
