import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import { notes as staticNotesData } from '../data/notes'; // Assuming this has the new structure
import './Sidebar.css';

const Sidebar = ({ sidebarOpen }) => {
  const location = useLocation();
  const currentTutorialId = location.pathname.split('/')[1];
  const tutorial = tutorials.find(t => t.id === currentTutorialId);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const uploaded = JSON.parse(localStorage.getItem('uploadedNotes') || '[]');
    setNotes(uploaded);
    // Re-fetch on navigation to see changes immediately after admin edits.
  }, [location.key]);

  if (!tutorial) {
    return null; // Don't render sidebar if not on a tutorial page
  }

  // Combine static and uploaded notes
  const deletedStaticNotes = JSON.parse(localStorage.getItem('deletedStaticNotes') || '[]');
  const deletedIds = new Set(deletedStaticNotes);

  const staticItems = (staticNotesData[currentTutorialId] ? Object.keys(staticNotesData[currentTutorialId]) : [])
    .map(topic => {
      const staticId = `static-${currentTutorialId}-${topic.replace(/ /g, '-')}`;
      if (deletedIds.has(staticId)) return null;
      return { id: staticId, topic, isStatic: true, tutorial: currentTutorialId };
    })
    .filter(Boolean);

  const uploadedItems = notes.filter(note => note.tutorial === currentTutorialId);

  // Create a map of all items to handle overrides
  const allItemsMap = new Map();
  staticItems.forEach(item => allItemsMap.set(item.topic.toLowerCase(), item));
  uploadedItems.forEach(item => allItemsMap.set(item.topic.toLowerCase(), item));

  const allItems = Array.from(allItemsMap.values());

  // Organize items into a hierarchy
  const itemsByTopic = new Map(allItems.map(item => [item.topic, { ...item, subItems: [] }]));
  const rootItems = [];

  allItems.forEach(item => {
    const currentItem = itemsByTopic.get(item.topic);
    if (item.parentTopic && itemsByTopic.has(item.parentTopic)) {
      const parent = itemsByTopic.get(item.parentTopic);
      parent.subItems.push(currentItem);
    } else {
      rootItems.push(currentItem);
    }
  });

  // Sort top-level items based on the original tutorial order
  rootItems.sort((a, b) => {
    const aIndex = tutorial.items.indexOf(a.topic);
    const bIndex = tutorial.items.indexOf(b.topic);
    if (aIndex === -1 && bIndex === -1) return a.topic.localeCompare(b.topic); // both are new
    if (aIndex === -1) return 1; // a is new, b is not
    if (bIndex === -1) return -1; // b is new, a is not
    return aIndex - bIndex;
  });

  const renderLink = (item, isSubItem = false) => {
    const path = item.isStatic
      ? (item.topic.endsWith(' HOME') ? `/${tutorial.id}` : `/${tutorial.id}/${item.topic.replace(/ /g, '-').toLowerCase()}`)
      : `/${tutorial.id}/uploaded/${item.id}`;

    return (
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
        end={item.topic.endsWith(' HOME')}
      >
        {isSubItem && <span className="subitem-icon">+</span>} {item.topic}
      </NavLink>
    );
  };

  const renderItem = (item, level = 0) => {
    if (item.subItems && item.subItems.length > 0) {
      return (
        <li key={item.id || item.topic} className={`sidebar-level-${level}`}>
          <details className="sidebar-dropdown">
            <summary>{item.topic}</summary>
            <ul>
              {item.subItems.map(subItem => renderItem(subItem, level + 1))}
            </ul>
          </details>
        </li>
      );
    } else {
      return (
        <li key={item.id || item.topic} className={`sidebar-level-${level}`}>
          {renderLink(item, level > 0)}
        </li>
      );
    }
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} data-lenis-prevent>
      <div className="sidebar-header">
        <h3>{tutorial.title.toUpperCase()}</h3>
      </div>
      <ul className="sidebar-nav">
        {rootItems.map(item => renderItem(item))}
      </ul>
    </div>
  );
};

export default Sidebar;
