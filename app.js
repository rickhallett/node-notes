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
const readline = require('readline');
const timers = require('timers')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'NodeNotes> '
});

const notes = require('./notes.js')

let displayMenu = () => {
  console.log(`Your current active file is ${notes.fileName}\n`);
  console.log(`Please enter one of the following commands: \n"add" to add a new note to ${notes.fileName} \n"read" to read a note \n"list" to list all stored notes in ${notes.fileName} \n"delete" to remove a note \n"change-file" to change the active file\n`);
}

let takeInput = () => {
  return rl.prompt();
}

let navigate = (command, title, body) => {
  switch (command.trim()) {
    case 'add':
      let newNote = notes.addNote(title, body);
      console.log((!newNote) ? `Note with title:\n${title} already exists. Please try again.` : `Note created. \n`);
      break;
    case 'list':
      let allNotes = notes.getAll();
      console.log(`Printing ${allNotes.length} note(s).`);
      allNotes.forEach(note => notes.logNote(note));
      break;
    case 'read':
    debugger;
      let note = notes.getNote(title);
      console.log((note) ? notes.logNote(note) : `Note title: "${title}" not found.`);
      break;
    case 'delete':
      let deleted = notes.deleteNote(title);
      console.log((deleted) ? `Note deleted.` : `Note title: "${title}" not found.`);
      break;
    case 'change-file':
      notes.changeFile(filename);
      break;
    case 'exit':
      console.log('Have a great day!');
      process.exit(0);
      break;
    default:
      console.log('Command Not Recognised');
      break;
  }
}

//-------------
//begin runtime
//-------------
console.log('\nWelcome to NodeNotes!');
displayMenu();

let inputData = {};

rl.question('What would you like to do first? ', (firstAnswer) => {
  inputData.command = firstAnswer;
  // debugger;
  if(firstAnswer === 'add') {
    rl.question('Enter note title: ', (secondAnswer) => {
      inputData.title = secondAnswer;
      rl.question('Enter note text: ', (thirdAnswer) => {
        inputData.body = thirdAnswer;
      });
    });
  }
  if (firstAnswer === 'read') {
    rl.question('Enter note title: ', (secondAnswer) => {
      inputData.title = secondAnswer;
    
    });
  }
});

rl.on('line', (line) => {
  navigate(inputData.command, inputData.title, inputData.body);
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
