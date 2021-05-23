import Button from 'react-bootstrap/Button'
import ReactMarkdown from 'react-markdown'

import { NotesConsumer } from '../context/NotesContext'

const NotesList = (props) => {
  return (
    <NotesConsumer>
      {({ notes, add, showDetails }) => (
        <div className="notesList">
          <Button className="addNoteBtn" onClick={add}>+</Button>
          {notes && notes.length
            ? notes.map(note => (
              <div key={note.id} className="noteThumbnail" onClick={() => showDetails(note.id)}>
                <ReactMarkdown>{note.source}</ReactMarkdown>
              </div>
            ))
            : null}
        </div>
      )}
    </NotesConsumer>
  )
}

export default NotesList