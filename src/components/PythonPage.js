import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes } from '../data/notes';
import TopicNotes from './TopicNotes';

const initialPythonCode = `print("Hello, World!")`;

const PythonPage = () => {
  const { topic, noteId } = useParams();
  const navigate = useNavigate();
  const tutorial = tutorials.find(t => t.id === 'python');
  const [uploadedNotes, setUploadedNotes] = useState([]);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    setUploadedNotes(notes);
  }, []);

  const handleTryItYourself = (note) => {
    navigate('/compiler/python', { state: { initialCode: note.exampleCode || '' } });
  };

  let content;

  if (topic === 'uploaded' && noteId) {
    const uploadedNote = uploadedNotes.find(n => n.id.toString() === noteId && n.tutorial === 'python');
    if (uploadedNote) {
      content = (
        <div>
          <h1>{uploadedNote.topic}</h1>
          <TopicNotes notes={[uploadedNote]} />
          {uploadedNote.exampleCode && (
            <button onClick={() => handleTryItYourself(uploadedNote)} className="btn btn-primary mt-3">
              Do it yourself
            </button>
          )}
        </div>
      );
    } else {
      content = <p>Topic not found.</p>;
    }
  } else if (topic) {
    const item = tutorial.items.find(i => i.replace(/ /g, '-').toLowerCase() === topic);
    if (item && notes.python[item]) {
      const staticNoteArray = notes.python[item];
      const staticNoteData = (Array.isArray(staticNoteArray) && staticNoteArray.length > 0 && typeof staticNoteArray[0] === 'object') ? staticNoteArray[0] : {};

      // Find sub-topics
      const subTopics = uploadedNotes
        .filter(note => note.tutorial === 'python' && note.parentTopic === item)
        .sort((a, b) => a.topic.localeCompare(b.topic));

      content = (
        <div>
          <h1>{item}</h1>
          <TopicNotes notes={staticNoteArray} />
          {staticNoteData && staticNoteData.exampleCode && (
            <button onClick={() => handleTryItYourself(staticNoteData)} className="btn btn-primary mt-3">
              Try it yourself
            </button>
          )}

          {subTopics.length > 0 && (
            <div className="mt-5">
              <hr />
              <h2 className="mt-4">Related Topics</h2>
              {subTopics.map(subTopic => (
                <div key={subTopic.id} className="mb-4">
                  <Link to={`/python/uploaded/${subTopic.id}`}>
                    <h3>{subTopic.topic}</h3>
                  </Link>
                  <TopicNotes notes={[subTopic]} />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      content = <p>Topic not found.</p>;
    }
  } else {
    content = (
      <div>
        <h1>Welcome to the Python tutorial.</h1>
     
        <h2>Python Tutorial</h2>
        <p>Python is developed by <strong>Guido van Rossum</strong>, a Dutch programmer, and first released in <strong>1991</strong>.</p>
        <p>Python is a popular, <strong>easy-to-learn programming language</strong>.</p>

        <h2>What is Python?</h2>
        <p>Python is an <strong>object-oriented, interpreted, high-level, general-purpose</strong> programming language.</p>
        <p>Python's design philosophy emphasizes code readability with it's notable use of significant whitespace.</p>
        <p>Python is <strong>dynamically-typed</strong> and <strong>garbage-collected</strong>.</p>
        <p>It supports multiple programming paradigms, including <strong>structured (particularly, procedural), object-oriented</strong> and <strong>functional programming</strong>.</p>
        <p>Python is often described as a <strong>"batteries included"language</strong>  due to its comprehensive <strong>standard library</strong>.</p>
        <p>Python is a <strong>versatile programming language</strong> used for <strong>web development, data analysis, artificial intelligence, scientific computing,</strong> and more.</p>

        <h2>Python Example</h2>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
          {initialPythonCode}
        </pre>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default PythonPage;
