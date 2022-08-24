import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Articles from './components/Articles';
import Nav from './components/Nav';
import Article from './components/Article';
import Users from './components/Users';
import logo from './NC LOGO RED.png';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div className="top-header">
            <img className="nc-logo" src={logo} />
            <h1>NC News</h1>
          </div>

          <Nav />
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/:topic" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
