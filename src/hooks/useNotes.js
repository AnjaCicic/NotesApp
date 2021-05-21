import { useState } from 'react'

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
  const [value, setValue] = useState([])

  // add new note
  const add = () => {
    const newNote = {
      id: 0,
      source: sampleMarkdown,
      editing: true,
    }
    setValue([...value, newNote])
  }

  // update existing note
  const update = (note) => {
    setValue(value.map(item => item.editing ? note : item))
  }

  // delete note at index
  const remove = (index) => {
    setValue(value.splice(index, 1))
  }

  return {
    value,
    add,
    update,
    remove
  }
}

export default useNotes;