import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes } from '../data/notes';
import TopicNotes from './TopicNotes';

const initialCSSCode = `body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}`;

const CSSPage = () => {
  const { topic, noteId } = useParams();
  const navigate = useNavigate();
  const tutorial = tutorials.find(t => t.id === 'css');
  const [uploadedNotes, setUploadedNotes] = useState([]);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    setUploadedNotes(notes);
  }, []);

  const handleTryItYourself = (note) => {
    navigate('/compiler/css', { state: { initialCode: note.exampleCode || '' } });
  };

  let content;

  if (topic === 'uploaded' && noteId) {
    const uploadedNote = uploadedNotes.find(n => n.id.toString() === noteId && n.tutorial === 'css');
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
    if (item && notes.css[item]) {
      const staticNoteArray = notes.css[item];
      const staticNoteData = (Array.isArray(staticNoteArray) && staticNoteArray.length > 0 && typeof staticNoteArray[0] === 'object') ? staticNoteArray[0] : {};

      // Find sub-topics
      const subTopics = uploadedNotes
        .filter(note => note.tutorial === 'css' && note.parentTopic === item)
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
                  <Link to={`/css/uploaded/${subTopic.id}`}>
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
        <h1>Welcome to the CSS tutorial.</h1>

        <h2>CSS Tutorial</h2>
        <p>CSS (<strong>Cascading Style Sheets</strong>) is developed by <strong>W3C</strong> (<strong>World Wide Web Consortium</strong>)in <strong>1996</strong>.</p>
        <p><strong>Hakon Wium Lie</strong> is credited with first proposing the concept of <strong>CSS in 1994</strong> and he also known as the <strong>father of CSS</strong>.</p>
        <p>CSS is the language for describing the presentation of web pages.</p>

        <h2>What is CSS?</h2>
        <p>CSS is a <strong>style sheet language</strong> used for describing the presentation of a document written in a markup language like HTML.</p>
        <p>CSS describes how elements should be <strong>displayed/rendered on screen</strong>, on paper, in speech, or on other media.</p>
        <p>CSS is designed to <strong>specify the layout of a document</strong> including <strong>colors, and fonts</strong>.</p>
        <p>This separation can <strong>improve content accessibility</strong>, provide more <strong>flexibility and control</strong> in the specification of presentation characteristics, enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, and reduce complexity and repetition in the structural content.</p>
        <p>CSS is used to <strong>control the style of a web document</strong> in a simple and easy way.</p>
        <p>CSS is one of the <strong>cornerstone technologies of the World Wide Web</strong>, alongside HTML and JavaScript.</p>

        <h2>CSS Example</h2>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
          {initialCSSCode}
        </pre>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default CSSPage;
