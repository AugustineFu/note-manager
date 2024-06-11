import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './NoteContent.css'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteContent = ({ notes, updateNote, deleteNote }) => {
    const { id } = useParams();

    const [note, setNote] = useState(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ct, setCt] = useState('');
    const [ut, setUt] = useState('');

    const [isSaving, setIsSaving] = useState(false);

    const timeoutRef = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {
        const foundNote = notes.find(n => n.id === id);
        // console.log("Found id: " + foundNote.id);
        // console.log("Found:" + foundNote.content);
        if (foundNote) {
            setNote(foundNote);
            setTitle(foundNote.title);
            setContent(foundNote.content);
            setCt(foundNote.createTime);
            setUt(foundNote.updateTime);
            // console.log("ct in add: " + ct)
            // console.log("ut in add: " + ut)
        }
    }, [id, notes]);

    useEffect(() => {
        if (isSaving) {
            const saveNote = () => {
                const d = new Date();
                updateNote(id, {
                    id,
                    title,
                    content,
                    createTime: ct,
                    updateTime: d.toLocaleDateString()
                });
                setUt(d.toLocaleDateString());
                setIsSaving(false);
            };

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(saveNote, 1000);
        }
    }, [isSaving, id, title, content, ct, updateNote]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setNote({
            ...note,
            title: e.target.value,
          });
        setIsSaving(true);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setNote({
            ...note,
            content: e.target.value,
          });
        setIsSaving(true);
    };



    // const handleSave = () => {
    //     updateNote(id, { ...note, title, content });
    //     navigate('/');
    // };

    return (
        <div className="note-content">
            <div className="noteInfo">
                {title} 
                <span className="timeInfo">创建时间：{ct}</span>
                <span className="timeInfo">修改时间：{ut}</span> 
                <span className="deleteIcon"> 
                    <IconButton edge="end" aria-label="delete" onClick={() => {
                        deleteNote(id)
                        navigate(`/`)
                    }} >
                    <DeleteIcon />
                    </IconButton> 
                </span>
            </div>
            <input
                type="text"
                value={title}
                // onChange={(e) => setTitle(e.target.value)}
                onChange={handleTitleChange}
                className="noteCaption"
            />


            <textarea
                value={content}
                // onChange={(e) => setContent(e.target.value)}
                onChange={handleContentChange}
                className="noteContent"
            />
        {/* <button onClick={handleSave}>保存</button>
        <button onClick={() => navigate('/')}>取消</button> */}
        </div>
    );
    };

export default NoteContent;
