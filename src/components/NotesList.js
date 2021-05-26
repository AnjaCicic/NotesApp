import Button from 'react-bootstrap/Button'
import { FaPlus } from 'react-icons/fa'

import { useNotesContext } from '../context/NotesContext'
import NoteMarkdown from './NoteMarkdown'

const NotesList = () => {
  const { notes, add, selectNote } = useNotesContext()
  const handleNoteClick = id => () => selectNote(id)

  return (
    <div className="notesList">
      <Button className="notesListCard addNoteBtn" onClick={add}>
        <FaPlus />
      </Button>
      {notes && notes.length
        ? notes.map(note => (
          <div
            key={note.id}
            className="notesListCard noteThumbnail"
            onClick={handleNoteClick(note.id)}
          >
            <NoteMarkdown className="noteThumbnailContent" source={note.source} />
          </div>
        ))
        : null}
    </div>
  )
}

export default NotesList