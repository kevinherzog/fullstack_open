require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

function getAllEntries() {
  return Contact.find({})
}

function findById(id) {
  return Contact.findById(id)
}

function findByName(name) {
  return Contact.findOne({ name })
}

function createContact({ name, number }) {
  const contact = new Contact({ name, number })
  return contact.save()
}

function deleteById(id) {
  return Contact.findByIdAndDelete(id)
}

function countAll() {
  return Contact.countDocuments({})
}

module.exports = {
  getAllEntries,
  findById,
  findByName,
  createContact,
  deleteById,
  countAll,
}