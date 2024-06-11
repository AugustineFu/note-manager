// import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useRef, useEffect } from 'react';
// import Input from '@mui/material/Input';
// import Link from '@mui/material/Link';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteList = (props) => {

  const { notes, isEditing, setIsEditing, updateNoteTitle, addNote } = props;

  
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = (id) => {
    const newTitle = inputRef.current.value.trim();
    updateNoteTitle(id, newTitle);

  };


  return (

    <div className="notes-list">
     {/* <Button variant="outlined" onClick={() => clearNote()}>选择</Button>  */}
     <div className="list">
     <List>
      {notes.map((note, index) => {
        // const labelId = `note-${index}`;
        return (
              <Link className="noteLink" to={`/note/${note.id}`}>

          <ListItem>
              <ListItemButton role={undefined} dense>
                {isEditing === note.id ? (
                <input
                  type="text"
                  ref={inputRef}
                  defaultValue={note.title}
                  onBlur={() => handleBlur(note.id)}
                  className="noteNameInput"
                />
              )  : (
                <div className="noteListTitle">
                  <ListItemText sx = {{
                    '& .css-et1ao3-MuiTypography-root':{
                      fontSize: `15px`,
                      fontWeight: `800`
                    }
                  }}
                                id={note.id} 
                                primary={note.title} 
                                onDoubleClick={() => setIsEditing(note.id)}/>
                </div>
              )}
            </ListItemButton>

          </ListItem>
          </Link>

        )
      } )}
      </List>
     </div>

      <div className="addbuttonWrap"> 
        <Button         
        sx={{
          color: 'rgba(27, 42, 107, 0.7)',
          backgroundColor: 'white',
          borderRadius: '0',
          fontSize: '14px',
          fontWeight: '800',
          '&:hover': {
            backgroundColor: 'rgba(133, 168, 128, 0.1)',

          },
        }}
        className="addButton"
        startIcon={<NoteAddIcon />} 
        // variant="outlined" 
        onClick={() => {
          let newId = addNote();
          navigate(`/note/${newId}`)
        }}>添加</Button> 
      </div>
    </div>
  );
};

export default NoteList;
