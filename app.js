console.log('app.js initialised');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')
const argv = yargs.argv;

let command = argv._[0]
console.log(`Command: ${command}`);
console.log('Yargs:', argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'get') {
  notes.getNote(argv.title);
} else if (command === 'delete') {
  notes.deleteNote(argv.title);
} else {
  console.log('Command Not Recognised');
}