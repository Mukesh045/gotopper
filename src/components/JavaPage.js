import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes } from '../data/notes';
import TopicNotes from './TopicNotes';

const initialJavaCode = `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`;

const JavaPage = () => {
  const { topic, noteId } = useParams();
  const navigate = useNavigate();
  const tutorial = tutorials.find(t => t.id === 'java');
  const [uploadedNotes, setUploadedNotes] = useState([]);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    setUploadedNotes(notes);
  }, []);

  const handleTryItYourself = (note) => {
    navigate('/compiler/java', { state: { initialCode: note.exampleCode || '' } });
  };

  let content;

  if (topic === 'uploaded' && noteId) {
    const uploadedNote = uploadedNotes.find(n => n.id.toString() === noteId && n.tutorial === 'java');
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
    if (item && notes.java[item]) {
      const staticNoteArray = notes.java[item];
      const staticNoteData = (Array.isArray(staticNoteArray) && staticNoteArray.length > 0 && typeof staticNoteArray[0] === 'object') ? staticNoteArray[0] : {};

      // Find sub-topics
      const subTopics = uploadedNotes
        .filter(note => note.tutorial === 'java' && note.parentTopic === item)
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
                  <Link to={`/java/uploaded/${subTopic.id}`}>
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
        <h1>Welcome to the Java tutorial.</h1>
        
        <h2>Java Tutorial</h2>
        <p>Java is developed by <strong>James Gosling</strong> at Sun Microsystems and first released in <strong>1995</strong>.</p>
        <p>Java is a <strong>popular programming language,</strong> especially for <strong>building server-side applications</strong>.</p>

        <h2>What is Java?</h2>
        <p>Java is a <strong>object-oriented</strong>,<strong> high-level</strong>and <strong>class-based</strong> programming language.</p>
        <p>Java is a <strong>widely-used programming language</strong>, known for its <strong>portability across platforms</strong>.</p>
        <p>Java applications are typically <strong>compiled</strong> to <strong>bytecode</strong> that can run on <strong>any Java Virtual Machine (JVM)</strong> regardless of the underlying computer architecture.</p>
        <p>Java is designed to have as few implementation dependencies as possible, making it a <strong>"write once, run anywhere"</strong> language.</p>
        <p>Java is used for building <strong>enterprise-scale web applications, mobile applications (especially Android apps),</strong> and <strong>large systems development</strong>.</p> 
        <p>Java has a large ecosystem of libraries and frameworks, such as <strong>Spring, Hibernate,</strong> and <strong>Apache Struts</strong>, which facilitate rapid application development.</p>
        <p>Java emphasizes <strong>performance, scalability,</strong> and <strong>maintainability</strong>, making it a preferred choice for many developers and organizations.</p>


        <h2>Java Example</h2>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
          {initialJavaCode}
        </pre>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default JavaPage;
