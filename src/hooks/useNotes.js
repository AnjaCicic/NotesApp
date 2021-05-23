import { useState } from 'react'
import { v4 } from 'uuid'

const sampleMarkdown =
  `This is a note
==============

Subtitle
--------


Shopping list:
* apples
* oranges
* toilet paper`;

const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [details, setDetails] = useState(null)

  // add new note
  const add = () => {
    const newNote = {
      id: v4(),
      source: sampleMarkdown,
    }
    setNotes([...notes, newNote])
    setDetails({ ...newNote, editing: true, edited: newNote.source })
  }

  const showDetails = id => {
    setDetails(notes.find(note => note.id === id))
  }

  const hideDetails = () => {
    setDetails(null)
  }

  const edit = edited => {
    setDetails({ ...details, editing: true, edited })
  }

  const cancelEditing = () => {
    setDetails({ ...details, editing: false, edited: details.source })
  }

  // update existing note
  const save = (id, note) => {
    setNotes(notes.map(item => item.id === id ? { id, source: note } : item))
    setDetails({ ...details, source: note, editing: false })
  }

  // delete note at index
  const remove = (id) => {
    setNotes(notes.filter(note => note.id !== id))
    setDetails(null)
  }

  return {
    notes,
    details,
    add,
    save,
    remove,
    showDetails,
    hideDetails,
    edit,
    cancelEditing,
  }
}

export default useNotes