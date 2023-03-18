const path = require("path")
const fs = require("fs/promises")

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
    const contact = contacts.find(({id}) => String(contactId) === id)
    return contact || null;
}
  
 async function addContact({name, email, phone}) {
    const contacts = await listContacts()
    const newContact = {
        id: String(contacts.length + 1),
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
    const contactIndex = contacts.findIndex(({id}) =>  String(contactId) === id)
    if (contactIndex === -1) {
        console.log('Contact is not found');
        return;
    }
    const newContacts = contacts.splice(contactIndex, 1)
    await updateFile(newContacts)
    return newContacts
  }

  async function updateContact(contactId, body){
    const contacts = await listContacts()
    const contactIndex = contacts.findIndex(({id}) =>  String(contactId) === id)
    if (contactIndex === -1) {
        console.log('Contact is not found');
        return;
    }
    contacts[contactIndex] = { id, ...body };
    await updateFile(contacts)
    return contacts[contactIndex]
  }

  module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  }