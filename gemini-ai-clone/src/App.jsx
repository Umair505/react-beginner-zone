
// App.js
import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/Main/Main';

const App = () => {
  const [recentPrompts, setRecentPrompts] = useState([]);

  const updateRecentPrompts = (newPrompts) => {
    setRecentPrompts(newPrompts);
  };

  return (
    <div className="app-container">
      <Sidebar recentPrompts={recentPrompts} />
      <Main updateRecentPrompts={updateRecentPrompts} />
    </div>
  );
};

export default App;