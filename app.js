/**
 * Implementation List:
 * custom fileName - set default, list current files, change active file
 * deleting notes - improve delete status log by returning for no deletion
 * navigation sysem that works at all suitable levels of the program but particularly the top level ie function main(); - NB: consider using shortcuts/flags to make UI less laborious
 * use yargs command docs to help create the navigation system text UI
 */

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')
const options = {
  yarg: {
    title: {
      describe: 'Title of note',
      demand: true,
      alias: 't'
    },
    body: {
      describe: 'Text body of note',
      demand: true,
      alias: 'b'
    }
  }
}
const argv = yargs
  .command('add', 'Add a new note', {
    title: options.yarg.title,
    body: options.yarg.body
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: options.yarg.title
  })
  .command('delete', 'Delete a note', {
    title: options.yarg.title
  })
  .help()
  .argv;

let command = argv._[0]
console.log(`\nCommand: ${command}\n`);
// console.log('Yargs:', argv);

if (command === 'add') {
  let newNote = notes.addNote(argv.title, argv.body);
  console.log((!newNote) ? `Note with title:\n${argv.title} already exists. Please try again.` : `Note created. \n`);
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note));
} else if (command === 'read') {
  let note = notes.getNote(argv.title);
  console.log((note) ? notes.logNote(note) : `Note title: "${argv.title}" not found.`);
} else if (command === 'delete') {
  let deleted = notes.deleteNote(argv.title);
  console.log((deleted) ? `Note deleted.` : `Note title: "${argv.title}" not found.`);
} else {
  console.log('Command Not Recognised');
}