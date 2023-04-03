const User = require('../models/users.model');

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async _id => {
     await User.findById(_id);
}

const registration = async (email, password) => {
  const user = new User({ email, password });
  user.setPassword(password);
  await user.save();
};

module.exports = {
  findByEmail,
  findById,
  registration,
};
