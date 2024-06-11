import React, { useState } from 'react';
import Search from './Search';
import NoteList from './NoteList';

const SideBar = (props) => {
    const {setSearchQuery, notes, isEditing, setIsEditing, updateNoteTitle, addNote} = props;

    return (
        <div className="sidebar">
            <Search setSearchQuery={setSearchQuery} />

            <NoteList notes={notes} 
                        isEditing={isEditing} 
                        setIsEditing={setIsEditing} 
                        updateNoteTitle={updateNoteTitle}
                        addNote={addNote}/>
        </div>
    );
};

export default SideBar;