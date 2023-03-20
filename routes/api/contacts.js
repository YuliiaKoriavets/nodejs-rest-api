const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const { contactSchema, contactUpdateSchema } = require('../../schemas/contact.schema');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    const {name, email, phone} = req.body
    const newContact = await addContact(name, email, phone);
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!contactId) {
      return res.status(404).json({ message: 'Not found' });
    }
    await removeContact(contactId);
    return res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    console.log(req.body)
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
