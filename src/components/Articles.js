import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const { topic } = useParams();
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    sort_by: 'votes',
    order: 'DESC',
  });

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
    if (topic) {
      params.topic = topic;
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
      })
      .catch((err) => {
        setError(err);
      });
  }, [topic, params]);

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortClick = () => {
    setParams({ sort_by: sortBy, order: sortOrder });
  };

  if (!error) {
    return (
      <section className="articles">
        <div className="topic-buttons">
          <Link className="link-button" to="/articles">
            All
          </Link>
          {topics.map((topic) => {
            return (
              <Link
                to={'/articles/topic=' + topic.slug}
                className="link-button"
                key={topic.slug}
              >
                {topic.slug}
              </Link>
            );
          })}
        </div>
        <div className="sort-fields">
          <select onChange={handleSortBy}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
          <select onChange={handleSortOrder}>
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
          <button onClick={handleSortClick} className="link-button">
            SORT
          </button>
        </div>

        {articles.map((article, index) => {
          return (
            <div className="article" key={index}>
              <h4>{article.title}</h4>
              <h4>By: {article.author}</h4>
              <p>{article.body.substring(0, 49) + '...'}</p>
              <Link
                className="article-button"
                to={'/articles/' + article.article_id}
              >
                MORE
              </Link>
            </div>
          );
        })}
      </section>
    );
  } else return <ErrorPage err={error} />;
};

export default Articles;
