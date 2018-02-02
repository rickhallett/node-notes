console.log('notes.js initialised');

const fs = require('fs');
const fileName = 'node-notes.json';
const emptyJSON = {};

let fetchNotes = () => {
  //check to see if notes file exists and is valid
  try {
    return JSON.parse(fs.readFileSync(fileName));
  } catch (e) {
    return [];;
  }
}

let saveNotes = (notes) => {
    fs.writeFile(fileName, JSON.stringify(notes))
}

let addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  }
  let duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }


};

let getAll = () => {
  console.log(`get notes`);
};

let getNote = (title) => {
  console.log(`read note`, title);
};

let deleteNote = (title) => {
  //fetch notes
  let notes = fetchNotes();
  //filter notes with note title
  //save new notes array
  saveNotes(notes.filter(note => note.title !== title));
};

module.exports = {
  addNote, //ES6 equivalent to addNote: addNote
  getAll,
  getNote,
  deleteNote
}