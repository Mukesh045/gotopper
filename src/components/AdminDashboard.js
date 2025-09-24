import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes as staticNotesData } from '../data/notes';
import { useAdminAuth } from '../context/AdminAuthProvider';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');
  const [uploadedNotes, setUploadedNotes] = useState([]);
  const [newNotes, setNewNotes] = useState([
    {
      key: Date.now(),
      tutorialId: tutorials[0].id, topicTitle: '', noteContent: '', exampleCode: ''
    }
  ]);
  const [displayNotes, setDisplayNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editTutorialId, setEditTutorialId] = useState('');
  const [editTopicTitle, setEditTopicTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [editExampleCode, setEditExampleCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletedStaticNotes, setDeletedStaticNotes] = useState([]);
  const [addingSubNoteTo, setAddingSubNoteTo] = useState(null);
  const [newSubNote, setNewSubNote] = useState({ topicTitle: '', noteContent: '', exampleCode: '' });
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    setUploadedNotes(notes);
    const deleted = JSON.parse(localStorage.getItem('deletedStaticNotes') || '[]');
    setDeletedStaticNotes(deleted);
  }, []);

  useEffect(() => {
    const transformedStaticNotes = [];
    for (const tutorialId in staticNotesData) {
      for (const topic in staticNotesData[tutorialId]) {
        const staticNote = staticNotesData[tutorialId][topic];
        let content = [];
        let exampleCode = '';

        // Handle both new object-based structure and old string-array structure
        if (Array.isArray(staticNote) && staticNote.length > 0 && typeof staticNote[0] === 'object' && staticNote[0] !== null) {
          // New structure: [{ content: [], exampleCode: '' }]
          content = staticNote[0].content || [];
          exampleCode = staticNote[0].exampleCode || '';
        } else if (Array.isArray(staticNote)) {
          // Old structure: ['string1', 'string2']
          content = staticNote;
        }

        transformedStaticNotes.push({
          id: `static-${tutorialId}-${topic.replace(/ /g, '-')}`,
          tutorial: tutorialId,
          topic: topic,
          content: content,
          exampleCode: exampleCode,
          isStatic: true,
        });
      }
    }

    const uploadedNoteKeys = new Set(uploadedNotes.map(n => `${n.tutorial}-${n.topic.toLowerCase()}`));
    const deletedIds = new Set(deletedStaticNotes);

    const uniqueStaticNotes = transformedStaticNotes.filter(sn =>
      !uploadedNoteKeys.has(`${sn.tutorial}-${sn.topic.toLowerCase()}`) &&
      !deletedIds.has(sn.id)
    );

    const allNotes = [...uploadedNotes, ...uniqueStaticNotes].sort((a, b) => a.topic.localeCompare(b.topic));
    setDisplayNotes(allNotes);
  }, [uploadedNotes, deletedStaticNotes]);

  const saveNotesToStorage = (notes) => {
    localStorage.setItem('uploadedNotes', JSON.stringify(notes));
    setUploadedNotes(notes);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleNewNoteChange = (index, field, value) => {
    const updatedNewNotes = [...newNotes];
    updatedNewNotes[index][field] = value;
    setNewNotes(updatedNewNotes);
  };

  const handleAddNewNoteForm = () => {
    setNewNotes(prev => [
      ...prev,
      { key: Date.now(), tutorialId: tutorials[0].id, topicTitle: '', noteContent: '', exampleCode: '' }
    ]);
  };

  const handleRemoveNewNoteForm = (index) => {
    const updatedNewNotes = newNotes.filter((_, i) => i !== index);
    setNewNotes(updatedNewNotes);
  };

  const handleSubmit = (e, index) => {
    e.preventDefault();
    setMessage('');

    const noteToSubmit = newNotes[index];

    if (!noteToSubmit.tutorialId || !noteToSubmit.topicTitle.trim() || !noteToSubmit.noteContent.trim()) {
      setMessage('All fields are required.');
      return;
    }

    // Check for duplicate topic in the same tutorial
    const duplicate = uploadedNotes.find(note => note.tutorial === noteToSubmit.tutorialId && note.topic.toLowerCase() === noteToSubmit.topicTitle.trim().toLowerCase());
    if (duplicate) {
      setMessage('A note with this topic already exists for the selected tutorial. Please edit the existing note.');
      return;
    }

    const newNote = {
      id: Date.now(), // unique id
      tutorial: noteToSubmit.tutorialId,
      topic: noteToSubmit.topicTitle.trim(),
      content: noteToSubmit.noteContent.split('\n').filter(line => line.trim() !== ''), // Split by newline and remove empty lines
      exampleCode: noteToSubmit.exampleCode
    };

    const updatedNotes = [...uploadedNotes, newNote];
    saveNotesToStorage(updatedNotes);

    setMessage(`Note for "${noteToSubmit.topicTitle}" has been uploaded successfully.`);

    handleRemoveNewNoteForm(index); // Remove the submitted form
  };

  const handleAddSubheading = (index) => {
    const updatedNewNotes = [...newNotes];
    const currentContent = updatedNewNotes[index].noteContent;
    updatedNewNotes[index].noteContent = (currentContent ? currentContent + '\n\n' : '') + '## ';
    setNewNotes(updatedNewNotes);
  };

  const handleEdit = (note) => {
    setAddingSubNoteTo(null); // Close any open sub-note forms
    setEditingNote(note);
    setEditTutorialId(note.tutorial);
    setEditTopicTitle(note.topic);
    setEditNoteContent(note.content.join('\n'));
    setEditExampleCode(note.exampleCode || '');
  };

  const handleEditAddSubheading = () => {
    setEditNoteContent(prev => (prev ? prev + '\n\n' : '') + '## ');
  };

  const handleSaveEdit = () => {
    if (!editTutorialId || !editTopicTitle.trim() || !editNoteContent.trim()) {
      setMessage('All fields are required.');
      return;
    }

    if (editingNote.isStatic) {
      // This is a static note being edited. Create a new "uploaded" note to override it.
      const newNote = {
        id: Date.now(),
        tutorial: editTutorialId,
        topic: editTopicTitle.trim(),
        content: editNoteContent.split('\n').filter(line => line.trim() !== ''),
        exampleCode: editExampleCode,
        parentTopic: editingNote.parentTopic || null, // Preserve parent topic
      };

      // Check for duplicate topic in the same tutorial
      const duplicate = uploadedNotes.find(note => note.tutorial === newNote.tutorial && note.topic.toLowerCase() === newNote.topic.toLowerCase());
      if (duplicate) {
        setMessage('A note with this topic already exists for the selected tutorial. Please choose a different topic title.');
        return;
      }

      const updatedNotes = [...uploadedNotes, newNote];
      saveNotesToStorage(updatedNotes);
    } else {
      // This is a regular uploaded note. Update it.
      // Check for duplicate topic in the same tutorial except the current editing note
      const duplicate = uploadedNotes.find(note => note.tutorial === editTutorialId && note.topic.toLowerCase() === editTopicTitle.trim().toLowerCase() && note.id !== editingNote.id);
      if (duplicate) {
        setMessage('A note with this topic already exists for the selected tutorial. Please choose a different topic title.');
        return;
      }

      const updatedNote = {
        ...editingNote,
        tutorial: editTutorialId,
        topic: editTopicTitle.trim(),
        content: editNoteContent.split('\n').filter(line => line.trim() !== ''),
        exampleCode: editExampleCode,
        parentTopic: editingNote.parentTopic || null, // Preserve parent topic
      };

      const updatedNotes = uploadedNotes.map(note => note.id === editingNote.id ? updatedNote : note);
      saveNotesToStorage(updatedNotes);
    }

    setEditingNote(null);
    setEditTutorialId('');
    setEditTopicTitle('');
    setEditNoteContent('');
    setEditExampleCode('');
    setMessage('Note updated successfully.');
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditTutorialId('');
    setEditTopicTitle('');
    setEditNoteContent('');
    setEditExampleCode('');
  };

  const handleDelete = (noteToDelete) => {
    if (!noteToDelete) {
      setMessage("Note not found for deletion.");
      return;
    }

    if (noteToDelete.isStatic) {
      const currentDeleted = JSON.parse(localStorage.getItem('deletedStaticNotes') || '[]');
      if (!currentDeleted.includes(noteToDelete.id)) {
        const updatedDeleted = [...currentDeleted, noteToDelete.id];
        localStorage.setItem('deletedStaticNotes', JSON.stringify(updatedDeleted));
        setDeletedStaticNotes(updatedDeleted);
        setMessage(`Static note "${noteToDelete.topic}" has been hidden.`);
      }
    } else {
      const updatedNotes = uploadedNotes.filter(note => note.id !== noteToDelete.id);
      saveNotesToStorage(updatedNotes);
      setMessage('Note deleted successfully.');
    }
  };

  const handleToggleCompiler = (note) => {
    // Find tutorial slug or id to determine compiler path
    const tutorial = tutorials.find(t => t.id === note.tutorial);
    if (!tutorial) {
      setMessage('Tutorial not found for this note.');
      return;
    }
    // Navigate to compiler page with initial code passed in state
    navigate(`/compiler/${tutorial.id}`, { state: { initialCode: note.exampleCode || '' } });
  };

  const handleToggleAddSubNote = (noteId) => {
    if (editingNote) setEditingNote(null); // Close edit form if open
    if (addingSubNoteTo === noteId) {
      setAddingSubNoteTo(null); // Toggle off
    } else {
      setAddingSubNoteTo(noteId);
      setNewSubNote({ topicTitle: '', noteContent: '', exampleCode: '' }); // Reset form
    }
  };

  const handleSubNoteChange = (field, value) => {
    setNewSubNote(prev => ({ ...prev, [field]: value }));
  };

  const handleSubNoteSubmit = (e, parentNote) => {
    e.preventDefault();
    setMessage('');

    if (!newSubNote.topicTitle.trim() || !newSubNote.noteContent.trim()) {
      setMessage('Sub-topic title and content are required.');
      return;
    }

    const newNote = {
      id: Date.now(),
      tutorial: parentNote.tutorial,
      topic: newSubNote.topicTitle.trim(),
      parentTopic: parentNote.topic,
      content: newSubNote.noteContent.split('\n').filter(line => line.trim() !== ''),
      exampleCode: newSubNote.exampleCode,
    };

    const duplicate = uploadedNotes.find(note => note.tutorial === newNote.tutorial && note.topic.toLowerCase() === newNote.topic.toLowerCase());
    if (duplicate) {
      setMessage('A note with this topic already exists for the selected tutorial.');
      return;
    }

    const updatedNotes = [...uploadedNotes, newNote];
    saveNotesToStorage(updatedNotes);
    setMessage(`Sub-note "${newNote.topic}" has been added under "${parentNote.topic}".`);
    setAddingSubNoteTo(null); // Close form
  };

  const filteredNotes = displayNotes.filter(note =>
    note.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>
      <h4 className="d-flex align-items-center">
        Upload New Note
        <button type="button" className="btn btn-sm btn-outline-primary ms-3" onClick={handleAddNewNoteForm} title="Add another note form">+</button>
      </h4>
      {message && <div className="alert alert-success">{message}</div>}
      {newNotes.map((note, index) => (
        <form key={note.key} onSubmit={(e) => handleSubmit(e, index)} className="card p-3 mb-3">
          <div className="mb-3">
            <label htmlFor={`tutorial-select-${index}`} className="form-label">Select Tutorial</label>
            <select
              id={`tutorial-select-${index}`}
              className="form-select"
              value={note.tutorialId}
              onChange={(e) => handleNewNoteChange(index, 'tutorialId', e.target.value)}
            >
              {tutorials.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor={`topic-title-${index}`} className="form-label">Topic Title</label>
            <input type="text" className="form-control" id={`topic-title-${index}`} value={note.topicTitle} onChange={(e) => handleNewNoteChange(index, 'topicTitle', e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor={`note-content-${index}`} className="form-label">
              Note Content (use ## for subheadings)
            </label>
            <button type="button" className="btn btn-sm btn-outline-secondary ms-2" onClick={() => handleAddSubheading(index)} title="Add Subheading">+</button>
            <textarea className="form-control" id={`note-content-${index}`} rows="5" value={note.noteContent} onChange={(e) => handleNewNoteChange(index, 'noteContent', e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor={`example-code-${index}`} className="form-label">Example Code</label>
            <textarea className="form-control" id={`example-code-${index}`} rows="5" value={note.exampleCode} onChange={(e) => handleNewNoteChange(index, 'exampleCode', e.target.value)}></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-primary me-2">Upload Note</button>
            {newNotes.length > 1 && <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveNewNoteForm(index)}>Remove</button>}
          </div>
        </form>
      ))}

      <hr className="my-4" />

      <h4 className="mt-4">Manage Notes</h4>
      <div className="mb-4">
        <input
          type="search"
          className="form-control"
          placeholder="Search notes by topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredNotes.length === 0 ? (
        <p>No notes uploaded yet.</p>
      ) : (
        <div>
          {filteredNotes.map(note => (
            <div key={note.id} className="card mb-3">
              <div className="card-body">
                {editingNote && editingNote.id === note.id ? (
                  <div>
                    <div className="mb-3">
                      <label className="form-label">Select Tutorial</label>
                      <select
                        className="form-select"
                        value={editTutorialId}
                        onChange={(e) => setEditTutorialId(e.target.value)}
                      >
                        {tutorials.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Topic Title</label>
                      <input type="text" className="form-control" value={editTopicTitle} onChange={(e) => setEditTopicTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Note Content (use ## for subheadings)
                      </label>
                      <button type="button" className="btn btn-sm btn-outline-secondary ms-2" onClick={handleEditAddSubheading} title="Add Subheading">+</button>
                      <textarea className="form-control" rows="5" value={editNoteContent} onChange={(e) => setEditNoteContent(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Example Code</label>
                      <textarea className="form-control" rows="5" value={editExampleCode} onChange={(e) => setEditExampleCode(e.target.value)}></textarea>
                    </div>
                    <button className="btn btn-success me-2" onClick={handleSaveEdit}>Save</button>
                    <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">
                      {note.topic} {note.isStatic && <span className="badge bg-secondary ms-2">Static</span>}
                    </h5>
                    <p className="card-text"><strong>Tutorial:</strong> {tutorials.find(t => t.id === note.tutorial)?.title}</p>
                    <div>
                      {note.content.map((item, index) => {
                        if (item.startsWith('## ')) {
                          return <h6 key={index} className="mt-3"><strong>{item.substring(3)}</strong></h6>;
                        }
                        return <p key={index} className="mb-1">{item}</p>;
                      })}
                    </div>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(note)}>Edit</button>
                    <button className="btn btn-success me-2" onClick={() => handleToggleAddSubNote(note.id)} title="Add Sub-Topic">+</button>
                    <button className="btn btn-danger me-2" onClick={() => handleDelete(note)}>Delete</button>
                    <button className="btn btn-info" onClick={() => handleToggleCompiler(note)}>Toggle Compiler</button>
                  </div>
                )}
                {addingSubNoteTo === note.id && (
                  <div className="mt-4 p-3 border-top bg-light">
                    <h5>Add Sub-Topic to "{note.topic}"</h5>
                    <form onSubmit={(e) => handleSubNoteSubmit(e, note)}>
                      <div className="mb-3">
                        <label className="form-label">Sub-Topic Title</label>
                        <input type="text" className="form-control" value={newSubNote.topicTitle} onChange={(e) => handleSubNoteChange('topicTitle', e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Sub-Topic Content</label>
                        <textarea className="form-control" rows="4" value={newSubNote.noteContent} onChange={(e) => handleSubNoteChange('noteContent', e.target.value)} required></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Sub-Topic Example Code</label>
                        <textarea className="form-control" rows="4" value={newSubNote.exampleCode} onChange={(e) => handleSubNoteChange('exampleCode', e.target.value)}></textarea>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary me-2">Add Sub-Topic</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setAddingSubNoteTo(null)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
