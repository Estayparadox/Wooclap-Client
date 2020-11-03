import React from 'react';
import ArticleContainer from './components/Article.container';
import EMailWhiteBookContainer from './components/EmailWhiteBook.container';
import "./scss/App.scss";
require('dotenv').config()

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ArticleContainer/>
        <EMailWhiteBookContainer/>
      </header>
    </div>
  );
}

export default App;
