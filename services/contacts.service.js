const Contact = require('../models/contacts')

const getAllContacts = async () => {
    return Contact.find()
  }
  
  const getContactById = (id) => {
    return Contact.findById(id)
  }
  
  const createContact = (contact) => {
    return Contact.create(contact)
  }
  
  const updateContact = (id, contact) => {
    return Contact.findByIdAndUpdate(id, contact, { new: true })
  }
  
  const removeContact = (id) => {
    return Contact.findByIdAndRemove(id)
  }
  
  module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact,
  }