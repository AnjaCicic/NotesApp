import React from 'react';
import useNotes from '../hooks/useNotes';
const { Provider, Consumer } = React.createContext();

const NotesProvider = (props) => {
  const notes = useNotes();

  return <Provider value={notes}>{props.children}</Provider>;
}

export { NotesProvider, Consumer as NotesConsumer };