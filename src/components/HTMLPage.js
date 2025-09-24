import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes } from '../data/notes';
import TopicNotes from './TopicNotes';

const initialHTMLCode = `
<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
  <style>
    h1 {
      color: blue;
    }
  </style>
</head>
`;

const HTMLPage = () => {
  const { topic, noteId } = useParams();
  const navigate = useNavigate();
  const tutorial = tutorials.find(t => t.id === 'html');
  const [uploadedNotes, setUploadedNotes] = useState([]);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    setUploadedNotes(notes);
  }, []);

  const handleTryItYourself = (note) => {
    navigate('/compiler/html', { state: { initialCode: note.exampleCode || '' } });
  };

  let content;

  if (topic === 'uploaded' && noteId) {
    const uploadedNote = uploadedNotes.find(n => n.id.toString() === noteId && n.tutorial === 'html');
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
    const normalizedTopic = topic.toLowerCase();
    const noteKey = Object.keys(notes.html).find(key => key.replace(/ /g, '-').toLowerCase() === normalizedTopic);
    if (noteKey && notes.html[noteKey]) {
      const staticNoteArray = notes.html[noteKey];
      const staticNoteData = (Array.isArray(staticNoteArray) && staticNoteArray.length > 0 && typeof staticNoteArray[0] === 'object') ? staticNoteArray[0] : {};
      
      // Find sub-topics
      const subTopics = uploadedNotes
        .filter(note => note.tutorial === 'html' && note.parentTopic === noteKey)
        .sort((a, b) => a.topic.localeCompare(b.topic));

      content = (
        <div>
          <h1>{noteKey}</h1>
          <TopicNotes notes={staticNoteArray} />
          {staticNoteData && staticNoteData.exampleCode && (
            <button onClick={() => handleTryItYourself(staticNoteData)} className="btn btn-primary mt-3">
              Do it yourself
            </button>
          )}

          {subTopics.length > 0 && (
            <div className="mt-5">
              <hr />
              <h2 className="mt-4">Related Topics</h2>
              {subTopics.map(subTopic => (
                <div key={subTopic.id} className="mb-4">
                  <Link to={`/html/uploaded/${subTopic.id}`}>
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
        <h1>Welcome to the HTML tutorial.</h1>

        <h2>HTML Tutorial</h2>
        <p>HTML is developed by <strong>Sir Tim Berners-Lee</strong> in <strong>1990</strong> and was the foundation of the <strong>World Wide Web</strong>.</p>
        <p>Sir Tim Berners-Lee is credited with <strong>inventing HTML</strong> as a language to <strong>exchange data </strong>and <strong>structure documents on the web</strong>.</p>

        <h2>What is HTML?</h2>
        <p>HTML stands for <strong>Hyper Text Markup Language</strong>. It describes the <strong>structure of a web page</strong>.</p>
        <p>HTML is not a programming language; it is a <strong>markup language</strong> that defines the structure of your content.</p>
        <p>HTML consists of a <strong>series of elements</strong>, which you use to <strong>enclose, or wrap</strong>, different parts of the content to make it appear or act a certain way.</p>
        <p>The enclosing tags can make a word or image hyperlink to somewhere else, can italicize words, can make the font bigger or smaller, and so on.</p>
        <p>HTML is used to create <strong>electronic documents (called pages)</strong> that are displayed on the World Wide Web.</p>
        <p>HTML elements are the <strong>building blocks of HTML pages</strong>, With <strong>HTML constructs, images and other objects</strong>, such as interactive forms, may be embedded into the rendered page.</p>
        <p>HTML provides a means to <strong>create structured documents</strong> by denoting <strong>structural semantics for text</strong> such as <strong>headings, paragraphs, lists, links, quotes</strong>, and other items.</p>
        

        <h2>HTML Example</h2>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
          {initialHTMLCode}
        </pre>

        
      </div>
    );
  }

  return <div>{content}</div>;
};

export default HTMLPage;
