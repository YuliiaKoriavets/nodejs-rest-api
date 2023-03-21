const path = require("path")
const fs = require("fs/promises")
const ObjectId = require('bson-objectid');

const contactsPath = path.join(__dirname, "contacts.json");

const updateFile = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        return contacts;
  }

async function getContactById(contactId) {
    const contacts = await listContacts()
    const contact = contacts.find(({id}) => id === contactId)
    if(!contact){
      return null
    }
    return contact;
}
  
 async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const id = String(ObjectId())
    const newContact = {
        id,
        name,
        email,
        phone,
    }
    contacts.push(newContact)
    await updateFile(contacts)
    return newContact
  }

  async function removeContact(contactId) {
    const contacts = await listContacts()
    const contactIndex = contacts.findIndex(({id}) => id === contactId)
    if (contactIndex === -1) {
        return null;
    }
    const newContacts = contacts.filter(({id}) => id !== contactId)
    await updateFile(newContacts)
  }

  async function updateContact(contactId, body){
    const contacts = await listContacts()
    const contactIndex = contacts.findIndex(({id}) => id === contactId)
    if (contactIndex === -1) {
        console.log('Contact is not found');
        return;
    }
    if (!body) {
      return null;
    }
    contacts[contactIndex] = { ...contacts[contactIndex], ...body };
    await updateFile(contacts)
    return contacts[contactIndex];
  }

  module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  }