import { memo } from 'react'
import ReactMarkdown from 'react-markdown'

const NoteMarkdown = ({ source, className }) => (
  <ReactMarkdown className={className}>
    {source}
  </ReactMarkdown>
)

export default memo(NoteMarkdown)