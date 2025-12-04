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

if (process.argv[2]) {
    
    const contact = new Contact({
        name: process.argv[2],
        number: process.argv[3],
    })
    
    contact.save().then(result => {
        console.log('contact saved!')
        mongoose.connection.close()
    })
    
} else {
    Contact.find({}).then(result => {
          result.forEach(contact => {
                console.log(contact)
  })
  mongoose.connection.close()
  
})
}

