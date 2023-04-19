const User = require('../models/users.model');

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async _id => {
     await User.findById(_id);
}

const registration = async (email, password, avatarURL) => {
  const user = new User({ email, password, avatarURL });
  user.setPassword(password);
  await user.save();
};

module.exports = {
  findByEmail,
  findById,
  registration,
};
