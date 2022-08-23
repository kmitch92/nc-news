import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NC News</h1>
        <Nav />
      </header>

      <Articles />
    </div>
  );
}

export default App;

// COMPONENTS FOR NOW, SPIN OUT TO SEPARATE FILES LATER

const Nav = ({}) => {
  return (
    <div className="nav">
      <span className="you-user">
        <span className="display-pic">
          <img src="" />
        </span>
        <h2>YOU</h2>
      </span>

      <span>
        <h2>USERS</h2>
      </span>
    </div>
  );
};

const Articles = ({}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://backend-news-project.herokuapp.com/api/articles')
      .then((articles) => {
        return articles.json();
      })
      .then((articles) => {
        console.log(articles);
        return setArticles(articles);
      });
  }, []);

  return (
    <section className="articles">
      {articles.map((article, index) => {
        return (
          <div className="article" key={index}>
            <h2>{article.title}</h2>
            <h2>By: {article.author}</h2>
            <p>lorem20</p>
            <button>READ MORE</button>
          </div>
        );
      })}
    </section>
  );
};
