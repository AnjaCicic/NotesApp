import Button from 'react-bootstrap/Button'

import { NotesConsumer } from '../context/NotesContext'
import NoteThumbnail from './NoteThumbnail'

function NotesList(props) {
  return (
    <NotesConsumer>
      {({ value: notes, add }) => (
        <div className="notesList">
          <Button className="addNoteBtn" onClick={add}>+</Button>
          {notes && notes.length
            ? notes.map((note, index) => <NoteThumbnail key={index} note={note} />)
            : null}
        </div>
      )}
    </NotesConsumer>
  );
}

export default NotesList