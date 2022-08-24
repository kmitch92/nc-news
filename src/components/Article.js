import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Comments from './Comments';

const Article = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://backend-news-project.herokuapp.com/api/articles/${article_id}`
      )
      .then((response) => {
        return response.data.article;
      })
      .then((article) => {
        setVotes(article.votes);
        return setArticle(article);
      });
  }, []);

  const handleClick = () => {
    setVotes((currVotes) => currVotes + 1);
    article.votes = votes;
    return axios
      .patch(
        `https://backend-news-project.herokuapp.com/api/articles/${article_id}`,
        {
          inc_votes: 1,
        }
      )
      .catch(() => {
        setVotes((currVotes) => currVotes - 1);
        window.alert('Something went wrong!');
      });
  };

  return (
    <div className="article-page">
      <Link to="/articles" className="link-button">
        HOME
      </Link>
      <section className="article-layout">
        <h2>{article.title}</h2>
        <h3>BY: {article.author}</h3>
        <h3>ON: {article.topic}</h3>
        <p>{article.body}</p>
        <div className="voter">
          <button onClick={handleClick}>👍</button>
          <h4>VOTES: {votes}</h4>
        </div>

        <h4>POSTED: {article.created_at}</h4>
      </section>
      <Comments article_id={article_id} />
    </div>
  );
};

export default Article;
