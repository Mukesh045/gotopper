import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes } from '../data/notes';
import TopicNotes from './TopicNotes';

const initialJSCode = `function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World!";
}`;

const JSPage = () => {
  const { topic, noteId } = useParams();
  const navigate = useNavigate();
  const tutorial = tutorials.find(t => t.id === 'js');
  const [uploadedNotes, setUploadedNotes] = useState([]);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    setUploadedNotes(notes);
  }, []);

  const handleTryItYourself = (note) => {
    navigate('/compiler/js', { state: { initialCode: note.exampleCode || '' } });
  };

  let content;

  if (topic === 'uploaded' && noteId) {
    const uploadedNote = uploadedNotes.find(n => n.id.toString() === noteId && n.tutorial === 'js');
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
    if (item && notes.js[item]) {
      const staticNoteArray = notes.js[item];
      const staticNoteData = (Array.isArray(staticNoteArray) && staticNoteArray.length > 0 && typeof staticNoteArray[0] === 'object') ? staticNoteArray[0] : {};

      // Find sub-topics
      const subTopics = uploadedNotes
        .filter(note => note.tutorial === 'js' && note.parentTopic === item)
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
                  <Link to={`/js/uploaded/${subTopic.id}`}>
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
        <h1>Welcome to the JavaScript tutorial.</h1>

        <h2>JavaScript Tutorial</h2>
        <p>JavaScript is developed by <strong>Brendan Eich</strong> in <strong>1995</strong>.</p>
        <p>It was developed for <strong>making web pages interactive</strong>.</p>

        <h2>What is JavaScript?</h2>
         <p>JavaScript is an <strong>object-oriented</strong> programming language that can be used for both <strong>client-side</strong> and <strong>server-side</strong> development.</p>
        <p>JavaScript is the <strong>programming language of the web</strong>.</p>
        <p>JavaScript is a <strong>lightweight, interpreted programming language</strong> with first-class functions.</p>
        <p>JavaScript is used to <strong>make web pages interactive</strong> and provide online programs, including video games.</p>
        <p>JavaScript is <strong>easy to learn</strong>.</p>
        <p>JavaScript is a <strong>popular programming language</strong>, used by <strong>over 97% of all websites</strong>.</p>

        <h2>JavaScript Example</h2>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
          {initialJSCode}
        </pre>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default JSPage;
