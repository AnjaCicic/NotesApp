import ReactMarkdown from 'react-markdown'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { FaArrowLeft, FaPen, FaTrash, FaSave } from 'react-icons/fa'

import { useNotesContext } from '../context/NotesContext'

const NoteDetails = () => {
  const { save, remove, selectNote, selected, editSelectedNote, editSelectedNoteSource } = useNotesContext()

  if (!selected || !selected.id) return null

  const handleSourceChange = e => {console.log(e);editSelectedNoteSource(e.target.value)}
  const handleCloseModal = () => {
    if (window.confirm('Are you sure you want to exit edit mode?')) {
      selectNote(null)
      return
    }
  }

  const handleDeleteNote = id => () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      remove(id)
      selectNote(null)
    }
  }

  const handleSaveNote = id => () => {
    save(id, selected.edited)
  }

  return (
    <Modal
      className="noteDetails"
      show
      backdrop="static"
    >
      <Modal.Header>
        <div>
          <FaArrowLeft onClick={handleCloseModal} />
        </div>
        <div>
          {selected.editing
            ? <FaSave onClick={handleSaveNote(selected.id)} />
            : <FaPen onClick={editSelectedNote} />}
          <FaTrash onClick={handleDeleteNote(selected.id)} />
        </div>
      </Modal.Header>
      <Modal.Body>
        {selected.editing
          ? <Form.Control as={'textarea'} value={selected.edited} onChange={handleSourceChange} />
          : (
            <ReactMarkdown>
              {selected.source}
            </ReactMarkdown>
          )}
      </Modal.Body>
    </Modal>
  )
}

export default NoteDetails