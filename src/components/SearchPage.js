import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes } from '../data/notes';

// All searchable pages on the site
const tutorialContent = [];
tutorials.forEach(tutorial => {
  tutorial.items.forEach(item => {
    const isHome = item === tutorial.title.replace(' Tutorial', ' HOME').toUpperCase();
    const path = isHome ? `/${tutorial.id}` : `/${tutorial.id}/${item.replace(/ /g, '-').toLowerCase()}`;
    const noteContent = notes[tutorial.id]?.[item];
    tutorialContent.push({
      id: `${tutorial.id}-${item.replace(/ /g, '-')}`,
      title: item,
      path: path,
      description: noteContent ? noteContent[0] : `A topic in the ${tutorial.title}.`,
      keywords: [...item.toLowerCase().split(' '), tutorial.id]
    });
  });
});

const otherContent = [
  {
    id: 'html-tutorial',
    title: 'HTML Tutorial',
    path: '/html',
    description: 'Learn the basics of HTML, the standard markup language for creating web pages.',
    keywords: ['html', 'tutorial', 'web page', 'markup'],
  },
  {
    id: 'css-tutorial',
    title: 'CSS Tutorial',
    path: '/css',
    description: 'Style your web pages with CSS, the language for describing the presentation of web pages.',
    keywords: ['css', 'tutorial', 'style', 'stylesheet'],
  },
  {
    id: 'js-tutorial',
    title: 'JavaScript Tutorial',
    path: '/js',
    description: 'Make your web pages interactive with JavaScript, the programming language of the web.',
    keywords: ['javascript', 'js', 'tutorial', 'scripting', 'programming'],
  },
  {
    id: 'java-tutorial',
    title: 'Java Tutorial',
    path: '/java',
    description: 'Make your career in a SDE and build a real-time application with Java.',
    keywords: ['java', 'tutorial', 'programming', 'sde'],
  },
  {
    id: 'python-tutorial',
    title: 'Python Tutorial',
    path: '/python',
    description: 'Python is a versatile language used for web development, data analysis, artificial intelligence, and more.',
    keywords: ['python', 'tutorial', 'programming', 'data analysis', 'ai'],
  },
  {
    id: 'html-compiler',
    title: 'HTML Compiler',
    path: '/compiler/html',
    description: 'Write and run HTML code directly in your browser.',
    keywords: ['html', 'compiler', 'editor', 'run code'],
  },
  {
    id: 'css-compiler',
    title: 'CSS Compiler',
    path: '/compiler/css',
    description: 'Write and run CSS code directly in your browser.',
    keywords: ['css', 'compiler', 'editor', 'run code'],
  },
  {
    id: 'js-compiler',
    title: 'JavaScript Compiler',
    path: '/compiler/js',
    description: 'Write and run JavaScript code directly in your browser.',
    keywords: ['javascript', 'js', 'compiler', 'editor', 'run code'],
  },
  {
    id: 'java-compiler',
    title: 'Java Compiler',
    path: '/compiler/java',
    description: 'Write and run Java code directly in your browser.',
    keywords: ['java', 'compiler', 'editor', 'run code'],
  },
  {
    id: 'python-compiler',
    title: 'Python Compiler',
    path: '/compiler/python',
    description: 'Write and run Python code directly in your browser.',
    keywords: ['python', 'compiler', 'editor', 'run code'],
  },
  {
    id: 'about-us',
    title: 'About Us',
    path: '/about',
    description: 'Learn more about our team and mission.',
    keywords: ['about', 'company', 'team'],
  },
];

const searchableContent = [...tutorialContent, ...otherContent];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const searchResults = query
    ? searchableContent.filter(item => {
        const searchTerm = query.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const keywordMatch = item.keywords.some(kw => kw.toLowerCase().includes(searchTerm));
        return titleMatch || keywordMatch;
      })
    : [];

  return (
    <div>
      <h1>Search Results</h1>
      {query ? (
        <>
          <p>Showing results for: <strong>{query}</strong></p>
          {searchResults.length > 0 ? (
            <div className="list-group">
              {searchResults.map(result => (
                <Link to={result.path} key={result.id} className="list-group-item list-group-item-action">
                  <h5 className="mb-1">{result.title}</h5>
                  <p className="mb-1">{result.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="alert alert-warning mt-3" role="alert">
              No results found for "<strong>{query}</strong>". Please try another search term.
            </div>
          )}
        </>
      ) : (
        <p>Please enter a search term.</p>
      )}
    </div>
  );
};

export default SearchPage;