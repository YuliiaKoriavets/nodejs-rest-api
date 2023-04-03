const express = require('express');
const service = require('../../services/contacts.service');
const { contactSchema, contactUpdateSchema } = require('../../schemas/contact.schema');
const {authMiddleware } = require('../../middlewares/index')
const router = express.Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const {_id} = req.user
    const contacts = await service.getAllContacts(_id);
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

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    const { name, email, phone, favorite } = req.body;
    const {_id} = req.user
    const newContact = await service.createContact({ name, email, phone, favorite }, _id);
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
