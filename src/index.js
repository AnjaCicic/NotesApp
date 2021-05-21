import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { NotesProvider } from './context/NotesContext';
import NotesList from './components/NotesList';

ReactDOM.render(
  <React.StrictMode>
    <NotesProvider>
      <NotesList />
    </NotesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
