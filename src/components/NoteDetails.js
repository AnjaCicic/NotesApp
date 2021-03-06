import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { FaArrowLeft, FaPen, FaTrash, FaSave } from 'react-icons/fa'

import { useNotesContext } from '../context/NotesContext'
import NoteMarkdown from './NoteMarkdown'

const NoteDetails = () => {
  const { save, remove, selectNote, selected, editSelectedNote, editSelectedNoteSource } = useNotesContext()

  if (!selected || !selected.id) return null

  const handleSourceChange = e => editSelectedNoteSource(e.target.value)
  const handleCloseModal = () => {
    if (!selected.editing
      || selected.source === selected.edited
      || window.confirm('Are you sure you want to exit edit mode?')) {
      console.log('no change')
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
          : <NoteMarkdown source={selected.source} />}
      </Modal.Body>
    </Modal>
  )
}

export default NoteDetails