const fs = require('fs');

const fetchNotes = () => {
  try {
    const noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body,
  };
  const unique = notes.filter(item => item.title === title);
  if (unique.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const remove = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(item => item.title !== title);
  saveNotes(notes);
  return filteredNotes.length === notes.length;
};

const getNote = (title) => {
  const notes = fetchNotes();
  const filter = notes.filter(item => item.title === title);
  return filter[0];
};

const getAll = () => fetchNotes();

module.exports = {
  remove,
  addNote,
  getNote,
  getAll,
};

