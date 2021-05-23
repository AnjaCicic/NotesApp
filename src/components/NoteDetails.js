import ReactMarkdown from 'react-markdown'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { FaArrowLeft, FaPen, FaTrash, FaSave } from 'react-icons/fa'

import { NotesConsumer } from '../context/NotesContext'

const NoteDetails = () => {
  const handleSourceChange = edit => e => edit(e.target.value)
  const handleCloseModal = (note, hideDetails) => () => {
    if (!note.editing || note.source === note.edited) {
      hideDetails()
      return
    }

    if(window.confirm('Are you sure you want to exit without saving?')){
      hideDetails()
    }
  }
  const handleDeleteNote = (id, remove) => () => {
    if(window.confirm('Are you sure you want to delete this note?')){
      remove(id)
    }
  }

  return (
    <NotesConsumer>
      {({ details: note, save, remove, edit, hideDetails }) => (
        <Modal
          className="noteDetails"
          show={Boolean(note && note.id)}
          backdrop="static"
        >
          <Modal.Header>
            <div>
              <FaArrowLeft onClick={handleCloseModal(note, hideDetails)} />
            </div>
            <div>
              {note && note.editing
                ? <FaSave onClick={() => save(note.id, note.edited)} />
                : <FaPen onClick={() => edit(note.source)} />}
              <FaTrash onClick={handleDeleteNote(note && note.id, remove)} />
            </div>
          </Modal.Header>
          <Modal.Body>
            {note && note.editing
              ? <Form.Control value={note.edited} as={'textarea'} onChange={handleSourceChange(edit)} />
              : (
                <ReactMarkdown>
                  {note && note.source ? note.source : ''}
                </ReactMarkdown>
              )}
          </Modal.Body>
        </Modal>
      )}
    </NotesConsumer>
  )
}

export default NoteDetails