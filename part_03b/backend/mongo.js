require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('contact', contactSchema)

function saveContact(nameEntry, numberEntry) {

    const contact = new Contact({
        name: nameEntry,
        number: numberEntry,
    })
    
    contact.save().then(result => {
        console.log(`added ${contact.name} number ${contact.number} to phonebook`)
        mongoose.connection.close()
    })
    
}

function getAllEntries() {
  return Contact.find({}).then(result => {
    mongoose.connection.close() 
    return result;       
  });
}

module.exports = { getAllEntries, saveContact }