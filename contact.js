#!/usr/bin/env node

const program = require('commander')
const { prompt } = require('inquirer')
const {
  addContact,
  getContact,
  updateContact,
  deleteContact,
  getContactList
} = require('./logic')

const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ...'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ...'
  }
];

program
  .version('0.0.1')
  .description('Contact Management System')

program
  .command('addContact')
  .alias('a')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then(answers => addContact(answers))
  })

program
  .command('getContact <name>')
  .alias('g')
  .description('Get contact')
  .action(name => getContact(name))

program
  .command('updateContact <_id>')
  .alias('u')
  .description('Update contact by id')
  .action((_id) => {
    prompt(questions).then(answers => updateContact(answers))
  })

program
  .command('deleteContact <_id>')
  .alias('d')
  .description('Delete contact by id')
  .action((_id) => deleteContact(_id))

program
  .command('getContactList')
  .alias('l')
  .description('Get all contacts')
  .action(() => getContactList())

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv)
