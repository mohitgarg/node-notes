const fs = require('fs');
const os = require('os');

const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = {
    desribe:'Title of note!',
    demand:true,
    alias:'t'
}

const bodyOptions = {
    desribe:'Body of the note',
    demand:true,
    alias:'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
  title:titleOptions,
  body:bodyOptions
}).command('list', 'list all notes')
  .command('remove', 'Remove a note', {
  title:titleOptions
}).command('read', 'Read a note', {
  title:titleOptions
})
  .help().argv;
const command = argv._[0];

// console.log(command);
// console.log(argv);

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  return  note ? console.log(`Note Created with Titlt:${note.title},Body:${note.body}`) : console.log(`Please use a differnt title it already exist`);
} else if (command === 'remove') {
  var bool = notes.remove(argv.title);
  if(bool) {
    console.log('Failed to remove the note since it doesn\'t exist' );
  } else {
    console.log('Note has been succesfully removed')
  }
} else if (command === 'read') {
  const item = notes.getNote(argv.title);
 if(item){
   console.log(`Here is the note you requested with Titlt:${item.title},Body:${item.body}`)
 } else {
   console.log('Note not found!')
 }
} else if(command === 'list') {
  const item = notes.getAll();
  if(item) {
    return item.map(note => console.log(note))
  } else {
    console.log('No notes FOUND!!!');
  }
}


