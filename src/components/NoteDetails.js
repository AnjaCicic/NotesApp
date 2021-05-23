import ReactMarkdown from 'react-markdown'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { FaArrowLeft, FaPen, FaTrash, FaSave } from 'react-icons/fa'

import { NotesConsumer } from '../context/NotesContext'

const NoteDetails = () => {
  const handleSourceChange = edit => e => edit(e.target.value)

  return (
    <NotesConsumer>
      {({ details: note, save, remove, edit, cancelEditing, hideDetails }) => (
        <div className="noteDetails">
          <Modal
            show={Boolean(note && note.id)}
            backdrop="static"
          >
            <Modal.Header>
              <div>
                <FaArrowLeft onClick={note && note.editing ? cancelEditing : hideDetails} />
              </div>
              <div>
                {note && note.editing
                  ? <FaSave onClick={() => save(note.id, note.edited)} />
                  : <FaPen onClick={() => edit(note.source)} />}
                <FaTrash onClick={() => remove(note && note.id)} />
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
        </div>
      )}
    </NotesConsumer>
  )
}

export default NoteDetails