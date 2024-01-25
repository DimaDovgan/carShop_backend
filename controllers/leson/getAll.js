const Contact = require("../../models/leson");
const getAll = async (req, res, next) => {
  const { page = 1, limit = 10,favorite=false } = req.query;
  const skip = (page - 1) * limit;
  const { id: owner } = req.user;

  try {
    const list = await Contact.find({ owner,favorite }, { createdAt: 0, updatedAt: 0 }, { skip: skip, limit:Number( limit) }).populate("owner","email");
  res.json(list);
    
  } catch (error) {
    next(error)
  }
}
module.exports = getAll;