import Button from 'react-bootstrap/Button'
import ReactMarkdown from 'react-markdown'
import { FaPlus } from 'react-icons/fa'

import { NotesConsumer } from '../context/NotesContext'

const NotesList = () => {
  return (
    <NotesConsumer>
      {({ notes, add, showDetails }) => (
        <div className="notesList">
          <Button className="notesListCard addNoteBtn" onClick={add}>
            <FaPlus />
          </Button>
          {notes && notes.length
            ? notes.map(note => (
              <div
                key={note.id}
                className="notesListCard noteThumbnail"
                onClick={() => showDetails(note.id)}
              >
                <ReactMarkdown className="noteThumbnailContent">
                  {note.source}
                </ReactMarkdown>
              </div>
            ))
            : null}
        </div>
      )}
    </NotesConsumer>
  )
}

export default NotesList