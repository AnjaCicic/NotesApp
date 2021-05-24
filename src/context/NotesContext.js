import React, { useState } from 'react'
import { v4 } from 'uuid'

import sampleMarkdown from '../constants/sampleMarkdown'

const useNotes = () => {
  const localNotes = JSON.parse(localStorage.getItem('notes'))
  const [notes, setNotes] = useState(localNotes || [])
  const [selected, setSelected] = useState(null)

  const selectNote = id => {
    setSelected(notes.find(note => note.id === id))
  }

  const editSelectedNote = () => setSelected({ ...selected, editing: true, edited: selected.source })

  const editSelectedNoteSource = source => {
    setSelected({ ...selected, edited: source })
  }

  // add new predefined note
  const add = () => {
    const newNote = {
      id: v4(),
      source: sampleMarkdown,
      editing: true,
    }
    setNotes([...notes, newNote])
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]))
  }

  // delete note at index
  const remove = (id) => {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  // update existing note
  const save = (id, note) => {
    const newNotes = notes.map(item => item.id === id ? { id, source: note } : item)

    setNotes(newNotes)
    setSelected({ ...selected, source: note, editing: false })
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  return {
    notes,
    selected,
    selectNote,
    editSelectedNote,
    editSelectedNoteSource,
    add,
    save,
    remove,
  }
}

const NotesContext = React.createContext()

const NotesProvider = (props) => {
  const notes = useNotes()

  return (
    <NotesContext.Provider value={notes}>
      {props.children}
    </NotesContext.Provider>
  );
}

export { NotesContext, NotesProvider, useNotes }