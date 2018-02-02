console.log('notes.js initialised');

const fs = require('fs');

let addNote = (title, body) => {
  let fileName = 'node-notes.json';
  let notes = [];
  let note = {
    title,
    body
  }

  //check to see if notes file exists and is valid
  try {
    notes = JSON.parse(fs.readFileSync(fileName));
  } catch (e) {
    console.log(e);
    //print error relevant logs
    if (e instanceof SyntaxError) { 
      console.log(`File is corrupted or empty. Creating a new file under filename ${fileName}`);
    } else {
      console.log(`File doesn\'t exist, creating file under filename ${fileName}`);
    }
    //write 
    fs.writeFileSync('node-notes.json', JSON.stringify(note));
  }

  //if file exists and is valid, check file for note titles to prevent adding duplicates
  if (notes) {
    for (const title in notes) {
      if (notes.hasOwnProperty(title)) {
        console.log('A note with this title already exists. Please choose another.')
        return;
      } else {
        notes.push(note);
        fs.writeFileSync('node-notes.json', JSON.stringify(notes));
      }
    }
  } else {
    fs.writeFileSync('node-notes.json');
  }
  
  
};

let getAll = () => {
  console.log(`get notes`);
};

let getNote = (title) => {
  console.log(`read note`, title);
};

let deleteNote = (title) => {
  console.log(`delete Note`);
};

module.exports = {
  addNote, //ES6 equivalent to addNote: addNote
  getAll,
  getNote,
  deleteNote
}