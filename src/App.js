import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>NC News</h1>
          <Nav />
        </header>

        {/* <Articles /> */}
      </div>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/:topic" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// COMPONENTS FOR NOW, SPIN OUT TO SEPARATE FILES LATER

const Nav = () => {
  return (
    <div className="nav">
      <span className="you-user">
        <span className="display-pic">
          <img src="" alt="" />
        </span>
        <h2>YOU</h2>
      </span>

      <span>
        <h2>USERS</h2>
      </span>
    </div>
  );
};

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);

  const { topic } = useParams();

  useEffect(() => {
    fetch('https://backend-news-project.herokuapp.com/api/topics')
      .then((topics) => {
        return topics.json();
      })
      .then(({ topics }) => {
        return setTopics(topics);
      });
  }, []);

  useEffect(() => {
    let params;
    if (topic) {
      params = { topic: topic };
    }
    axios
      .get('https://backend-news-project.herokuapp.com/api/articles', {
        params,
      })
      .then((response) => {
        return response.data;
      })
      .then((articles) => {
        return setArticles(articles);
      });
  }, [topic]);

  return (
    <section className="articles">
      <div className="topic-buttons">
        <Link className="topic-button" to="/">
          All
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              to={'/' + topic.slug}
              className="topic-button"
              key={topic.slug}
            >
              {topic.slug}
            </Link>
          );
        })}
      </div>

      {articles.map((article, index) => {
        return (
          <div className="article" key={index}>
            <h4>{article.title}</h4>
            <h4>By: {article.author}</h4>
            <p>lorem20</p>
            <button>READ MORE</button>
          </div>
        );
      })}
    </section>
  );
};
