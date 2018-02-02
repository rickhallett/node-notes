/**
 * Implementation List:
 * custom fileName - set default, list current files, change active file
 */

console.log('app.js initialised');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')
const argv = yargs.argv;

let command = argv._[0]
// console.log(`Command: ${command}`);
// console.log('Yargs:', argv);

if (command === 'add') {
  let newNote = notes.addNote(argv.title, argv.body);
  console.log((!newNote) ? `Note with title:\n${argv.title} already exists. Please try again.` : `Note created. \n Title: ${argv.title} \n Text: ${argv.body}`);
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'get') {
  notes.getNote(argv.title);
} else if (command === 'delete') {
  notes.deleteNote(argv.title);
} else {
  console.log('Command Not Recognised');
}