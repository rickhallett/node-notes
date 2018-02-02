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
  fs.writeFile(fileName, JSON.stringify(notes), (error) => { console.log(error) });
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

let logNote = (note) => {
  console.log(`-----------------------------------\n \nTitle: ${ note.title } \nText: ${ note.body }\n`);
}

let getAll = () => {
  return fetchNotes();
};

let getNote = (title) => {
  //fetch notes
  let notes = fetchNotes();
  //find and print searched note
  for (const title in notes) {
    if (notes.hasOwnProperty(title)) {
      return notes[title];
    }
  return false;
  }
};

let deleteNote = (title) => {
  //fetch notes
  let notes = fetchNotes();
  //filter notes with note title
  let filteredNotes = notes.filter(note => note.title !== title)
  //save new notes array
  saveNotes(filteredNotes);
  //confirm successfull deletion
  return filteredNotes < notes ? true : false;
};

module.exports = {
  addNote, //ES6 equivalent to addNote: addNote
  getAll,
  getNote,
  deleteNote,
  logNote
}