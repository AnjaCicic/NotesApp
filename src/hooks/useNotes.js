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
  const localNotes = JSON.parse(localStorage.getItem('notes'))
  const [notes, setNotes] = useState(localNotes || [])
  const [details, setDetails] = useState(null)

  // add new predefined note
  const add = () => {
    const newNote = {
      id: v4(),
      source: sampleMarkdown,
    }
    setNotes([...notes, newNote])
    setDetails({ ...newNote, editing: true, edited: newNote.source })
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]))
  }

  // delete note at index
  const remove = (id) => {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    setDetails(null)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  // open details modal
  const showDetails = id => {
    setDetails(notes.find(note => note.id === id))
  }

  // close details modal
  const hideDetails = () => {
    setDetails(null)
  }

  // handle note source edit
  const edit = edited => {
    setDetails({ ...details, editing: true, edited })
  }

  // update existing note
  const save = (id, note) => {
    const newNotes = notes.map(item => item.id === id ? { id, source: note } : item)

    setNotes(newNotes)
    setDetails({ ...details, source: note, editing: false })
    localStorage.setItem('notes', JSON.stringify(newNotes))
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
  }
}

export default useNotes