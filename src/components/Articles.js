import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
        console.log(articles[0]);
        return setArticles(articles);
      });
  }, [topic]);

  return (
    <section className="articles">
      <div className="topic-buttons">
        <Link className="link-button" to="/articles">
          All
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              to={'/' + topic.slug}
              className="link-button"
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
            <Link
              className="link-button"
              to={'/articles/' + article.article_id}
            >
              READ MORE
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default Articles;
