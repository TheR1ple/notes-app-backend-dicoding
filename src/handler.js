/* eslint-disable linebreak-style */
const {nanoid} = require('nanoid');
const notes = require('./notes');

// Menambahkan data notes
const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;

  // Deklarasi id, tanggal dibuat dan tanggal update
  const id = nanoid(8);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  // Validasi data
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note successfuly added',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note failed to add',
  });
  response.code(500);
  return response;
};

// Menampilkan Data
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// Menampilkan data Notes
const getNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found',
  });
  response.code(404);
  return response;
};

// Edit Notes
const editNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const {title, tags, body} = request.payload;
  const updateAt = new Date().toISOString();

  // Validasi Note dengan Index Id
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Notes successfuly updated',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note failed to update, ID not found',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = notes.findIndex((note) => note.id) === id;

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Note successfuly deleted',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note failed to delete, ID not found',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
