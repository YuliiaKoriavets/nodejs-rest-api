const express = require('express');
const service = require('../../services/contacts.service');
const { contactSchema, contactUpdateSchema } = require('../../schemas/contact.schema');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContactById(contactId);
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
    const { name, email, phone, favorite } = req.body;
    const newContact = await service.createContact({ name, email, phone, favorite });
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
    await service.removeContact(contactId);
    return res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const contact = await service.updateContact(contactId, { name, email, phone, favorite });
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const { contactId } = req.params;
    const { favorite = false } = req.body;
    const contact = await service.updateContact(contactId, { favorite });
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
