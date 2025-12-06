require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
    name:  {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: function(v) {
          return /^\d{2,3}-\d+$/.test(v);
        },
      }
    },
})

const Contact = mongoose.model('Contact', contactSchema)

function getAllEntries() {
  return Contact.find({})
}

function findById(id) {
  return Contact.findById(id)
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

function updateById(id, data) {
  return Contact.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true, context: 'query' }
  )
}

module.exports = {
  getAllEntries,
  findById,
  createContact,
  deleteById,
  countAll,
  updateById,
}