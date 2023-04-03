const Contact = require('../models/contacts.model');

const getAllContacts = _id => {
  return Contact.find({owner: _id});
};

const getContactById = id => {
  return Contact.findById(id);
};

const createContact = ({ name, email, phone, favorite }, _id) => {
  return Contact.create({ name, email, phone, favorite, owner: _id});
};

const updateContact = (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, { new: true });
};

const removeContact = id => {
  return Contact.findByIdAndRemove(id);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
