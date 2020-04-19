import React from 'react';
import './App.css';
import config from "@monodeact/config"

function App() {
  return (
    <div className="App">
      <div>This is the dashboard</div>

      {config.map(({ projectPath, linkText }) => <div><a href={projectPath}>{linkText}</a></div>)}
    </div>
  );
}

export default App;
