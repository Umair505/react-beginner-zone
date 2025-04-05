import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import ContextProvider from './context/Context';

const App = () => {
  const [recentPrompts, setRecentPrompts] = useState([]);

  return (
    <ContextProvider>
      <div className="app-container">
        <Sidebar recentPrompts={recentPrompts} />
        <Main updateRecentPrompts={setRecentPrompts} />
      </div>
    </ContextProvider>
  );
};

export default App;
