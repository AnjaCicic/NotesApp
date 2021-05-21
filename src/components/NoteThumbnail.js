import React from 'react'
import ReactMarkdown from 'react-markdown'

const NoteThumbnail = (props) => (<div className="noteThumbnail">
  <ReactMarkdown>{props.note.source}</ReactMarkdown>
</div>)

export default NoteThumbnail