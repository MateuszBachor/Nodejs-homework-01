const fs = require("fs").promises;
const path = require("path");

 const contactsPath = path.resolve("./db/contacts.json");
 

function listContacts() {
    fs.readFile(contactsPath)
    .then(data =>{
        const contactsList=JSON.parse(data.toString())
        console.table(contactsList)
        return contactsList;
    } )
    .catch(err => console.log(err.message));
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath)
    .then(data =>{
        const contactsList=JSON.parse(data.toString())
        if(!contactsList[contactId]){
            return "Error"
            console.log('Error')
        }
        contactsList.map(contact=>{
            if(contact.id===contactId.toString()){
                console.log(contact)
                return contact
            }
        })
    } )
    .catch(err => console.log(err.message));
  }
  
  function removeContact(contactId) {
    fs.readFile(contactsPath)
    .then(data =>{
      const contactsList=JSON.parse(data.toString())
      contact=contactId.toString()
      if(contactsList[contactId]){
        const result = contactsList.filter(elem=>elem.id!==contact)
        fs.writeFile(contactsPath, JSON.stringify(result));
        console.log(result)
        return result
      }else console.log('Error')
    } )
    .catch(err => console.log(err.message));
  }
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath)
    .then(data =>{
        const contactsList=JSON.parse(data.toString())
        const newContact={
            id:contactsList.length+1,
            name,
            email,
            phone
        }
        const result = [...contactsList, newContact]
        fs.writeFile(contactsPath, JSON.stringify(result));
        console.log(result)
        return result
    } )
    .catch(err => console.log(err.message));
  }
  module.exports={
    contactsPath,
    listContacts,
    getContactById,
    removeContact,
    addContact
 }