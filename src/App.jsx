import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import NoteContent from './components/NoteContent'
import SideBar from './components/SideBar';
import Index from './components/Index';

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });


  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(null);


  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()));
  // console.log("filter: " + filteredNotes);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    let d = new Date();
    const noteCount = notes.length + 1;
    const newNote = { 
      id: uuidv4(), 
      title: `笔记${noteCount}`, 
      content: `` ,
      createTime: d.toLocaleDateString(),
      updateTime: d.toLocaleDateString(), 
    };

    setNotes([newNote, ...notes]);
    setIsEditing(newNote.id); 

    return newNote.id 

  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    console.log("delete: " + notes);
    setNotes(updatedNotes);
  };


  const updateNoteTitle = (id, title) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, title } : note));
    setNotes(updatedNotes);
    setIsEditing(null); 
  };

  const updateNote = (id, updatedNote) => {
    const updatedNotes = notes.map(note => (note.id === id ? updatedNote : note));
    // updatedNotes.id = id;
    console.log("NOTE: " + updatedNotes.id);
    console.log("id"  + id);
    setNotes(updatedNotes);
  };

  return (
    <Router>

      <div className="App">
      <div className="pageWrap">

          <div className="caption">
            <div>
              我的笔记
            </div>
          </div>
          <div className='pageContent'>
            <SideBar  setSearchQuery={setSearchQuery}
                      notes={filteredNotes} 
                      isEditing={isEditing} 
                      setIsEditing={setIsEditing} 
                      updateNoteTitle={updateNoteTitle}
                      addNote={addNote}/>

            <div className="noteDetail">
            <Routes>
              <Route path="/" element={<Index/>} />
              <Route path="/note/:id" element={<NoteContent notes={notes} updateNote={updateNote} deleteNote={deleteNote}/>} />
            </Routes>
            </div>
          </div>

      </div>
    </div>
    </Router>

  );
}

export default App;
