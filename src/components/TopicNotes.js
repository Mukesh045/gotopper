import React from 'react';

const TopicNotes = ({ notes }) => {
  return (
    <div>
      {notes.map((note, index) => (
        <div key={index} className="mb-4">
          {typeof note === 'string' ? (
            <p>{note}</p>
          ) : (
            <>
              {note.content && Array.isArray(note.content) && (
                note.content.map((point, i) => {
                  if (point.startsWith('## ')) {
                    return <h4 key={i} className="mt-4">{point.substring(3)}</h4>;
                  }
                  return <p key={i}>{point}</p>;
                })
              )}
              {note.exampleCode && (
                <div className="code-example-container my-4">
                  <h5 className="mb-3">Example</h5>
                  <pre className="code-example bg-dark text-light p-3 rounded">
                    <code>{note.exampleCode}</code>
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicNotes;
