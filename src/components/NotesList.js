import Button from 'react-bootstrap/Button'
import ReactMarkdown from 'react-markdown'
import { FaPlus } from 'react-icons/fa'

import { useNotesContext } from '../context/NotesContext'

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
            <ReactMarkdown className="noteThumbnailContent">
              {note.source}
            </ReactMarkdown>
          </div>
        ))
        : null}
    </div>
  )
}

export default NotesList