import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isActiveComment, setActiveComment] = useState(false);

  const handleToggle = () => {
    setActiveComment(!isActiveComment);
  };

  useEffect(() => {
    axios
      .get(
        `https://backend-news-project.herokuapp.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        return response.data;
      })
      .then((comments) => {
        const sortedComments = comments.sort(
          (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
        );

        return setComments(sortedComments);
      });
  }, []);

  return (
    <section className="comments-box">
      <h4>Comments</h4>
      {comments.map((comment) => {
        return (
          <div
            onClick={handleToggle}
            key={comment.comment_id}
            className={isActiveComment ? 'comment' : 'hidden-comment'}
          >
            <h4>{comment.author}</h4>
            <h4>{comment.created_at}</h4>
            <p>{comment.body}</p>
          </div>
        );
      })}
      <form>
        <input type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Comments;
