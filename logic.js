const mongoose = require('mongoose')
const assert = require('assert')
mongoose.Promise = global.Promise

const db = mongoose.connect('mongodb://localhost:27017/contact-manager')

const toLower = (value) => value.toLowerCase()

const contactSchema = mongoose.Schema({
  firstname: {
    type: String,
    set: toLower
  },
  lastname: {
    type: String,
    set: toLower
  },
  phone: {
    type: String,
    set: toLower
  },
  email: {
    type: String,
    set: toLower
  }
})

const Contact = mongoose.model('Contact', contactSchema)

const addContact = (contact) => {
  Contact.create(contact, (err) => {
    assert.equal(null, err)
    console.info('New contact added!')
    db.disconnect()
  })
}

const getContact = (name) => {
  const search = new RegExp(name, 'i')
  Contact.find({ $or: [{firstname: search}, {lastname: search}]})
  .exec((err, contact) => {
    contact.forEach((contact) => {
      console.info(`- ${contact.firstname}\n- ${contact.lastname}\n- ${contact.phone}\n- ${contact.email}`)
    })
    console.info(`\n${contact.length} matches found`)
    db.disconnect()
  })
}

module.exports = {
  addContact,
  getContact
}
